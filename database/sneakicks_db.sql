DROP SCHEMA IF EXISTS `sneakicks`;

CREATE DATABASE `sneakicks`;

USE `sneakicks`;

CREATE TABLE `sneakicks`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sneakicks`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(30) NOT NULL,
  `id_brand` INT NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `colorwave` VARCHAR(20) NOT NULL,
  `whole_name` VARCHAR(60) NOT NULL,
  `discount` INT UNSIGNED NOT NULL,
  `price_original` DECIMAL(10, 2) UNSIGNED NOT NULL,
  `price_final` DECIMAL(10, 2) UNSIGNED NOT NULL,
  `release_year` INT UNSIGNED NOT NULL,
  `shoe_condition` VARCHAR(10) NOT NULL,
  `story` VARCHAR(5000) NOT NULL,
  `main_picture` VARCHAR(200) NOT NULL,
  `picture1` VARCHAR(200) NULL,
  `picture2` VARCHAR(200) NULL,
  `picture3` VARCHAR(200) NULL,
  `picture4` VARCHAR(200) NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_brand` FOREIGN KEY (`id_brand`) REFERENCES `sneakicks`.`brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `sneakicks`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stars` INT NOT NULL,
  `text` VARCHAR(1000) NOT NULL,
  `id_product` INT NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `sneakicks`.`products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `sneakicks`.`sizes` (
  `id` DECIMAL(3, 1) NOT NULL,
  `number` DECIMAL(3, 1) UNSIGNED NOT NULL,
  `centimeters` DECIMAL(3, 1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sneakicks`.`products_sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stock` INT UNSIGNED NOT NULL,
  `product` INT NOT NULL,
  `size` DECIMAL(3, 1) NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `size` FOREIGN KEY (`size`) REFERENCES `sneakicks`.`sizes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product` FOREIGN KEY (`product`) REFERENCES `sneakicks`.`products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `sneakicks`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `category`,
    `image`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    DEFAULT,
    'Daniel',
    'Duque',
    'dani_duque@aol.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'admin',
    'hidratado.png',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Corie',
    'Garoghan',
    'cgaroghan0@people.com.cn',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Lamond',
    'McJarrow',
    'lmcjarrow1@un.org',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Augie',
    'Kilmister',
    'akilmister2@ask.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Tandie',
    'Loche',
    'tloche3@goo.ne.jp',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Carling',
    'MacConnel',
    'cmacconnel4@macromedia.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Eberhard',
    'Kynder',
    'ekynder5@shareasale.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Blaire',
    'Hallows',
    'bhallows6@nbcnews.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Kerri',
    'Boakes',
    'kboakes7@gmpg.org',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Natale',
    'Benoit',
    'nbenoit8@blogspot.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Reidar',
    'Klulik',
    'rklulik9@hp.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Isacco',
    'Howood',
    'ihowooda@nsw.gov.au',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Alyson',
    'Franey',
    'afraneyb@timesonline.co.uk',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Tobe',
    'Barabisch',
    'tbarabischc@youtube.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Blinny',
    'McCooke',
    'bmccooked@addthis.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Pammi',
    'Lebbon',
    'plebbone@rambler.ru',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Maia',
    'McJury',
    'mmcjuryf@businesswire.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Em',
    'Metzke',
    'emetzkeg@zimbio.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Myles',
    'Sincock',
    'msincockh@dyndns.org',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Nickolaus',
    'Sasser',
    'nsasseri@cocolog-nifty.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Liz',
    'Fishpoole',
    'lfishpoolej@mapy.cz',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Emmett',
    'Chasemoore',
    'echasemoorek@sourceforge.net',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Shir',
    'Applewhaite',
    'sapplewhaitel@intel.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Melli',
    'Wenderott',
    'mwenderottm@tripadvisor.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Ramsey',
    'Maunders',
    'rmaundersn@squidoo.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Friederike',
    'Kebell',
    'fkebello@over-blog.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Eveleen',
    'McCerery',
    'emccereryp@google.com.au',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Archibold',
    'Munby',
    'amunbyq@msn.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Aveline',
    'Faraker',
    'afarakerr@cnbc.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Linc',
    'Kuhlmey',
    'lkuhlmeys@engadget.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Glenn',
    'Kubczak',
    'gkubczakt@biglobe.ne.jp',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Lottie',
    'Rigardeau',
    'lrigardeauu@yellowpages.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Bryn',
    'Dumbare',
    'bdumbarev@irs.gov',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Joye',
    'Pitchers',
    'jpitchersw@wiley.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Patty',
    'Vivers',
    'pviversx@fotki.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Cob',
    'Sedge',
    'csedge10@livejournal.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Britte',
    'Kilbey',
    'bkilbey11@discovery.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Ashbey',
    'Goldster',
    'agoldster12@wufoo.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Verine',
    'Spehr',
    'vspehr13@deviantart.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Stacy',
    'Horley',
    'shorley14@qq.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Maure',
    'Timms',
    'mtimms15@scientificamerican.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Charis',
    'Chetham',
    'cchetham16@redcross.org',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Emelia',
    'Jagiello',
    'ejagiello17@weather.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Annissa',
    'Le Friec',
    'alefriec18@paypal.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Tedmund',
    'Jahnke',
    'tjahnke19@ustream.tv',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Banky',
    'Poltun',
    'bpoltun1a@marriott.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Waldo',
    'Choake',
    'wchoake1b@blinklist.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Alvis',
    'Barnardo',
    'abarnardo1c@reddit.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

INSERT INTO
  users (
    id,
    first_name,
    last_name,
    email,
    password,
    category,
    image,
    createdAt,
    updatedAt
  )
VALUES
  (
    DEFAULT,
    'Fidela',
    'Wilne',
    'fwilne1d@examiner.com',
    '$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq',
    'user',
    'dummy_user.webp',
    NULL,
    NULL
  );

CREATE TABLE `sneakicks`.`shippings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `cost` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sneakicks`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `charges` MEDIUMINT UNSIGNED NULL,
  `total_amount` MEDIUMINT UNSIGNED NULL,
  `id_user` INT NULL,
  `user_fullname` VARCHAR(50) NOT NULL,
  `id_shipping` INT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `sneakicks`.`users` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `id_shipping` FOREIGN KEY (`id_shipping`) REFERENCES `sneakicks`.`shippings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `sneakicks`.`products_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `units` INT UNSIGNED NOT NULL,
  `size` DECIMAL(3, 1) UNSIGNED NOT NULL,
  `bought` INT UNSIGNED NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `sneakicks`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `sneakicks`.`products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE `sneakicks`.`bills` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `id_cart` INT NOT NULL,
--   `customer` VARCHAR(100) NOT NULL,
--   `createdAt` DATE NOT NULL,
--   `updatedAt` DATE NULL,
--   PRIMARY KEY (`id`),
--   CONSTRAINT `id_cart`
--     FOREIGN KEY (`id_cart`)
--     REFERENCES `sneakicks`.`carts` (`id`)
--     ON DELETE RESTRICT
--     ON UPDATE RESTRICT);