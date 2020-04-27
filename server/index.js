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
  const values = [req.params.productId];
  db.query(sql, values)
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
  res.status(200).json({});
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
  const values = [productId];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find product with 'productId' ${productId}`, 400));
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
    .then(value => {
      req.session.cartId = value.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;
      const params = [value.cartId, productId, value.price];
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
