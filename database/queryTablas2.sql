DROP SCHEMA IF EXISTS `sneakicks` ;
CREATE SCHEMA `sneakicks` ;

CREATE TABLE `sneakicks`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(30) NOT NULL,
  `brand_name` VARCHAR(30) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `colorwave` VARCHAR(20) NOT NULL,
  `whole_name` VARCHAR(60) NOT NULL,
  `discount` TINYINT(2) UNSIGNED NOT NULL,
  `price_original` DECIMAL(10,2) UNSIGNED NOT NULL,
  `price_final` DECIMAL(10,2) UNSIGNED NOT NULL,
  `shoe_condition` VARCHAR(10) NOT NULL,
  `stock` INT UNSIGNED NOT NULL,
  `story` VARCHAR(5000) NOT NULL,
  `main_picture` VARCHAR(200) NOT NULL,
  `picture1` VARCHAR(200) NOT NULL,
  `picture2` VARCHAR(200) NULL,
  `picture3` VARCHAR(200) NULL,
  `picture4` VARCHAR(200) NULL,
  PRIMARY KEY (`id`) );
  
CREATE TABLE `sneakicks`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stars` TINYINT(1) NOT NULL,
  `text` VARCHAR(1000) NOT NULL,
  `id_product` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_product`
    FOREIGN KEY (`id_product`)
    REFERENCES `sneakicks`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
CREATE TABLE `sneakicks`.`sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` DECIMAL(2,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `sneakicks`.`products_sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT UNSIGNED NOT NULL,
  `product` INT NOT NULL,
  `size` INT NOT NULL,
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
  `password` VARCHAR(45) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `sneakicks`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `charges` MEDIUMINT UNSIGNED NOT NULL,
  `total_amount` MEDIUMINT UNSIGNED NOT NULL,
  `id_user` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `sneakicks`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);
  
CREATE TABLE `sneakicks`.`products_carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `units` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cart_id`
    FOREIGN KEY (`cart_id`)
    REFERENCES `sneakicks`.`carts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `sneakicks`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
    
CREATE TABLE `sneakicks`.`bills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cart` INT NOT NULL,
  `customer` VARCHAR(100) NOT NULL,
  `datetime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_cart`
    FOREIGN KEY (`id_cart`)
    REFERENCES `sneakicks`.`carts` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);