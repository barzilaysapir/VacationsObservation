-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `vacation_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  KEY `user_id_idx` (`user_id`),
  KEY `vacation_id_idx` (`user_id`,`vacation_id`),
  KEY `vacation_id_idx1` (`vacation_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacation_id` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (7,17),(8,17),(10,17),(7,18),(10,18),(11,18);
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sapir12','5fa822b94ddc869984fdcc0951bcb8b1','','','ADMIN'),(17,'1','508dce8720665162875470a1d283136e','11','I\'m eleven','CUSTOMER'),(18,'may2','35b329b6be5526b959e5f063974ad6bb','May','','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `destination` varchar(60) NOT NULL,
  `image_url` varchar(300) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Rome','https://upload.wikimedia.org/wikipedia/commons/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg','The capital city and a special comune of Italy.',200,'2021-01-31','2021-02-03'),(2,'London','https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/05/28/big-ben-london-england.jpg.rend.hgtvcom.1280.960.suffix/1491582155388.jpeg','The capital and largest city of England and the United Kingdom.',3001,'2021-02-10','2021-02-13'),(3,'Las Vegas','https://s31606.pcdn.co/wp-content/uploads/2020/06/iStock-1144242421-e1591402294411-1024x578.jpg','The 28th-most populous city in the United States.',700,'2021-02-06','2021-02-13'),(4,'Paris','https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg','The capital and most populous city of France.',300,'2021-02-10','2021-02-28'),(5,'NYC','https://specials-images.forbesimg.com/imageserve/5d93909224fbf10007b8a1fd/960x0.jpg','The most populous city in the United States.',650,'2021-01-31','2021-02-13'),(6,'Colombia','https://www.theglobalrecruiter.com/wp-content/uploads/2020/09/colombia-e1599041123318.png','A transcontinental country largely in the north of South America, with territories in North America.',590,'2021-02-03','2021-02-13'),(7,'Mexico','https://glimpse.org/wp-content/uploads/2020/06/Dashboard-Crucifix-A-Seatbelt-Lover-in-Mexico-1024x683.jpg','The capital and largest city of Mexico and the most-populous city in North America.',670,'2021-02-10','2021-02-07'),(8,'Dubai','https://upload.wikimedia.org/wikipedia/commons/6/69/Dubai_-_lonely_desert_-_%D8%A7%D9%84%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1_%D9%88%D8%AD%D9%8A%D8%AF%D8%A7_-_panoramio_%284%29.jpg','The most populous city in the United Arab Emirates, and the capital of the Emirate of Dubai',150,'2021-02-05','2021-02-26'),(9,'New Zealand','https://images.movehub.com/wp-content/uploads/2018/08/15163753/nz-22.jpg','An island country in the southwestern Pacific Ocean',800,'2021-02-06','2021-02-20'),(10,'Bora Bora','https://pix10.agoda.net/hotelImages/2311976/0/28f866c007b559024a4833e6ea93217b.jpg?s=1024x768','Aמ island group in the Leeward group in the western part of the Society Islands of French Polynesia.',900,'2021-02-06','2021-03-05'),(11,'Tokyo','https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg','The capital and most populous prefecture of Japan',480,'2021-02-04','2021-02-11'),(12,'Barcelona','https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/56/64.jpg','A city on the coast of northeastern Spain, the capital and largest city of Catalonia.',620,'2021-02-03','2021-02-10'),(13,'1','1','1',1,'2021-02-02','2021-02-02');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-03  9:09:16
