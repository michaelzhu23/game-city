require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/server-health-check', (req, res, next) => {
  res.status(200).send("Server is alive! :)")
});

app.get('/api/products', function (req, res, next) {
  const sql = `
  select "productId",
         "name",
         "price",
         "image",
         "shortDescription"
  from "products"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', function (req, res, next) {
  const productId = Number(req.params.productId);
  if (isNaN(productId) || !Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  }
  const sql = `
  select *
  from "products"
  where "productId" = $1
  `;
  const params = [req.params.productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find product with 'productId' ${productId}`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', function (req, res, next) {
  if (!req.session.cartId) {
    res.status(200).json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', function (req, res, next) {
  const productId = Number(req.body.productId);
  if (isNaN(productId) || !Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  }
  const sql = `
  select "price"
  from "products"
  where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`cannot find product with 'productId' ${productId}`, 400);
      } else if (req.session.cartId) {
        const cartEntry = {
          cartId: req.session.cartId,
          price: result.rows[0].price
        };
        return cartEntry;
      } else {
        const productPrice = result.rows[0].price;
        const sql = `
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"
        `;
        return (
          db.query(sql)
            .then(result => {
              const cartEntry = {
                cartId: result.rows[0].cartId,
                price: productPrice
              };
              return cartEntry;
            })
        );
      }
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;
      const params = [data.cartId, productId, data.price];
      return (
        db.query(sql, params)
      );
    })
    .then(result => {
      const sql = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
      `;
      const params = [result.rows[0].cartItemId];
      return (
        db.query(sql, params)
          .then(result => {
            res.status(201).json(result.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'Missing cartId. Please add an item to cart.' });
  } else if (!req.body.name) {
    return res.status(400).json({ error: 'name is a required field.' });
  } else if (!req.body.creditCard) {
    return res.status(400).json({ error: 'creditCard is a required field.' });
  } else if (!req.body.shippingAddress) {
    return res.status(400).json({ error: 'shippingAddress is a required field.' });
  }
  const sql = `
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning "orderId", "name", "creditCard", "shippingAddress", "createdAt"
  `;
  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, params)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = Number(req.params.cartItemId);
  if (isNaN(cartItemId) || !Number.isInteger(cartItemId) || cartItemId <= 0) {
    return res.status(400).json({ error: 'cartItemId must be a positive integer.' });
  } else if (!req.session.cartId) {
    return res.status(400).json({ error: 'Missing cartId. Please add an item to cart.' });
  }
  const sql = `
  delete from "cartItems"
 where "cartId" = $1
   and "cartItemId" = $2
   returning *;
  `;
  const params = [req.session.cartId, cartItemId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`There is no product with cartItemId ${cartItemId} in cart.`, 404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
