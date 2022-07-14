DROP SCHEMA IF EXISTS `sneakicks` ;
CREATE DATABASE `sneakicks`;
USE `sneakicks`;

CREATE TABLE `sneakicks`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(30) NOT NULL,
  `brand_name` VARCHAR(30) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `colorwave` VARCHAR(20) NOT NULL,
  `whole_name` VARCHAR(60) NOT NULL,
  `discount` INT UNSIGNED NOT NULL,
  `price_original` DECIMAL(10,2) UNSIGNED NOT NULL,
  `price_final` DECIMAL(10,2) UNSIGNED NOT NULL,
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
  PRIMARY KEY (`id`) );
  
CREATE TABLE `sneakicks`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stars` INT NOT NULL,
  `text` VARCHAR(1000) NOT NULL,
  `id_product` INT NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_product`
    FOREIGN KEY (`id_product`)
    REFERENCES `sneakicks`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
CREATE TABLE `sneakicks`.`sizes` (
  `id` DECIMAL(3,1) NOT NULL,
  `number` DECIMAL(3,1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sneakicks`.`products_sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT UNSIGNED NOT NULL,
  `product` INT NOT NULL,
  `size` DECIMAL(3,1) NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `size`
    FOREIGN KEY (`size`)
    REFERENCES `sneakicks`.`sizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product`
    FOREIGN KEY (`product`)
    REFERENCES `sneakicks`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
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
  PRIMARY KEY (`id`));
  
  INSERT INTO `users` (`id`,`first_name`,`last_name`,`email`,`password`,`category`,`image`,`createdAt`,`updatedAt`) 
  VALUES (DEFAULT,'Daniel','Duque','dani_duque@aol.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','admin','hidratado.png', NULL, NULL);
  
  CREATE TABLE `sneakicks`.`shippings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `cost` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));
  
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
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `sneakicks`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `id_shipping`
    FOREIGN KEY (`id_shipping`)
    REFERENCES `sneakicks`.`shippings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  
CREATE TABLE `sneakicks`.`products_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `units` INT UNSIGNED NOT NULL,
  `size` DECIMAL(3,1) UNSIGNED NOT NULL,
  `bought` INT UNSIGNED NOT NULL,
  `createdAt` DATE NULL,
  `updatedAt` DATE NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `sneakicks`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `sneakicks`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
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