-- Adminer 4.8.0 MySQL 8.0.25 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `TEST_SUITE_TEST`;
DROP TABLE IF EXISTS `TEST_SUITE`;
DROP TABLE IF EXISTS `TEST_CASE_LINEA_CHIAMANTE`;
DROP TABLE IF EXISTS `TEST_CASE`;
DROP TABLE IF EXISTS `TEMPLATE_FILE`;
DROP TABLE IF EXISTS `FILE_SYSTEM`;
DROP TABLE IF EXISTS `TEMPLATE`;
DROP TABLE IF EXISTS `OBP_TYPE_LINEA`;
DROP TABLE IF EXISTS `OUTBOUNDPROXY`;
DROP TABLE IF EXISTS `LINEE`;
DROP TABLE IF EXISTS `TYPE_LINEE`;
DROP TABLE IF EXISTS `AUTORIZZAZIONE_LEVEL`;
DROP TABLE IF EXISTS `AUTORIZZAZIONE_UTENZE`;
DROP TABLE IF EXISTS `UTENZE`;
DROP TABLE IF EXISTS `FUNZIONE`;
DROP TABLE IF EXISTS `LEVEL`;
DROP TABLE IF EXISTS `GRUPPO`;

CREATE TABLE `FUNZIONE` (
  `CODICE` varchar(20) NOT NULL,
  `NOME` varchar(150) NOT NULL,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`CODICE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `GRUPPO` (
  `ID_GRUPPO` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  `GRUPPO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_GRUPPO`),
  UNIQUE KEY `GRUPPO` (`GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `LEVEL` (
  `ID_LEVEL` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  `LEVEL` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_LEVEL`),
  UNIQUE KEY `LEVEL_UQ` (`LEVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `UTENZE` (
  `ID_UTENZA` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `USERNAME` varchar(25) NOT NULL,
  `PASSWORD` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ID_LEVEL` int NOT NULL,
  `ID_GROUP` int NOT NULL,
  `NOME` varchar(50) NOT NULL,
  `COGNOME` varchar(50) NOT NULL,
  `AZIENDA` varchar(70) NOT NULL,
  `EMAIL` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID_UTENZA`),
  KEY `ID_LEVEL` (`ID_LEVEL`),
  KEY `ID_GROUP` (`ID_GROUP`),
  UNIQUE KEY `UTENZE_USERNAME` (`USERNAME`),
  CONSTRAINT `utenze_ibfk_3` FOREIGN KEY (`ID_LEVEL`) REFERENCES `LEVEL` (`ID_LEVEL`),
  CONSTRAINT `utenze_ibfk_4` FOREIGN KEY (`ID_GROUP`) REFERENCES `GRUPPO` (`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `AUTORIZZAZIONE_LEVEL` (
  `ID_LEVEL` int NOT NULL,
  `FUNZIONE_CODICE` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID_LEVEL`,`FUNZIONE_CODICE`),
  KEY `FUNZIONE_CODICE` (`FUNZIONE_CODICE`),
  CONSTRAINT `autorizzazione_level_ibfk_2` FOREIGN KEY (`FUNZIONE_CODICE`) REFERENCES `FUNZIONE` (`CODICE`),
  CONSTRAINT `autorizzazione_level_ibfk_3` FOREIGN KEY (`ID_LEVEL`) REFERENCES `LEVEL` (`ID_LEVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `AUTORIZZAZIONE_UTENZE` (
  `ID_UTENZA` int NOT NULL,
  `FUNZIONE_CODICE` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID_UTENZA`,`FUNZIONE_CODICE`),
  KEY `FUNZIONE_CODICE` (`FUNZIONE_CODICE`),
  CONSTRAINT `autorizzazione_utenze_ibfk_1` FOREIGN KEY (`ID_UTENZA`) REFERENCES `UTENZE` (`ID_UTENZA`),
  CONSTRAINT `autorizzazione_utenze_ibfk_2` FOREIGN KEY (`FUNZIONE_CODICE`) REFERENCES `FUNZIONE` (`CODICE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `TYPE_LINEE` (
  `ID_TYPE_LINEA` int NOT NULL AUTO_INCREMENT ,
  `VERSION` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIZIONE` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID_TYPE_LINEA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `LINEE` (
  `ID_LINEA` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `ID_GRUPPO` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `NUMERO` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ID_TYPE_LINEA` int NOT NULL,
  `IP_LINEA` varchar(39) NOT NULL,
  `PORTA` int NOT NULL,
  `PASSWORD` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ID_LINEA`),
  KEY `ID_TYPE_LINEA` (`ID_TYPE_LINEA`),
  CONSTRAINT `linee_ibfk_1` FOREIGN KEY (`ID_TYPE_LINEA`) REFERENCES `TYPE_LINEE` (`ID_TYPE_LINEA`),
  CONSTRAINT `linee_ibfk_2` FOREIGN KEY(`ID_GRUPPO`) REFERENCES GRUPPO(`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `OUTBOUNDPROXY` (
  `ID_OBP` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `ID_GRUPPO` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `IP_DESTINAZIONE` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DESCRIZIONE` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `PORTA` int NOT NULL,
  PRIMARY KEY (`ID_OBP`),
  CONSTRAINT FOREIGN KEY(`ID_GRUPPO`) REFERENCES GRUPPO(`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `OBP_TYPE_LINEA` (
  `ID_OBP` int NOT NULL,
  `ID_TYPE_LINEA` int NOT NULL,
  KEY `ID_OBP` (`ID_OBP`),
  KEY `ID_TYPE_LINEA` (`ID_TYPE_LINEA`),
  CONSTRAINT `obp_type_linea_ibfk_1` FOREIGN KEY (`ID_OBP`) REFERENCES `OUTBOUNDPROXY` (`ID_OBP`) ON DELETE RESTRICT,
  CONSTRAINT `obp_type_linea_ibfk_2` FOREIGN KEY (`ID_TYPE_LINEA`) REFERENCES `TYPE_LINEE` (`ID_TYPE_LINEA`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- 2021-08-09

CREATE TABLE `TEMPLATE` (
  `ID_TEMPLATE` int NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `ID_GRUPPO` int NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `DURATA` bigint DEFAULT NULL,
  `TYPE_TEMPLATE` varchar(25) DEFAULT NULL,
  `MODIFIED_BY` varchar(25)  NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_BY` varchar(25) NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID_TEMPLATE`),
  UNIQUE KEY `NOME` (`NOME`),
  CONSTRAINT FOREIGN KEY(`ID_GRUPPO`) REFERENCES GRUPPO(`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `FILE_SYSTEM` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `SCOPE` enum('TEMPLATE','TEST')  NOT NULL,
  `ID_REF` int NOT NULL,
  `PATH` varchar(255) NOT NULL,
  `MODIFIED_BY` varchar(25) NOT NULL,
  `CREATED_BY` varchar(25)  NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `CONTENT_TYPE` varchar(255) DEFAULT NULL,
  `CONTENT` mediumblob,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SCOPE_ID_REF_PATH` (`SCOPE`,`ID_REF`,`PATH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `TEMPLATE_FILE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `TEMPLATE_ID` int NOT NULL,
  `FILE_SYSTEM_ID` bigint NOT NULL,
  `CATEGORY` enum('CHIAMANTE','CHIAMATO') NOT NULL,
  `ORDERING` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `TEMPLATE_ID_FILE_SYSTEM_ID_CATEGORY_ORDER` (`TEMPLATE_ID`,`FILE_SYSTEM_ID`,`CATEGORY`,`ORDERING`),
  KEY `FILE_SYSTEM_ID` (`FILE_SYSTEM_ID`),
  CONSTRAINT `template_file_ibfk_1` FOREIGN KEY (`TEMPLATE_ID`) REFERENCES `TEMPLATE` (`ID_TEMPLATE`),
  CONSTRAINT `template_file_ibfk_2` FOREIGN KEY (`FILE_SYSTEM_ID`) REFERENCES `FILE_SYSTEM` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- 2021-08-11

CREATE TABLE `TEST_CASE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `ID_TEMPLATE` int NOT NULL,
  `ID_GRUPPO` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `EXPECTED_DURATION` int NOT NULL DEFAULT '0',
  `VERSION` int NOT NULL,
  `NOME` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIZIONE` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ID_LINEA_CHIAMATO` int DEFAULT NULL,
  `ID_OBP_CHIAMATO` int DEFAULT NULL,
  `FILE_SYSTEM_ID_CHIAMATO` bigint DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NOME` (`NOME`),
  KEY `ID_LINEA_CHIAMATO` (`ID_LINEA_CHIAMATO`),
  KEY `ID_OBP_CHIAMATO` (`ID_OBP_CHIAMATO`),
  KEY `FILE_SYSTEM_ID_CHIAMATO` (`FILE_SYSTEM_ID_CHIAMATO`),
  KEY `ID_TEMPLATE` (`ID_TEMPLATE`),
  CONSTRAINT `test_case_ibfk_1` FOREIGN KEY (`ID_LINEA_CHIAMATO`) REFERENCES `LINEE` (`ID_LINEA`),
  CONSTRAINT `test_case_ibfk_5` FOREIGN KEY (`ID_OBP_CHIAMATO`) REFERENCES `OUTBOUNDPROXY` (`ID_OBP`),
  CONSTRAINT `test_case_ibfk_6` FOREIGN KEY (`FILE_SYSTEM_ID_CHIAMATO`) REFERENCES `FILE_SYSTEM` (`ID`),
  CONSTRAINT `test_case_ibfk_7` FOREIGN KEY (`ID_TEMPLATE`) REFERENCES `TEMPLATE` (`ID_TEMPLATE`),
  CONSTRAINT `test_case_ibfk_8` FOREIGN KEY(`ID_GRUPPO`) REFERENCES GRUPPO(`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `TEST_CASE_LINEA_CHIAMANTE` (
  `TEST_CASE_ID` bigint NOT NULL,
  `NUM_LINEA` smallint NOT NULL,
  `ID_LINEA` int NOT NULL,
  `ID_OBP` int DEFAULT NULL,
  `FILE_SYSTEM_ID` bigint DEFAULT NULL,
  PRIMARY KEY (`TEST_CASE_ID`,`NUM_LINEA`),
  KEY `ID_LINEA` (`ID_LINEA`),
  KEY `ID_OBP` (`ID_OBP`),
  KEY `FILE_SYSTEM_ID` (`FILE_SYSTEM_ID`),
  CONSTRAINT `test_case_linea_chiamante_ibfk_1` FOREIGN KEY (`TEST_CASE_ID`) REFERENCES `TEST_CASE` (`ID`),
  CONSTRAINT `test_case_linea_chiamante_ibfk_2` FOREIGN KEY (`ID_LINEA`) REFERENCES `LINEE` (`ID_LINEA`),
  CONSTRAINT `test_case_linea_chiamante_ibfk_3` FOREIGN KEY (`ID_OBP`) REFERENCES `OUTBOUNDPROXY` (`ID_OBP`),
  CONSTRAINT `test_case_linea_chiamante_ibfk_4` FOREIGN KEY (`FILE_SYSTEM_ID`) REFERENCES `FILE_SYSTEM` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TEST_SUITE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `VERSION` int NOT NULL,
  `ID_GRUPPO` int NOT NULL,
  `MODIFIED_WHEN` timestamp NOT NULL,
  `CREATED_WHEN` timestamp NOT NULL,
  `MODIFIED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `CREATED_BY` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `NOME` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `DESCRIZIONE` varchar(1000) COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NOME` (`NOME`),
  CONSTRAINT `test_suite_ibfk_1` FOREIGN KEY(`ID_GRUPPO`) REFERENCES GRUPPO(`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `TEST_SUITE_TEST` (
  `TEST_SUITE_ID` bigint NOT NULL,
  `TEST_CASE_ID` bigint NOT NULL,
  PRIMARY KEY (`TEST_SUITE_ID`,`TEST_CASE_ID`),
  KEY `TEST_CASE_ID` (`TEST_CASE_ID`),
  CONSTRAINT `test_suite_test_ibfk_1` FOREIGN KEY (`TEST_SUITE_ID`) REFERENCES `TEST_SUITE` (`ID`),
  CONSTRAINT `test_suite_test_ibfk_2` FOREIGN KEY (`TEST_CASE_ID`) REFERENCES `TEST_CASE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
