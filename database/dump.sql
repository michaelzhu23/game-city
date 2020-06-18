--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	1	1	2999
2	1	3	2900
3	1	4	999
4	1	6	830
5	1	2	2595
6	2	1	2999
7	2	3	2900
8	3	3	2900
9	4	2	2595
10	5	2	2595
11	5	3	2900
12	5	1	2999
13	6	1	2999
14	6	3	2900
15	7	1	2999
16	7	3	2900
17	7	5	9900
18	8	1	2999
19	8	2	2595
20	9	1	2999
21	9	5	9900
22	9	3	2900
23	10	1	2999
24	10	3	2900
25	10	5	9900
26	11	2	2595
27	11	4	999
28	11	3	2900
29	12	3	1999
30	12	1	5999
31	13	3	1999
32	13	1	5499
33	14	1	5499
34	14	3	1999
35	14	2	5999
36	15	1	5499
37	16	2	5999
40	18	2	5999
41	18	1	5499
59	19	4	2999
72	20	2	5999
74	20	1	5499
139	22	2	5999
77	21	3	1999
141	22	1	5499
79	21	1	5499
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-05-18 01:04:15.626635+00
2	2020-05-20 18:25:26.66541+00
3	2020-05-20 18:30:13.80778+00
4	2020-05-21 21:09:02.457344+00
5	2020-05-22 01:58:19.298682+00
6	2020-05-22 20:45:24.162742+00
7	2020-05-22 21:09:54.638778+00
8	2020-05-23 08:12:12.318786+00
9	2020-05-23 09:34:57.314103+00
10	2020-05-23 09:38:09.657937+00
11	2020-05-23 09:39:09.389272+00
12	2020-06-11 12:43:55.95601+00
13	2020-06-12 07:39:55.300628+00
14	2020-06-14 00:05:04.217745+00
15	2020-06-15 01:36:54.0922+00
16	2020-06-15 08:08:59.759032+00
17	2020-06-15 13:03:00.754442+00
18	2020-06-16 01:58:33.771975+00
19	2020-06-17 05:43:39.100571+00
20	2020-06-17 11:15:51.544818+00
21	2020-06-18 05:26:55.384402+00
22	2020-06-18 19:52:48.413374+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	1	Michael	555 555 555555	1234 testing st	2020-05-21 08:24:40.57905+00
2	2	Michael	555 555 555555	1234 testing st	2020-05-21 08:25:07.359749+00
3	2	Michael	555 555 555555	1234 testing st	2020-05-21 08:25:17.526359+00
4	2	Michael	555 555 555555	1234 testing st	2020-05-21 08:25:25.036357+00
5	2	Michael	555 555 555555	1234 testing st	2020-05-21 08:25:37.972492+00
6	2	Michael	555 555 555555	1234 testing st	2020-05-21 08:25:54.771439+00
7	4	Michael Zhu	12345	123 LearningFuze	2020-05-21 21:15:57.611299+00
8	5	Zhu	1112223433	1234\nLearningFuze Drive\nIrvine, CA	2020-05-22 11:29:27.537416+00
9	6	John Smith	113334444	1234\nTesting Ave.\nIrvine, ca	2020-05-22 21:05:55.560784+00
10	7	John Smith	123455555555	1234 Testing Blvd\nIrvine, CA	2020-05-22 21:10:32.634565+00
11	8	John Doe	12345678910	555 LearningFuze Drive\nIrvine, CA	2020-05-23 09:33:05.001499+00
12	9	John Smith	123455555555	2323 LearningFuze	2020-05-23 09:35:42.130754+00
13	10	John Smith	12343234332345322	dddddd	2020-05-23 09:38:55.264749+00
14	11	John Smith	1234567812345678	5555 Sample Drive\nIrvine, CA	2020-05-23 09:39:40.795765+00
15	22	John Smith	1234555555555	123 Test st.\nIrvine, CA 	2020-06-18 23:41:58.8342+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
2	Super Smash Bros. Ultimate	5999	/images/super-smash-bros-ultimate.jpg	Legendary game worlds and fighters collide in the ultimate showdown! A new entry in the Super Smash Bros. series for the Nintendo Switch system.	Gaming icons clash in the ultimate brawl! New fighters, like Simon Belmont and King K. Rool join Inkling, Ridley, Dark Samus, Chrom and every fighter in Super Smash Bros. history! Its expanded roster and new levels let you brawl it out with your friends with your favorite characters in iconic locations from Nintendo games.\nHaving trouble choosing a stage? Then select the Stage Morph option to transform one stage into another while battling—a series first! Whether you play locally or online, savor the faster combat, new attacks, and new defensive options, like a perfect shield. Jam out to 900 different music compositions and go 1-on-1 with a friend, hold a 4-player free-for-all, kick it up to 8-player battles and more! Feel free to bust out your GameCube controllers—legendary couch competitions await—or play together anytime, anywhere!
3	NBA 2K20	1999	/images/nba2k20.jpg	2K continues to redefine what's possible in sports gaming with NBA 2K20, featuring best in class graphics & gameplay, ground breaking game modes, and unparalleled player control and customization.	NBA 2K has evolved into much more than a basketball simulation. NBA 2K20 goes above and beyond in bringing basketball to life. Whether its visual fidelity, broadcast-worthy presentation, or the actual mechanics of the game, there's nothing else like it on the market. Plus, with its immersive open-world Neighborhood, NBA 2K20 is a platform for gamers and ballers to come together and create what's next in basketball culture.\n\nOne of the main truths about NBA 2K20, however, is that there are so many ways to play the game. If you're not a MyCareer player, you'll find plenty to do, whether it's building your best deck in MyTeam, setting up your ideal league in MyLeague or your own personal dream team in MyGM. Even if you're just into online play, that's there, too.\n\nOne of the biggest additions to this year's game is an entirely new league. For the first time ever, NBA 2K20 has added all 12 WNBA teams and over 140 players. You can either play a pick-up WNBA game, or you can spend an entire season bringing your favorite WNBA team to the championship.\n\nNBA 2K20 shows no signs that the series is slowing down. In fact, it's the most revolutionary it's ever been.
6	Streets of Rage 4	3999	/images/streets-of-rage-4.jpg	Battle it out on the city pavements in Streets of Rage 4 for Nintendo Switch!	Amongst the best beat’em up series ever created, jammin’ ‘90s beats and over the top street beating, the iconic series Streets of Rage comes back with a masterful tribute to and revitalization of the classic action fans adore. The all-time classic Streets of Rage, known as Bare Knuckle (ベア・ナックル Bea Nakkuru) in Japan, is a beat ‘em up series known for this timeless gameplay and electronic dance influenced music. Streets of Rage 4 builds upon the classic trilogy’s gameplay with new mechanics, beautiful hand-drawn graphics and a God tier soundtrack.\nIn addition to the 5 new characters, unlock and play your favorite characters from the previous Streets of Rage games such as Axel, Adam, Blaze, Skate, Max and many more! And for the full nostalgic experience, you will also be able to play with the music of the previous Streets of Rage games! Streets of Rage 4 features multiple gaming modes, including arcade-style gameplay, for different ways of playing, and the multiplayer supports up to four players locally.
1	Final Fantasy VII Remake	5499	/images/ff7-remake.jpg	A spectacular reimagining of one of the most visionary games.	FINAL FANTASY VII REMAKE rebuilds and expands the legendary RPG for today. The first entry in a multi-part saga, delivering a level of depth inconceivable for the original. Mind-blowing story, unforgettable characters, epic battles and technical excellence collide. The world has fallen under the control of the Shinra Electric Power Company, a shadowy corporation controlling the planet's very life force as mako energy. In the sprawling city of Midgar, an anti-Shinra organization calling themselves Avalanche have stepped up their resistance. Cloud Strife, a former member of Shinra's elite SOLDIER unit now turned mercenary, lends his aid to the group, unaware of the epic consequences that await him.\n\n1997, 2020 SQUARE ENIX CO., LTD. All Rights Reserved. CHARACTER DESIGN: TETSUYA NOMURA / ROBERTO FERRARI LOGO ILLUSTRATION: 1997 YOSHITAKA AMANO FINAL FANTASY, FINAL FANTASY VII REMAKE, SQUARE ENIX and the SQUARE ENIX logo are registered trademarks or trademarks of Square Enix Holdings Co., Ltd.
4	Street Fighter V: Champion Edition	2999	/images/street-fighter-5.jpg	Rule the ring with Street Fighter V: Champion Edition, the most robust version of the acclaimed fighting game!	Street Fighter V: Champion Edition will include all content (excluding Fighting Chance costumes, brand collaboration costumes and Capcom Pro Tour DLC) from both the original release and Street Fighter V: Arcade Edition. Champion Edition adds each character, stage and other content that was released after Arcade Edition and will include all launch content coming to this new version. Single-player and multiplayer modes let you experience brutal combats across the stunning environments of 34 dynamic stages. With over 200 stylish costumes and 40 fighters to choose from, Street Fighter V: Champion Edition allows you to fight the way you want.\nCurrent players and future owners of Street Fighter V: Champion Edition will be placed into the same player pool, with PS4 and PC cross-platform play continuing to unite fans into a unified player base. The initial Street Fighter V purchase is still the only one that consumers need to make to ensure they always have the most up-to-date version of the title. All game mode additions and balance updates are free for owners of any Street Fighter V version. Additionally, all DLC characters remain earnable completely free of charge through completing various in-game challenges and receiving earned in-game currency, called Fight Money. For those who can't wait, in-game content can be obtained instantly using real money. Certain additional content can only be acquired using Fight Money, which can be earned through normal gameplay. An internet connection is required to redeem downloadable content.
5	Animal Crossing: New Horizons	5999	/images/animal-crossing.jpg	Beloved franchise Animal Crossing gets ready for its Nintendo Switch debut!	Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round.\nPeaceful creativity and charm await as you roll up your sleeves and make your new life whatever you want it to be. Collect resources and craft everything from creature comforts to handy tools. Embrace your green thumb as you interact with flowers and trees in new ways. Set up a homestead where the rules of what goes indoors and out no longer apply. Make friends with new arrivals, enjoy the seasons, pole-vault across rivers as you explore, and more!\nShow off your island utopia to family and friends—or pack your bags and visit theirs. Whether playing online* or with others beside you**, island living is even better when you can share it. Even without hopping on a flight, you’ll meet a cast of charming animal residents bursting with personality. Friendly faces like Tom Nook and Isabelle will lend their services and happily help you grow your budding community. Escape to your island getaway—however, whenever, and wherever you want.\n*Nintendo Switch Online membership (sold separately) and Nintendo Account required for online features. Not available in all countries. Internet access required for online features. Terms apply. nintendo.com/switch-online\n**Additional games, systems and/or accessories may be required for multiplayer mode. Games, systems and some accessories sold separately.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 141, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 22, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 15, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

