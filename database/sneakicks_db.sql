CREATE DATABASE  IF NOT EXISTS `sneakicks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sneakicks`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sneakicks
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Air Jordan',NULL,NULL),(2,'Nike',NULL,NULL),(3,'Converse',NULL,NULL),(4,'Gucci',NULL,NULL),(5,'Champion',NULL,NULL);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charges` mediumint(8) unsigned DEFAULT NULL,
  `total_amount` mediumint(8) unsigned DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `user_fullname` varchar(50) NOT NULL,
  `id_shipping` int(11) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_shipping` (`id_shipping`),
  CONSTRAINT `id_shipping` FOREIGN KEY (`id_shipping`) REFERENCES `shippings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(30) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `colorwave` varchar(20) NOT NULL,
  `whole_name` varchar(60) NOT NULL,
  `discount` int(10) unsigned NOT NULL,
  `price_original` decimal(10,2) unsigned NOT NULL,
  `price_final` decimal(10,2) unsigned NOT NULL,
  `release_year` int(10) unsigned NOT NULL,
  `shoe_condition` varchar(10) NOT NULL,
  `story` varchar(5000) NOT NULL,
  `main_picture` varchar(200) NOT NULL,
  `picture1` varchar(200) DEFAULT NULL,
  `picture2` varchar(200) DEFAULT NULL,
  `picture3` varchar(200) DEFAULT NULL,
  `picture4` varchar(200) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_brand` (`id_brand`),
  CONSTRAINT `id_brand` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (9,'lifestyle',1,'Air Jordan 11 Retro Low','Light Bone Snakeskin','Air Jordan 11 Retro Low \'Light Bone Snakeskin\'',10,18500.00,16650.00,2019,'new_no_def','The Air Jordan 11 Retro Low\'s iconic identity was founded when Michael Jordan returned to the game in 1995. Surfacing in June 2019, this \'Light Bone Snakeskin\' variant reaffirms the classic\'s allure with a contemporary snakeskin print on the leather upper\'s mudguard. Rope laces winding through the lateral webbing customize fit. Signature Jumpman insignias are positioned on the tongue and heel. A translucent rubber outsole and carbon fiber plate form the base.','1657727854922-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(10,'lifestyle',1,'Air Jordan 1 Retro High SB','Light Bone','Air Jordan 1 Retro High SB \'Light Bone\'',0,17900.00,17900.00,2019,'new_no_def','The Air Jordan SB 1 Retro High is representative of the decades-old influence that the iconic shoe has had on skate culture. Revealed in May 2019, this \'Light Bone\' update is formed by a classic leather upper treated with a wear-away finish concealing an alternate tint. Custom branding resurfaces via the lateral Swooshes, Jumpman tongue label and Wings logo. The encapsulated Air unit and concentric circle outsole are mainstays on this classic silhouette.','1657728118253-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(11,'lifestyle',1,'Sneaker Politics x Air Jordan 1 Low','Block Party','Sneaker Politics x Air Jordan 1 Low \'Block Party\'',0,10000.00,10000.00,2019,'new_no_def','ijwefpiojew\'fofo','1657728219140-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(12,'lifestyle',5,'Rally Pro','Black','Rally Pro \'Black\'',8,15314.00,14088.88,3000,'new_no_def','The Champion Rally Pro sneaker packages street style in a sleek, basketball-inspired silhouette with heritage Champion detailing throughout. This â€˜Blackâ€™ version is styled for growing kidsâ€™ feet and features a one-piece bootie construction made from woven mesh and elastic textile with suede trim on the sidewall and heel. It offers a snug, sock-like fit thatâ€™s reinforced with tabs at the tongue and heel for easy on and off. A textured chenille â€˜Câ€™ logo on the sidewall and branded elastic strap across the forefoot complement the design.','1657728470527-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(13,'lifestyle',3,'Tyler, The Creator x Foot Locker x Chuck','Artist Series','Tyler, The Creator x Foot Locker x Chuck 70 \'Artist Series\'',0,21555.00,21555.00,2018,'new_no_def','Tyler, the Creator teamed up with Foot Locker on the â€˜Artist Seriesâ€™ edition of the Converse Chuck 70, featuring an off-white canvas upper printed with original artwork from Wyatt Navarro. The heightened foxing thatâ€™s a signature design element of the silhouette is adorned with contrasting stripes in blue and orange. A gum rubber outsole delivers traction underfoot.','1657728730162-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(14,'basketball',2,'Kyrie 5','Friends','Kyrie 5 \'Friends\'',25,13000.00,9750.00,2019,'new_no_def','lbwfuhw;few;qjf','1657728830417-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(15,'lifestyle',2,'Air Fear Of God Raid','Black','Air Fear Of God Raid \'Black\'',15,19000.00,16150.00,2019,'new_no_def','Nike and frequent collaborator Fear Of God designer, Jerry Lorenzo, joined forces once again for the Air Fear Of God Raid \'Black\' sneaker. Released in May 2019, the uniquely designed silhouette is inspired by one of Lorenzoâ€™s favorite Nike designs, the Air Raid. Outfitted with a cross strap suede and textile upper above; below, its equipped with a double stacked Zoom Air unit in heel for a retro, yet futuristic finish.','1657728920234-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(16,'lifestyle',2,'OFF-WHITE x Air Max 90','Black','OFF-WHITE x Air Max 90 \'Black\'',0,16000.00,16000.00,2019,'new_no_def','The Off-White x Air Max 90 â€˜Blackâ€™ offers a unique blend of materials on the upper, which combines a ripstop base with nubuck overlays and a suede mudguard. The all-black finish is contrasted by a white Swoosh with zigzag stitching, a small orange tab on the quarter panel and orange stitching on the exposed-foam tongue. Virgil Ablohâ€™s signature text block makes an appearance on the shoeâ€™s medial side.','1657729000252-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(17,'lifestyle',2,'Sacai x LDV Waffle','Varsity Blue','Sacai x LDV Waffle \'Varsity Blue\'',0,18000.00,18000.00,2019,'new_no_def','Sacai and Nike collaborate again, with the Nike LDV Waffle emerging from Paris Fashion Week at the Sacai SP19 runway show. Featuring a unique hybridization technique, the shoe mixes two Nike runners from the archives: the Waffle Daybreak and the LDV. With two shoes coming together, a unique upper features a double Swoosh, double tongue, double heel counter, double eyestay and double laces. Itâ€™s set against a blue and red upper that mixes suede, leather and mesh while a sculpted midsole juts out past the heel, adding an extra element of crazy design lines on an already chaotic shoe. The classic waffle outsole brings everything together, while Nike and Sacai branding can be seen on the back heel and insole.','1657729399606-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(18,'lifestyle',1,'Air Jordan 1 Retro High OG','Origin Story','Air Jordan 1 Retro High OG \'Origin Story\'',10,16000.00,14400.00,2018,'new_no_def','Air Jordan 1 Retro High OG â€˜Origin Storyâ€™ was made to celebrate the animated film Spider-Man: Into the Spider-Verse. The high-top features a design that mirrors the pair worn by character Miles Morales, updating the classic Chicago colorway with an icy translucent rubber outsole and a subtle pattern of reflective dots across the shoeâ€™s red leather overlays.','1657729488836-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(19,'lifestyle',1,'Air Jordan 12 Retro','Gym Red','Air Jordan 12 Retro \'Gym Red\'',10,19000.00,17100.00,2018,'used','The Air Jordan 12 Retro Gym Red™ presents a monochromatic take on Tinker Hatfield™s 1996 design. The entirety of the mid-top silhouette is dipped in red, including the rubber tooling and herringbone tread outsole. Contrasting hits of black are used throughout the shoeâ€™s branding elements and sockliner. While the all-red finish presents a radical new look for the vintage silhouette, the performance benefits remain unchanged, highlighted by full-length Zoom Air that extends from heel to toe.','1657729601801-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(20,'lifestyle',1,'Air Jordan 1 Retro High OG','Phantom','Air Jordan 1 Retro High OG \'Phantom\'',0,16000.00,16000.00,2019,'used','Instead of the usual two-tone color blocking, the Air Jordan 1 Retro High OG â€˜Phantomâ€™ makes use of contrast stitching in black and red to distinguish the high-topâ€™s clean lines. The shoeâ€™s all-leather upper is finished in off-white Sail, accented by a padded collar and underlayer Swoosh in University Red. True to its OG designation, the design is finished with Nike Air branding on the woven tongue tag and insole.','1657729669971-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(21,'lifestyle',1,'Air Jordan 11 Retro','Platinum Tint','Air Jordan 11 Retro \'Platinum Tint\'',12,22000.00,19360.00,2018,'used','The Air Jordan 11 Retro Platinum Tint™ does away with the one detail most commonly associated with the classic silhouetteâ”its shiny patent leather overlay. Instead, the mid-top takes on a nubuck and ballistic mesh build, finished entirely in understated Platinum Tint. Contrasting color arrives via University Red detailing on the tongue and Jumpman on the lateral heel.','1657731599531-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(22,'lifestyle',1,'Air Jordan 11 Retro','Concord','Air Jordan 11 Retro \'Concord\'',0,22000.00,22000.00,2018,'used','The 2018 edition of the Air Jordan 11 Retro â€˜Concordâ€™ features â€˜45â€™ stamped on the black heel tabâ€”a nod to the jersey number that Michael Jordan wore upon his return to basketball following his first retirement. The rest of the build keeps the shoeâ€™s signature details intact, including a white ballistic mesh upper, black patent leather overlays and an icy translucent outsole underfoot.','1657731692708-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(23,'lifestyle',1,'Air Jordan 11 Retro Low','Navy Snakeskin','Air Jordan 11 Retro Low \'Navy Snakeskin\'',10,18500.00,16650.00,2019,'used','The Air Jordan 11 Retro Low â€˜Navy Snakeskinâ€™ returns for the first time since 2000. A true retro to the original, the 2019 version features leather panels on the upper instead of mesh and a translucent outsole, while the mudguard still features a navy snakeskin print.','1657731798127-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(24,'lifestyle',1,'Air Jordan 4 Retro OG','White Cement','Air Jordan 4 Retro OG \'White Cement\'',0,22000.00,22000.00,2016,'used','The Air Jordan 4 Retro OG \'Cementâ€™ 2016 was one of the original four colorways released in 1989. The sneaker features the original White, Fire Red, Black, and Tech Grey colorway, with the speckled Cement Grey accents that give the sneaker its nickname. Released during the 2016 NBA All-Star weekend in Toronto, the sneaker was also retroâ€™d in 1999 and 2012. The 1999 and 2016 retros are the only models that feature the â€˜Nike Airâ€™ branding on the heel, just like the 1989 OG sneakers.','1657731879179-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(25,'lifestyle',3,'Comme des GarÃ§ons x Chuck Taylor All St','Milk','Comme des GarÃ§ons x Chuck Taylor All Star Hi \'Milk\'',5,12000.00,11400.00,2015,'used','This Comme des GarÃ§ons x Chuck Taylor All Star Hi features an off-white canvas upper, red CDG heart logo on the side panels, black contrast stripe on the heel, white toe cap, and a vulcanized rubber midsole. Released in June 2017, the sneaker also dropped in a black colorway.','1657732018944-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(26,'other',4,'Gucci Pursuit \'72 Rubber Slide','Black','Gucci Pursuit \'72 Rubber Slide \'Black\'',0,21000.00,21000.00,3333,'used','The Gucci Pursuit â€˜72 Rubber Slide in â€˜Blackâ€™ sneaker pays homage to the fashion house\'s roots with the iconic Web stripeâ€”first developed by Gucci in the 1950sâ€”taking the stage. The minimal, open-toe silhouette features a thick black rubber sole with a rounded shape. The top portion of the slide is a rubber strap displaying the Gucci Web green and red striped motif, and the design is finished with a Gucci logo embossed on the outer midsole.','1657732120999-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(27,'lifestyle',2,'Air Max 97','On Air: Neon Seoul','Air Max 97 \'On Air: Neon Seoul\'',0,20000.00,20000.00,2019,'used','In celebration of Air Max Day, Nike hosted the Nike: On Air contest in 2018, giving residents the chance to create their own Air Max designs inspired by their hometowns. After working alongside Nike developers, winner Gwang Shin debuted his Nike Air Max 97 \'Neon Seoul\' sneaker in April 2019. Paying tribute to his city, Seoul, Shin draws influences from the famed neon signs in South Koreaâ€™s capital, decorating the leather upper with vivid-colored piping.','1657732191830-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13'),(28,'lifestyle',2,'OFF-WHITE x Air Presto','Black','OFF-WHITE x Air Presto \'Black\'',0,16000.00,16000.00,2018,'used','This monochromatic take on the Air Presto is the second time Virgil Abloh and Nike collaborated on this iconic silhouette. The July 2018 iteration came a few mere months after itâ€™s two-tone predecessor made itâ€™s debut as part of Abloh and Nikeâ€™s â€˜The Tenâ€™ Collection. This pair showcases an all-black finish, accented with unique touches including a plastic zip tie, white Swoosh with conspicuous zig-zag stitching, and lines of text on the medial quarter panel that allude to the shoeâ€™s Beaverton origins.','1657732283031-image-product.png',NULL,NULL,NULL,NULL,'2022-07-13','2022-07-13');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `units` int(10) unsigned NOT NULL,
  `size` decimal(3,1) unsigned NOT NULL,
  `bought` int(10) unsigned NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_cart`
--

LOCK TABLES `products_cart` WRITE;
/*!40000 ALTER TABLE `products_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_sizes`
--

DROP TABLE IF EXISTS `products_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stock` int(10) unsigned NOT NULL,
  `product` int(11) NOT NULL,
  `size` decimal(3,1) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `size` (`size`),
  KEY `product` (`product`),
  CONSTRAINT `product` FOREIGN KEY (`product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `size` FOREIGN KEY (`size`) REFERENCES `sizes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=677 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_sizes`
--

LOCK TABLES `products_sizes` WRITE;
/*!40000 ALTER TABLE `products_sizes` DISABLE KEYS */;
INSERT INTO `products_sizes` VALUES (157,45,9,3.0,'2022-07-13','2022-07-13'),(158,9,9,4.0,'2022-07-13','2022-07-13'),(159,23,9,3.5,'2022-07-13','2022-07-13'),(160,7,9,4.5,'2022-07-13','2022-07-13'),(161,21,9,5.0,'2022-07-13','2022-07-13'),(162,54,9,5.5,'2022-07-13','2022-07-13'),(163,0,9,6.0,'2022-07-13','2022-07-13'),(164,0,9,6.5,'2022-07-13','2022-07-13'),(165,0,9,7.0,'2022-07-13','2022-07-13'),(166,0,9,7.5,'2022-07-13','2022-07-13'),(167,76,9,8.0,'2022-07-13','2022-07-13'),(168,0,9,8.5,'2022-07-13','2022-07-13'),(169,45,9,9.0,'2022-07-13','2022-07-13'),(170,34,9,9.5,'2022-07-13','2022-07-13'),(171,0,9,10.0,'2022-07-13','2022-07-13'),(172,23,9,10.5,'2022-07-13','2022-07-13'),(173,32,9,11.0,'2022-07-13','2022-07-13'),(174,66,9,11.5,'2022-07-13','2022-07-13'),(175,6,9,12.0,'2022-07-13','2022-07-13'),(176,12,9,13.0,'2022-07-13','2022-07-13'),(177,0,9,12.5,'2022-07-13','2022-07-13'),(178,0,9,13.5,'2022-07-13','2022-07-13'),(179,4,9,14.5,'2022-07-13','2022-07-13'),(180,0,9,14.0,'2022-07-13','2022-07-13'),(181,0,9,15.0,'2022-07-13','2022-07-13'),(182,0,9,15.5,'2022-07-13','2022-07-13'),(183,0,10,3.0,'2022-07-13','2022-07-13'),(184,0,10,3.5,'2022-07-13','2022-07-13'),(185,0,10,4.0,'2022-07-13','2022-07-13'),(186,0,10,4.5,'2022-07-13','2022-07-13'),(187,0,10,5.0,'2022-07-13','2022-07-13'),(188,0,10,5.5,'2022-07-13','2022-07-13'),(189,0,10,6.0,'2022-07-13','2022-07-13'),(190,0,10,7.0,'2022-07-13','2022-07-13'),(191,0,10,7.5,'2022-07-13','2022-07-13'),(192,0,10,6.5,'2022-07-13','2022-07-13'),(193,0,10,8.0,'2022-07-13','2022-07-13'),(194,0,10,8.5,'2022-07-13','2022-07-13'),(195,0,10,9.0,'2022-07-13','2022-07-13'),(196,0,10,9.5,'2022-07-13','2022-07-13'),(197,0,10,10.5,'2022-07-13','2022-07-13'),(198,0,10,10.0,'2022-07-13','2022-07-13'),(199,0,10,11.0,'2022-07-13','2022-07-13'),(200,0,10,11.5,'2022-07-13','2022-07-13'),(201,0,10,12.0,'2022-07-13','2022-07-13'),(202,9,10,12.5,'2022-07-13','2022-07-13'),(203,0,10,13.0,'2022-07-13','2022-07-13'),(204,0,10,13.5,'2022-07-13','2022-07-13'),(205,0,10,14.0,'2022-07-13','2022-07-13'),(206,0,10,14.5,'2022-07-13','2022-07-13'),(207,0,10,15.0,'2022-07-13','2022-07-13'),(208,0,10,15.5,'2022-07-13','2022-07-13'),(209,0,11,3.0,'2022-07-13','2022-07-13'),(210,0,11,3.5,'2022-07-13','2022-07-13'),(211,0,11,4.0,'2022-07-13','2022-07-13'),(212,0,11,4.5,'2022-07-13','2022-07-13'),(213,0,11,5.0,'2022-07-13','2022-07-13'),(214,0,11,5.5,'2022-07-13','2022-07-13'),(215,0,11,6.0,'2022-07-13','2022-07-13'),(216,0,11,6.5,'2022-07-13','2022-07-13'),(217,0,11,7.0,'2022-07-13','2022-07-13'),(218,0,11,7.5,'2022-07-13','2022-07-13'),(219,0,11,8.0,'2022-07-13','2022-07-13'),(220,0,11,8.5,'2022-07-13','2022-07-13'),(221,0,11,9.0,'2022-07-13','2022-07-13'),(222,0,11,9.5,'2022-07-13','2022-07-13'),(223,0,11,10.0,'2022-07-13','2022-07-13'),(224,0,11,10.5,'2022-07-13','2022-07-13'),(225,0,11,11.0,'2022-07-13','2022-07-13'),(226,0,11,11.5,'2022-07-13','2022-07-13'),(227,0,11,12.0,'2022-07-13','2022-07-13'),(228,0,11,12.5,'2022-07-13','2022-07-13'),(229,0,11,13.0,'2022-07-13','2022-07-13'),(230,0,11,13.5,'2022-07-13','2022-07-13'),(231,0,11,14.0,'2022-07-13','2022-07-13'),(232,0,11,14.5,'2022-07-13','2022-07-13'),(233,0,11,15.0,'2022-07-13','2022-07-13'),(234,0,11,15.5,'2022-07-13','2022-07-13'),(235,0,12,3.0,'2022-07-13','2022-07-13'),(236,0,12,3.5,'2022-07-13','2022-07-13'),(237,0,12,4.0,'2022-07-13','2022-07-13'),(238,0,12,4.5,'2022-07-13','2022-07-13'),(239,0,12,5.0,'2022-07-13','2022-07-13'),(240,0,12,5.5,'2022-07-13','2022-07-13'),(241,0,12,6.0,'2022-07-13','2022-07-13'),(242,0,12,6.5,'2022-07-13','2022-07-13'),(243,0,12,7.0,'2022-07-13','2022-07-13'),(244,0,12,7.5,'2022-07-13','2022-07-13'),(245,0,12,8.0,'2022-07-13','2022-07-13'),(246,0,12,8.5,'2022-07-13','2022-07-13'),(247,0,12,9.0,'2022-07-13','2022-07-13'),(248,0,12,9.5,'2022-07-13','2022-07-13'),(249,0,12,10.0,'2022-07-13','2022-07-13'),(250,0,12,10.5,'2022-07-13','2022-07-13'),(251,0,12,11.0,'2022-07-13','2022-07-13'),(252,0,12,11.5,'2022-07-13','2022-07-13'),(253,0,12,12.0,'2022-07-13','2022-07-13'),(254,0,12,13.0,'2022-07-13','2022-07-13'),(255,0,12,12.5,'2022-07-13','2022-07-13'),(256,0,12,13.5,'2022-07-13','2022-07-13'),(257,0,12,14.0,'2022-07-13','2022-07-13'),(258,0,12,14.5,'2022-07-13','2022-07-13'),(259,0,12,15.0,'2022-07-13','2022-07-13'),(260,0,12,15.5,'2022-07-13','2022-07-13'),(261,0,13,3.0,'2022-07-13','2022-07-13'),(262,0,13,3.5,'2022-07-13','2022-07-13'),(263,0,13,4.0,'2022-07-13','2022-07-13'),(264,0,13,4.5,'2022-07-13','2022-07-13'),(265,0,13,5.0,'2022-07-13','2022-07-13'),(266,0,13,5.5,'2022-07-13','2022-07-13'),(267,0,13,6.0,'2022-07-13','2022-07-13'),(268,0,13,6.5,'2022-07-13','2022-07-13'),(269,0,13,7.0,'2022-07-13','2022-07-13'),(270,0,13,7.5,'2022-07-13','2022-07-13'),(271,0,13,8.0,'2022-07-13','2022-07-13'),(272,0,13,8.5,'2022-07-13','2022-07-13'),(273,0,13,9.0,'2022-07-13','2022-07-13'),(274,0,13,9.5,'2022-07-13','2022-07-13'),(275,0,13,10.0,'2022-07-13','2022-07-13'),(276,0,13,10.5,'2022-07-13','2022-07-13'),(277,0,13,11.0,'2022-07-13','2022-07-13'),(278,0,13,11.5,'2022-07-13','2022-07-13'),(279,0,13,12.0,'2022-07-13','2022-07-13'),(280,0,13,12.5,'2022-07-13','2022-07-13'),(281,0,13,13.0,'2022-07-13','2022-07-13'),(282,0,13,13.5,'2022-07-13','2022-07-13'),(283,0,13,14.0,'2022-07-13','2022-07-13'),(284,0,13,14.5,'2022-07-13','2022-07-13'),(285,0,13,15.0,'2022-07-13','2022-07-13'),(286,0,13,15.5,'2022-07-13','2022-07-13'),(287,0,14,3.0,'2022-07-13','2022-07-13'),(288,0,14,3.5,'2022-07-13','2022-07-13'),(289,0,14,5.0,'2022-07-13','2022-07-13'),(290,0,14,4.0,'2022-07-13','2022-07-13'),(291,0,14,4.5,'2022-07-13','2022-07-13'),(292,0,14,5.5,'2022-07-13','2022-07-13'),(293,0,14,6.0,'2022-07-13','2022-07-13'),(294,0,14,6.5,'2022-07-13','2022-07-13'),(295,0,14,7.0,'2022-07-13','2022-07-13'),(296,0,14,7.5,'2022-07-13','2022-07-13'),(297,0,14,8.0,'2022-07-13','2022-07-13'),(298,0,14,8.5,'2022-07-13','2022-07-13'),(299,0,14,9.0,'2022-07-13','2022-07-13'),(300,0,14,9.5,'2022-07-13','2022-07-13'),(301,0,14,10.0,'2022-07-13','2022-07-13'),(302,0,14,10.5,'2022-07-13','2022-07-13'),(303,0,14,11.0,'2022-07-13','2022-07-13'),(304,0,14,11.5,'2022-07-13','2022-07-13'),(305,0,14,12.0,'2022-07-13','2022-07-13'),(306,0,14,12.5,'2022-07-13','2022-07-13'),(307,0,14,13.0,'2022-07-13','2022-07-13'),(308,0,14,13.5,'2022-07-13','2022-07-13'),(309,0,14,14.0,'2022-07-13','2022-07-13'),(310,0,14,14.5,'2022-07-13','2022-07-13'),(311,0,14,15.0,'2022-07-13','2022-07-13'),(312,0,14,15.5,'2022-07-13','2022-07-13'),(313,0,15,3.5,'2022-07-13','2022-07-13'),(314,0,15,4.0,'2022-07-13','2022-07-13'),(315,0,15,3.0,'2022-07-13','2022-07-13'),(316,0,15,4.5,'2022-07-13','2022-07-13'),(317,0,15,5.0,'2022-07-13','2022-07-13'),(318,0,15,5.5,'2022-07-13','2022-07-13'),(319,0,15,6.0,'2022-07-13','2022-07-13'),(320,0,15,7.0,'2022-07-13','2022-07-13'),(321,0,15,6.5,'2022-07-13','2022-07-13'),(322,0,15,7.5,'2022-07-13','2022-07-13'),(323,0,15,8.0,'2022-07-13','2022-07-13'),(324,0,15,8.5,'2022-07-13','2022-07-13'),(325,0,15,9.0,'2022-07-13','2022-07-13'),(326,0,15,9.5,'2022-07-13','2022-07-13'),(327,0,15,10.0,'2022-07-13','2022-07-13'),(328,0,15,10.5,'2022-07-13','2022-07-13'),(329,0,15,11.0,'2022-07-13','2022-07-13'),(330,0,15,11.5,'2022-07-13','2022-07-13'),(331,0,15,12.0,'2022-07-13','2022-07-13'),(332,0,15,12.5,'2022-07-13','2022-07-13'),(333,0,15,13.0,'2022-07-13','2022-07-13'),(334,0,15,13.5,'2022-07-13','2022-07-13'),(335,0,15,14.0,'2022-07-13','2022-07-13'),(336,0,15,14.5,'2022-07-13','2022-07-13'),(337,0,15,15.0,'2022-07-13','2022-07-13'),(338,0,15,15.5,'2022-07-13','2022-07-13'),(339,0,16,3.0,'2022-07-13','2022-07-13'),(340,0,16,3.5,'2022-07-13','2022-07-13'),(341,0,16,4.0,'2022-07-13','2022-07-13'),(342,0,16,4.5,'2022-07-13','2022-07-13'),(343,0,16,5.0,'2022-07-13','2022-07-13'),(344,0,16,5.5,'2022-07-13','2022-07-13'),(345,0,16,6.0,'2022-07-13','2022-07-13'),(346,0,16,6.5,'2022-07-13','2022-07-13'),(347,0,16,7.5,'2022-07-13','2022-07-13'),(348,0,16,7.0,'2022-07-13','2022-07-13'),(349,0,16,8.0,'2022-07-13','2022-07-13'),(350,0,16,9.0,'2022-07-13','2022-07-13'),(351,0,16,8.5,'2022-07-13','2022-07-13'),(352,0,16,9.5,'2022-07-13','2022-07-13'),(353,0,16,10.0,'2022-07-13','2022-07-13'),(354,0,16,10.5,'2022-07-13','2022-07-13'),(355,0,16,11.0,'2022-07-13','2022-07-13'),(356,0,16,11.5,'2022-07-13','2022-07-13'),(357,0,16,12.0,'2022-07-13','2022-07-13'),(358,0,16,12.5,'2022-07-13','2022-07-13'),(359,0,16,13.0,'2022-07-13','2022-07-13'),(360,0,16,13.5,'2022-07-13','2022-07-13'),(361,0,16,14.0,'2022-07-13','2022-07-13'),(362,0,16,14.5,'2022-07-13','2022-07-13'),(363,0,16,15.0,'2022-07-13','2022-07-13'),(364,0,16,15.5,'2022-07-13','2022-07-13'),(365,0,17,3.5,'2022-07-13','2022-07-13'),(366,0,17,3.0,'2022-07-13','2022-07-13'),(367,0,17,4.0,'2022-07-13','2022-07-13'),(368,0,17,4.5,'2022-07-13','2022-07-13'),(369,0,17,5.0,'2022-07-13','2022-07-13'),(370,0,17,5.5,'2022-07-13','2022-07-13'),(371,0,17,6.0,'2022-07-13','2022-07-13'),(372,0,17,6.5,'2022-07-13','2022-07-13'),(373,0,17,7.0,'2022-07-13','2022-07-13'),(374,0,17,7.5,'2022-07-13','2022-07-13'),(375,0,17,8.0,'2022-07-13','2022-07-13'),(376,0,17,8.5,'2022-07-13','2022-07-13'),(377,0,17,9.0,'2022-07-13','2022-07-13'),(378,0,17,9.5,'2022-07-13','2022-07-13'),(379,0,17,10.0,'2022-07-13','2022-07-13'),(380,0,17,10.5,'2022-07-13','2022-07-13'),(381,0,17,11.0,'2022-07-13','2022-07-13'),(382,0,17,11.5,'2022-07-13','2022-07-13'),(383,0,17,12.0,'2022-07-13','2022-07-13'),(384,0,17,12.5,'2022-07-13','2022-07-13'),(385,0,17,13.0,'2022-07-13','2022-07-13'),(386,0,17,13.5,'2022-07-13','2022-07-13'),(387,0,17,14.0,'2022-07-13','2022-07-13'),(388,0,17,14.5,'2022-07-13','2022-07-13'),(389,0,17,15.0,'2022-07-13','2022-07-13'),(390,0,17,15.5,'2022-07-13','2022-07-13'),(391,0,18,3.0,'2022-07-13','2022-07-13'),(392,0,18,3.5,'2022-07-13','2022-07-13'),(393,0,18,4.0,'2022-07-13','2022-07-13'),(394,0,18,4.5,'2022-07-13','2022-07-13'),(395,0,18,5.0,'2022-07-13','2022-07-13'),(396,0,18,5.5,'2022-07-13','2022-07-13'),(397,0,18,6.0,'2022-07-13','2022-07-13'),(398,0,18,6.5,'2022-07-13','2022-07-13'),(399,0,18,7.5,'2022-07-13','2022-07-13'),(400,0,18,7.0,'2022-07-13','2022-07-13'),(401,0,18,8.0,'2022-07-13','2022-07-13'),(402,0,18,8.5,'2022-07-13','2022-07-13'),(403,0,18,9.0,'2022-07-13','2022-07-13'),(404,0,18,9.5,'2022-07-13','2022-07-13'),(405,0,18,10.0,'2022-07-13','2022-07-13'),(406,0,18,10.5,'2022-07-13','2022-07-13'),(407,0,18,11.0,'2022-07-13','2022-07-13'),(408,0,18,11.5,'2022-07-13','2022-07-13'),(409,0,18,12.5,'2022-07-13','2022-07-13'),(410,0,18,13.0,'2022-07-13','2022-07-13'),(411,0,18,12.0,'2022-07-13','2022-07-13'),(412,0,18,13.5,'2022-07-13','2022-07-13'),(413,0,18,14.0,'2022-07-13','2022-07-13'),(414,0,18,14.5,'2022-07-13','2022-07-13'),(415,0,18,15.0,'2022-07-13','2022-07-13'),(416,0,18,15.5,'2022-07-13','2022-07-13'),(417,0,19,3.0,'2022-07-13','2022-07-13'),(418,0,19,3.5,'2022-07-13','2022-07-13'),(419,0,19,4.0,'2022-07-13','2022-07-13'),(420,0,19,4.5,'2022-07-13','2022-07-13'),(421,0,19,5.0,'2022-07-13','2022-07-13'),(422,0,19,5.5,'2022-07-13','2022-07-13'),(423,0,19,6.0,'2022-07-13','2022-07-13'),(424,0,19,6.5,'2022-07-13','2022-07-13'),(425,0,19,7.0,'2022-07-13','2022-07-13'),(426,0,19,7.5,'2022-07-13','2022-07-13'),(427,0,19,8.0,'2022-07-13','2022-07-13'),(428,0,19,8.5,'2022-07-13','2022-07-13'),(429,0,19,9.0,'2022-07-13','2022-07-13'),(430,0,19,9.5,'2022-07-13','2022-07-13'),(431,0,19,10.0,'2022-07-13','2022-07-13'),(432,0,19,10.5,'2022-07-13','2022-07-13'),(433,0,19,11.0,'2022-07-13','2022-07-13'),(434,0,19,11.5,'2022-07-13','2022-07-13'),(435,0,19,12.0,'2022-07-13','2022-07-13'),(436,0,19,12.5,'2022-07-13','2022-07-13'),(437,0,19,13.0,'2022-07-13','2022-07-13'),(438,0,19,13.5,'2022-07-13','2022-07-13'),(439,0,19,14.0,'2022-07-13','2022-07-13'),(440,0,19,14.5,'2022-07-13','2022-07-13'),(441,0,19,15.0,'2022-07-13','2022-07-13'),(442,0,19,15.5,'2022-07-13','2022-07-13'),(443,0,20,3.0,'2022-07-13','2022-07-13'),(444,0,20,3.5,'2022-07-13','2022-07-13'),(445,0,20,4.0,'2022-07-13','2022-07-13'),(446,0,20,4.5,'2022-07-13','2022-07-13'),(447,0,20,5.0,'2022-07-13','2022-07-13'),(448,0,20,5.5,'2022-07-13','2022-07-13'),(449,0,20,6.0,'2022-07-13','2022-07-13'),(450,0,20,6.5,'2022-07-13','2022-07-13'),(451,0,20,7.0,'2022-07-13','2022-07-13'),(452,0,20,7.5,'2022-07-13','2022-07-13'),(453,0,20,8.0,'2022-07-13','2022-07-13'),(454,0,20,8.5,'2022-07-13','2022-07-13'),(455,30,20,9.0,'2022-07-13','2022-07-13'),(456,0,20,9.5,'2022-07-13','2022-07-13'),(457,0,20,10.0,'2022-07-13','2022-07-13'),(458,0,20,10.5,'2022-07-13','2022-07-13'),(459,0,20,11.0,'2022-07-13','2022-07-13'),(460,0,20,11.5,'2022-07-13','2022-07-13'),(461,0,20,12.0,'2022-07-13','2022-07-13'),(462,0,20,12.5,'2022-07-13','2022-07-13'),(463,0,20,13.0,'2022-07-13','2022-07-13'),(464,0,20,13.5,'2022-07-13','2022-07-13'),(465,0,20,14.0,'2022-07-13','2022-07-13'),(466,0,20,14.5,'2022-07-13','2022-07-13'),(467,0,20,15.0,'2022-07-13','2022-07-13'),(468,0,20,15.5,'2022-07-13','2022-07-13'),(469,0,21,3.0,'2022-07-13','2022-07-13'),(470,0,21,4.0,'2022-07-13','2022-07-13'),(471,0,21,4.5,'2022-07-13','2022-07-13'),(472,0,21,3.5,'2022-07-13','2022-07-13'),(473,0,21,5.0,'2022-07-13','2022-07-13'),(474,0,21,5.5,'2022-07-13','2022-07-13'),(475,0,21,6.0,'2022-07-13','2022-07-13'),(476,0,21,6.5,'2022-07-13','2022-07-13'),(477,0,21,7.0,'2022-07-13','2022-07-13'),(478,0,21,7.5,'2022-07-13','2022-07-13'),(479,0,21,8.0,'2022-07-13','2022-07-13'),(480,0,21,8.5,'2022-07-13','2022-07-13'),(481,0,21,9.0,'2022-07-13','2022-07-13'),(482,0,21,9.5,'2022-07-13','2022-07-13'),(483,0,21,10.0,'2022-07-13','2022-07-13'),(484,0,21,10.5,'2022-07-13','2022-07-13'),(485,0,21,11.0,'2022-07-13','2022-07-13'),(486,0,21,11.5,'2022-07-13','2022-07-13'),(487,0,21,12.0,'2022-07-13','2022-07-13'),(488,0,21,12.5,'2022-07-13','2022-07-13'),(489,0,21,13.0,'2022-07-13','2022-07-13'),(490,0,21,13.5,'2022-07-13','2022-07-13'),(491,0,21,14.0,'2022-07-13','2022-07-13'),(492,0,21,14.5,'2022-07-13','2022-07-13'),(493,0,21,15.0,'2022-07-13','2022-07-13'),(494,0,21,15.5,'2022-07-13','2022-07-13'),(495,0,22,3.0,'2022-07-13','2022-07-13'),(496,0,22,3.5,'2022-07-13','2022-07-13'),(497,0,22,4.0,'2022-07-13','2022-07-13'),(498,0,22,4.5,'2022-07-13','2022-07-13'),(499,0,22,5.0,'2022-07-13','2022-07-13'),(500,0,22,5.5,'2022-07-13','2022-07-13'),(501,0,22,6.0,'2022-07-13','2022-07-13'),(502,0,22,6.5,'2022-07-13','2022-07-13'),(503,0,22,7.0,'2022-07-13','2022-07-13'),(504,0,22,7.5,'2022-07-13','2022-07-13'),(505,0,22,8.0,'2022-07-13','2022-07-13'),(506,0,22,8.5,'2022-07-13','2022-07-13'),(507,0,22,9.0,'2022-07-13','2022-07-13'),(508,0,22,9.5,'2022-07-13','2022-07-13'),(509,0,22,10.0,'2022-07-13','2022-07-13'),(510,0,22,10.5,'2022-07-13','2022-07-13'),(511,0,22,11.0,'2022-07-13','2022-07-13'),(512,0,22,11.5,'2022-07-13','2022-07-13'),(513,0,22,12.0,'2022-07-13','2022-07-13'),(514,0,22,13.0,'2022-07-13','2022-07-13'),(515,0,22,13.5,'2022-07-13','2022-07-13'),(516,0,22,12.5,'2022-07-13','2022-07-13'),(517,0,22,14.0,'2022-07-13','2022-07-13'),(518,0,22,14.5,'2022-07-13','2022-07-13'),(519,0,22,15.5,'2022-07-13','2022-07-13'),(520,0,22,15.0,'2022-07-13','2022-07-13'),(521,0,23,3.0,'2022-07-13','2022-07-13'),(522,0,23,3.5,'2022-07-13','2022-07-13'),(523,0,23,4.0,'2022-07-13','2022-07-13'),(524,0,23,4.5,'2022-07-13','2022-07-13'),(525,0,23,5.0,'2022-07-13','2022-07-13'),(526,0,23,5.5,'2022-07-13','2022-07-13'),(527,0,23,6.0,'2022-07-13','2022-07-13'),(528,0,23,6.5,'2022-07-13','2022-07-13'),(529,0,23,7.0,'2022-07-13','2022-07-13'),(530,0,23,7.5,'2022-07-13','2022-07-13'),(531,0,23,8.0,'2022-07-13','2022-07-13'),(532,0,23,8.5,'2022-07-13','2022-07-13'),(533,0,23,9.0,'2022-07-13','2022-07-13'),(534,0,23,9.5,'2022-07-13','2022-07-13'),(535,0,23,10.0,'2022-07-13','2022-07-13'),(536,0,23,10.5,'2022-07-13','2022-07-13'),(537,0,23,11.0,'2022-07-13','2022-07-13'),(538,0,23,11.5,'2022-07-13','2022-07-13'),(539,0,23,12.0,'2022-07-13','2022-07-13'),(540,0,23,12.5,'2022-07-13','2022-07-13'),(541,0,23,13.0,'2022-07-13','2022-07-13'),(542,0,23,13.5,'2022-07-13','2022-07-13'),(543,0,23,14.0,'2022-07-13','2022-07-13'),(544,0,23,14.5,'2022-07-13','2022-07-13'),(545,0,23,15.0,'2022-07-13','2022-07-13'),(546,0,23,15.5,'2022-07-13','2022-07-13'),(547,0,24,3.5,'2022-07-13','2022-07-13'),(548,0,24,3.0,'2022-07-13','2022-07-13'),(549,0,24,4.5,'2022-07-13','2022-07-13'),(550,0,24,4.0,'2022-07-13','2022-07-13'),(551,0,24,5.0,'2022-07-13','2022-07-13'),(552,0,24,5.5,'2022-07-13','2022-07-13'),(553,0,24,6.0,'2022-07-13','2022-07-13'),(554,0,24,6.5,'2022-07-13','2022-07-13'),(555,0,24,7.0,'2022-07-13','2022-07-13'),(556,0,24,7.5,'2022-07-13','2022-07-13'),(557,0,24,8.0,'2022-07-13','2022-07-13'),(558,0,24,8.5,'2022-07-13','2022-07-13'),(559,0,24,9.5,'2022-07-13','2022-07-13'),(560,0,24,9.0,'2022-07-13','2022-07-13'),(561,0,24,10.0,'2022-07-13','2022-07-13'),(562,0,24,10.5,'2022-07-13','2022-07-13'),(563,0,24,11.0,'2022-07-13','2022-07-13'),(564,0,24,11.5,'2022-07-13','2022-07-13'),(565,0,24,12.0,'2022-07-13','2022-07-13'),(566,0,24,13.0,'2022-07-13','2022-07-13'),(567,0,24,12.5,'2022-07-13','2022-07-13'),(568,0,24,13.5,'2022-07-13','2022-07-13'),(569,0,24,14.0,'2022-07-13','2022-07-13'),(570,0,24,14.5,'2022-07-13','2022-07-13'),(571,0,24,15.0,'2022-07-13','2022-07-13'),(572,0,24,15.5,'2022-07-13','2022-07-13'),(573,0,25,3.5,'2022-07-13','2022-07-13'),(574,0,25,3.0,'2022-07-13','2022-07-13'),(575,0,25,4.0,'2022-07-13','2022-07-13'),(576,0,25,4.5,'2022-07-13','2022-07-13'),(577,0,25,5.0,'2022-07-13','2022-07-13'),(578,0,25,5.5,'2022-07-13','2022-07-13'),(579,0,25,6.0,'2022-07-13','2022-07-13'),(580,0,25,6.5,'2022-07-13','2022-07-13'),(581,0,25,7.0,'2022-07-13','2022-07-13'),(582,0,25,7.5,'2022-07-13','2022-07-13'),(583,0,25,8.0,'2022-07-13','2022-07-13'),(584,0,25,8.5,'2022-07-13','2022-07-13'),(585,0,25,9.0,'2022-07-13','2022-07-13'),(586,0,25,9.5,'2022-07-13','2022-07-13'),(587,0,25,10.0,'2022-07-13','2022-07-13'),(588,0,25,10.5,'2022-07-13','2022-07-13'),(589,0,25,11.0,'2022-07-13','2022-07-13'),(590,0,25,11.5,'2022-07-13','2022-07-13'),(591,0,25,12.0,'2022-07-13','2022-07-13'),(592,0,25,12.5,'2022-07-13','2022-07-13'),(593,0,25,13.0,'2022-07-13','2022-07-13'),(594,0,25,13.5,'2022-07-13','2022-07-13'),(595,0,25,14.0,'2022-07-13','2022-07-13'),(596,0,25,14.5,'2022-07-13','2022-07-13'),(597,0,25,15.0,'2022-07-13','2022-07-13'),(598,0,25,15.5,'2022-07-13','2022-07-13'),(599,0,26,3.0,'2022-07-13','2022-07-13'),(600,0,26,3.5,'2022-07-13','2022-07-13'),(601,0,26,4.5,'2022-07-13','2022-07-13'),(602,0,26,4.0,'2022-07-13','2022-07-13'),(603,0,26,5.0,'2022-07-13','2022-07-13'),(604,0,26,5.5,'2022-07-13','2022-07-13'),(605,0,26,6.0,'2022-07-13','2022-07-13'),(606,0,26,6.5,'2022-07-13','2022-07-13'),(607,0,26,7.0,'2022-07-13','2022-07-13'),(608,0,26,7.5,'2022-07-13','2022-07-13'),(609,0,26,8.0,'2022-07-13','2022-07-13'),(610,0,26,8.5,'2022-07-13','2022-07-13'),(611,0,26,9.0,'2022-07-13','2022-07-13'),(612,0,26,9.5,'2022-07-13','2022-07-13'),(613,0,26,10.5,'2022-07-13','2022-07-13'),(614,0,26,10.0,'2022-07-13','2022-07-13'),(615,0,26,11.0,'2022-07-13','2022-07-13'),(616,0,26,11.5,'2022-07-13','2022-07-13'),(617,0,26,12.0,'2022-07-13','2022-07-13'),(618,0,26,12.5,'2022-07-13','2022-07-13'),(619,0,26,13.0,'2022-07-13','2022-07-13'),(620,0,26,13.5,'2022-07-13','2022-07-13'),(621,0,26,14.0,'2022-07-13','2022-07-13'),(622,0,26,14.5,'2022-07-13','2022-07-13'),(623,0,26,15.5,'2022-07-13','2022-07-13'),(624,0,26,15.0,'2022-07-13','2022-07-13'),(625,0,27,3.5,'2022-07-13','2022-07-13'),(626,0,27,3.0,'2022-07-13','2022-07-13'),(627,0,27,4.0,'2022-07-13','2022-07-13'),(628,0,27,4.5,'2022-07-13','2022-07-13'),(629,0,27,5.0,'2022-07-13','2022-07-13'),(630,0,27,5.5,'2022-07-13','2022-07-13'),(631,0,27,6.0,'2022-07-13','2022-07-13'),(632,0,27,7.0,'2022-07-13','2022-07-13'),(633,0,27,7.5,'2022-07-13','2022-07-13'),(634,0,27,6.5,'2022-07-13','2022-07-13'),(635,0,27,8.0,'2022-07-13','2022-07-13'),(636,0,27,8.5,'2022-07-13','2022-07-13'),(637,0,27,9.0,'2022-07-13','2022-07-13'),(638,0,27,9.5,'2022-07-13','2022-07-13'),(639,0,27,10.0,'2022-07-13','2022-07-13'),(640,0,27,11.0,'2022-07-13','2022-07-13'),(641,0,27,11.5,'2022-07-13','2022-07-13'),(642,0,27,10.5,'2022-07-13','2022-07-13'),(643,0,27,12.0,'2022-07-13','2022-07-13'),(644,0,27,12.5,'2022-07-13','2022-07-13'),(645,0,27,13.0,'2022-07-13','2022-07-13'),(646,0,27,13.5,'2022-07-13','2022-07-13'),(647,0,27,14.0,'2022-07-13','2022-07-13'),(648,0,27,14.5,'2022-07-13','2022-07-13'),(649,0,27,15.0,'2022-07-13','2022-07-13'),(650,0,27,15.5,'2022-07-13','2022-07-13'),(651,0,28,3.0,'2022-07-13','2022-07-13'),(652,0,28,3.5,'2022-07-13','2022-07-13'),(653,0,28,4.0,'2022-07-13','2022-07-13'),(654,0,28,4.5,'2022-07-13','2022-07-13'),(655,0,28,5.0,'2022-07-13','2022-07-13'),(656,0,28,5.5,'2022-07-13','2022-07-13'),(657,0,28,6.0,'2022-07-13','2022-07-13'),(658,0,28,6.5,'2022-07-13','2022-07-13'),(659,0,28,7.5,'2022-07-13','2022-07-13'),(660,0,28,8.0,'2022-07-13','2022-07-13'),(661,0,28,8.5,'2022-07-13','2022-07-13'),(662,0,28,7.0,'2022-07-13','2022-07-13'),(663,0,28,9.0,'2022-07-13','2022-07-13'),(664,0,28,9.5,'2022-07-13','2022-07-13'),(665,0,28,10.0,'2022-07-13','2022-07-13'),(666,0,28,10.5,'2022-07-13','2022-07-13'),(667,0,28,11.0,'2022-07-13','2022-07-13'),(668,0,28,11.5,'2022-07-13','2022-07-13'),(669,0,28,12.0,'2022-07-13','2022-07-13'),(670,0,28,12.5,'2022-07-13','2022-07-13'),(671,0,28,13.0,'2022-07-13','2022-07-13'),(672,0,28,13.5,'2022-07-13','2022-07-13'),(673,0,28,14.0,'2022-07-13','2022-07-13'),(674,0,28,14.5,'2022-07-13','2022-07-13'),(675,0,28,15.0,'2022-07-13','2022-07-13'),(676,0,28,15.5,'2022-07-13','2022-07-13');
/*!40000 ALTER TABLE `products_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stars` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `id_product` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (3,4,'Parece una serpiente, muy interesante.',9,'2022-07-13','2022-07-13'),(4,2,'20 lucas te cobran y son usados. Esán del tomate. Igual estos precios son cualquier cosa. Abrazo.',27,'2022-07-13','2022-07-13'),(5,1,'Se me rompió la cámara de aire a los 2 días. Que se vayan a cag4r!',27,'2022-07-13','2022-07-13'),(6,5,'Orgásmico el cushion. Muy lindo todo',27,'2022-07-13','2022-07-13');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippings`
--

DROP TABLE IF EXISTS `shippings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `cost` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippings`
--

LOCK TABLES `shippings` WRITE;
/*!40000 ALTER TABLE `shippings` DISABLE KEYS */;
INSERT INTO `shippings` VALUES (1,'Latifi','(7-10 dias habiles)',300),(2,'Común','(5-7 dias habiles)',400),(3,'Rápido','(3-5 dias habiles)',500),(4,'Leclerc','(1-2 dias habiles)',650);
/*!40000 ALTER TABLE `shippings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` decimal(3,1) NOT NULL,
  `number` decimal(3,1) unsigned NOT NULL,
  `centimeters` decimal(3,1) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (3.0,3.0,21.0),(3.5,3.5,21.5),(4.0,4.0,22.0),(4.5,4.5,22.5),(5.0,5.0,23.0),(5.5,5.5,23.5),(6.0,6.0,24.0),(6.5,6.5,24.5),(7.0,7.0,25.0),(7.5,7.5,25.5),(8.0,8.0,26.0),(8.5,8.5,26.5),(9.0,9.0,27.0),(9.5,9.5,27.5),(10.0,10.0,28.0),(10.5,10.5,28.5),(11.0,11.0,29.0),(11.5,11.5,29.5),(12.0,12.0,30.0),(12.5,12.5,30.5),(13.0,13.0,31.0),(13.5,13.5,31.5),(14.0,14.0,32.0),(14.5,14.5,32.5),(15.0,15.0,33.0),(15.5,15.5,33.5);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `category` varchar(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daniel','Duque','dani_duque@aol.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','admin','hidratado.png',NULL,NULL),(2,'Corie','Garoghan','cgaroghan0@people.com.cn','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(3,'Lamond','McJarrow','lmcjarrow1@un.org','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(4,'Augie','Kilmister','akilmister2@ask.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(5,'Tandie','Loche','tloche3@goo.ne.jp','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(6,'Carling','MacConnel','cmacconnel4@macromedia.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(7,'Eberhard','Kynder','ekynder5@shareasale.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(8,'Blaire','Hallows','bhallows6@nbcnews.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(9,'Kerri','Boakes','kboakes7@gmpg.org','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(10,'Natale','Benoit','nbenoit8@blogspot.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(11,'Reidar','Klulik','rklulik9@hp.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(12,'Isacco','Howood','ihowooda@nsw.gov.au','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(13,'Alyson','Franey','afraneyb@timesonline.co.uk','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(14,'Tobe','Barabisch','tbarabischc@youtube.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(15,'Blinny','McCooke','bmccooked@addthis.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(16,'Pammi','Lebbon','plebbone@rambler.ru','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(17,'Maia','McJury','mmcjuryf@businesswire.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(18,'Em','Metzke','emetzkeg@zimbio.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(19,'Myles','Sincock','msincockh@dyndns.org','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(20,'Nickolaus','Sasser','nsasseri@cocolog-nifty.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(21,'Liz','Fishpoole','lfishpoolej@mapy.cz','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(22,'Emmett','Chasemoore','echasemoorek@sourceforge.net','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(23,'Shir','Applewhaite','sapplewhaitel@intel.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(24,'Melli','Wenderott','mwenderottm@tripadvisor.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(25,'Ramsey','Maunders','rmaundersn@squidoo.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(26,'Friederike','Kebell','fkebello@over-blog.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(27,'Eveleen','McCerery','emccereryp@google.com.au','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(28,'Archibold','Munby','amunbyq@msn.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(29,'Aveline','Faraker','afarakerr@cnbc.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(30,'Linc','Kuhlmey','lkuhlmeys@engadget.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(31,'Glenn','Kubczak','gkubczakt@biglobe.ne.jp','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(32,'Lottie','Rigardeau','lrigardeauu@yellowpages.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(33,'Bryn','Dumbare','bdumbarev@irs.gov','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(34,'Joye','Pitchers','jpitchersw@wiley.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(35,'Patty','Vivers','pviversx@fotki.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(36,'Cob','Sedge','csedge10@livejournal.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(37,'Britte','Kilbey','bkilbey11@discovery.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(38,'Ashbey','Goldster','agoldster12@wufoo.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(39,'Verine','Spehr','vspehr13@deviantart.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(40,'Stacy','Horley','shorley14@qq.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(41,'Maure','Timms','mtimms15@scientificamerican.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(42,'Charis','Chetham','cchetham16@redcross.org','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(43,'Emelia','Jagiello','ejagiello17@weather.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(44,'Annissa','Le Friec','alefriec18@paypal.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(45,'Tedmund','Jahnke','tjahnke19@ustream.tv','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(46,'Banky','Poltun','bpoltun1a@marriott.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(47,'Waldo','Choake','wchoake1b@blinklist.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(48,'Alvis','Barnardo','abarnardo1c@reddit.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL),(49,'Fidela','Wilne','fwilne1d@examiner.com','$2a$10$DYJM02GIjljMM5P5YrrMqe/5dTrha/Fv1GJacKd80noN4.2TUDygq','user','dummy_user.webp',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-23 13:06:19
