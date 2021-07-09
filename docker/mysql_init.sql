-- Adminer 4.8.0 MySQL 8.0.25 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `GRUPPO`;
CREATE TABLE `GRUPPO` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOME` varchar(20) NOT NULL,
  `DESCRIZIONE` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `GRUPPO_UK` (`NOME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `GRUPPO` (`ID`, `NOME`, `DESCRIZIONE`) VALUES
(1,	'Gruppo1',	'Descrizione gruppo 1'),
(2,	'Gruppo 2',	'Descrizione gruppo 2'),
(12,	'Dynamic Quality Liai',	'Future'),
(13,	'Regional Data Strate',	'Global');

DROP TABLE IF EXISTS `OPERATION`;
CREATE TABLE `OPERATION` (
  `CODE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `NAME` varchar(40) DEFAULT NULL,
  `DESCRIPTION` tinytext NOT NULL,
  PRIMARY KEY (`CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `OPERATION` (`CODE`, `NAME`, `DESCRIPTION`) VALUES
('gruppo.edit',	'Modifica gruppi',	'Consente di modificare un gruppo'),
('gruppo.view',	'Mostra gruppi',	'Consente di visualizzare i gruppi presenti nel sistema'),
('role.edit',	'Modifica ruoli',	'Consente di definire i ruoli dell\'applicazione'),
('test.run',	'Avvio di un test case',	'Consente di avviare un test case, impostando i parametri di lancio'),
('user.edit',	'Modifica utenti',	'Consente di aggiungere, rimuovere o modificare gli utenti che possono accedere all\'applicazione'),
('user.role.edit',	'Modifica ruoli utente',	'Consente di assegnare o rimuovere i ruoli agli utenti'),
('user.view',	'Visualizza utenti',	'Consente di visualizzare i dati relativi agli utenti registrati nel sistema');

DROP TABLE IF EXISTS `ROLE`;
CREATE TABLE `ROLE` (
  `NAME` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ROLE` (`NAME`) VALUES
('ADMIN'),
('RUNNER'),
('USER');

DROP TABLE IF EXISTS `ROLE_OPERATION`;
CREATE TABLE `ROLE_OPERATION` (
  `ROLE_NAME` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `OPERATION_CODE` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`ROLE_NAME`,`OPERATION_CODE`),
  KEY `OPERATION_CODE` (`OPERATION_CODE`),
  CONSTRAINT `ROLE_OPERATION_ibfk_1` FOREIGN KEY (`ROLE_NAME`) REFERENCES `ROLE` (`NAME`) ON DELETE CASCADE,
  CONSTRAINT `ROLE_OPERATION_ibfk_2` FOREIGN KEY (`OPERATION_CODE`) REFERENCES `OPERATION` (`CODE`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ROLE_OPERATION` (`ROLE_NAME`, `OPERATION_CODE`) VALUES
('ADMIN',	'gruppo.edit'),
('ADMIN',	'gruppo.view'),
('ADMIN',	'role.edit'),
('RUNNER',	'test.run'),
('USER',	'test.run'),
('ADMIN',	'user.edit'),
('ADMIN',	'user.role.edit'),
('ADMIN',	'user.view'),
('USER',	'user.view');

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `TYPE` enum('LOCAL','LDAP') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `USERNAME` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `PASSWORD` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TOKEN` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `EMAIL` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin DEFAULT NULL,
  `COGNOME` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `NOME` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TEL1` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TEL2` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `GRUPPO_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_USERNAME_UQ` (`USERNAME`),
  KEY `UTENTE_IDX_GRUPPO_ID` (`GRUPPO_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`GRUPPO_ID`) REFERENCES `GRUPPO` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `USER` (`ID`, `TYPE`, `USERNAME`, `PASSWORD`, `TOKEN`, `EMAIL`, `COGNOME`, `NOME`, `TEL1`, `TEL2`, `GRUPPO_ID`) VALUES
(1,	'LOCAL',	'test',	'{noop}test',	'51742615-cb3b-43ab-8838-d9160df81294',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(2,	'LOCAL',	'test2',	'{bcrypt}$2a$10$m5ovfkAnJ2MpJdmiJB4OWeloLX4rrzBeqQ3O1X3V2RwPj0eYS6Ie2',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	1);

DROP TABLE IF EXISTS `USER_ROLE`;
CREATE TABLE `USER_ROLE` (
  `USER_ID` int unsigned NOT NULL,
  `ROLE_NAME` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`USER_ID`,`ROLE_NAME`),
  KEY `ROLE_NAME` (`ROLE_NAME`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`ID`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`ROLE_NAME`) REFERENCES `ROLE` (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `USER_ROLE` (`USER_ID`, `ROLE_NAME`) VALUES
(1,	'ADMIN'),
(1,	'RUNNER'),
(1,	'USER'),
(2,	'USER');

-- 2021-07-09 06:15:13
