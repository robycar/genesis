-- Adminer 4.8.0 MySQL 8.0.25 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `AUTORIZZAZIONE_LEVEL`;
CREATE TABLE `AUTORIZZAZIONE_LEVEL` (
  `ID_LEVEL` int NOT NULL,
  `FUNZIONE_CODICE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID_LEVEL`,`FUNZIONE_CODICE`),
  KEY `FUNZIONE_CODICE` (`FUNZIONE_CODICE`),
  CONSTRAINT `autorizzazione_level_ibfk_2` FOREIGN KEY (`FUNZIONE_CODICE`) REFERENCES `FUNZIONE` (`CODICE`),
  CONSTRAINT `autorizzazione_level_ibfk_3` FOREIGN KEY (`ID_LEVEL`) REFERENCES `LEVEL` (`ID_LEVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `AUTORIZZAZIONE_LEVEL` (`ID_LEVEL`, `FUNZIONE_CODICE`) VALUES
(2,	'group.delete'),
(2,	'group.edit'),
(2,	'group.view'),
(2,	'level.delete'),
(2,	'level.edit'),
(6,	'level.edit'),
(2,	'level.view'),
(2,	'linea.delete'),
(2,	'linea.edit'),
(2,	'linea.view'),
(2,	'user.delete'),
(2,	'user.edit'),
(2,	'user.view'),
(6,	'user.view');

DROP TABLE IF EXISTS `AUTORIZZAZIONE_UTENZE`;
CREATE TABLE `AUTORIZZAZIONE_UTENZE` (
  `ID_UTENZA` int NOT NULL,
  `FUNZIONE_CODICE` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID_UTENZA`,`FUNZIONE_CODICE`),
  KEY `FUNZIONE_CODICE` (`FUNZIONE_CODICE`),
  CONSTRAINT `autorizzazione_utenze_ibfk_1` FOREIGN KEY (`ID_UTENZA`) REFERENCES `UTENZE` (`ID_UTENZA`),
  CONSTRAINT `autorizzazione_utenze_ibfk_2` FOREIGN KEY (`FUNZIONE_CODICE`) REFERENCES `FUNZIONE` (`CODICE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `FUNZIONE`;
CREATE TABLE `FUNZIONE` (
  `CODICE` varchar(20) NOT NULL,
  `NOME` varchar(150) NOT NULL,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`CODICE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `FUNZIONE` (`CODICE`, `NOME`, `DESCRIZIONE`) VALUES
('group.delete',	'Elimina gruppo',	'Rimuove un gruppo dal sistema'),
('group.edit',	'Modifica gruppo',	'Consente di modificare un gruppo'),
('group.view',	'Mostra gruppi',	'Consente di accedere ai gruppi di utente'),
('level.delete',	'Elimina livello',	'Consente di eliminare un livello'),
('level.edit',	'Modifica livello',	'Consente di modificare un livello'),
('level.view',	'Mostra i livelli',	'Consente di accedere ai livelli definiti nel sistema'),
('linea.delete',	'Elimina linea',	'Consente di eliminare una linea'),
('linea.edit',	'Modifica linea',	'consente di modificare una linea'),
('linea.view',	'Mostra le linee',	'Consente di accedere alle linee presenti nel sistema'),
('user.delete',	'Elimina utente',	'Consente di rimuovere un utente dal sistema'),
('user.edit',	'Modifica utente',	'Consente di aggiungere o modificare gli utenti che possono accedere al sistema'),
('user.view',	'Accedi dati utente',	'Consente di accedere ai dati di un altro utente');

DROP TABLE IF EXISTS `GRUPPO`;
CREATE TABLE `GRUPPO` (
  `ID_GRUPPO` int NOT NULL AUTO_INCREMENT,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  `GRUPPO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `GRUPPO` (`ID_GRUPPO`, `DESCRIZIONE`, `GRUPPO`) VALUES
(1,	'g1',	'g1'),
(2,	'Forward',	'Central Integration Designer');

DROP TABLE IF EXISTS `LEVEL`;
CREATE TABLE `LEVEL` (
  `ID_LEVEL` int NOT NULL AUTO_INCREMENT,
  `DESCRIZIONE` varchar(1000) DEFAULT NULL,
  `LEVEL` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_LEVEL`),
  UNIQUE KEY `LEVEL_UQ` (`LEVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `LEVEL` (`ID_LEVEL`, `DESCRIZIONE`, `LEVEL`) VALUES
(2,	'Descrizione livello admin',	'ADMIN'),
(4,	'Regional',	'Lead Operations Manager'),
(6,	'Descrizione Level 5',	'Level 6');

DROP TABLE IF EXISTS `LINEE`;
CREATE TABLE `LINEE` (
  `ID_LINEA` int NOT NULL AUTO_INCREMENT,
  `NUMERO` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin NOT NULL,
  `ID_TYPE_LINEA` int NOT NULL,
  `IP_LINEA` varchar(39) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PORTA` int NOT NULL,
  `PASSWORD` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`ID_LINEA`),
  KEY `ID_TYPE_LINEA` (`ID_TYPE_LINEA`),
  CONSTRAINT `linee_ibfk_1` FOREIGN KEY (`ID_TYPE_LINEA`) REFERENCES `TYPE_LINEE` (`ID_TYPE_LINEA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `LINEE` (`ID_LINEA`, `NUMERO`, `ID_TYPE_LINEA`, `IP_LINEA`, `PORTA`, `PASSWORD`) VALUES
(1,	'90-400-754-1037',	1,	'240.195.169.235',	924,	'IdZtVacO4inAlAw'),
(2,	'9042382',	1,	'241.88.251.202',	224,	'passwordSegreta');

DROP TABLE IF EXISTS `TYPE_LINEE`;
CREATE TABLE `TYPE_LINEE` (
  `ID_TYPE_LINEA` int NOT NULL,
  `DESCRIZIONE` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID_TYPE_LINEA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `TYPE_LINEE` (`ID_TYPE_LINEA`, `DESCRIZIONE`) VALUES
(1,	'descrizione type linea 1'),
(2,	'descrizione type linea 2');

DROP TABLE IF EXISTS `UTENZE`;
CREATE TABLE `UTENZE` (
  `ID_UTENZA` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(25) NOT NULL,
  `PASSWORD` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ID_LEVEL` int NOT NULL,
  `ID_GROUP` int NOT NULL,
  `NOME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `COGNOME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `AZIENDA` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`ID_UTENZA`),
  KEY `ID_LEVEL` (`ID_LEVEL`),
  KEY `ID_GROUP` (`ID_GROUP`),
  CONSTRAINT `utenze_ibfk_3` FOREIGN KEY (`ID_LEVEL`) REFERENCES `LEVEL` (`ID_LEVEL`),
  CONSTRAINT `utenze_ibfk_4` FOREIGN KEY (`ID_GROUP`) REFERENCES `GRUPPO` (`ID_GRUPPO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `UTENZE` (`ID_UTENZA`, `USERNAME`, `PASSWORD`, `ID_LEVEL`, `ID_GROUP`, `NOME`, `COGNOME`, `AZIENDA`) VALUES
(1,	'test',	'{noop}test',	2,	1,	'nome',	'cognome',	'azienda'),
(2,	'test2',	'{bcrypt}$2a$10$OaqeCzbt8SlYGm4FJa7Ru.D.NamHojDDC/UJaB3uIRf7f7QbNgT4e',	4,	2,	'Neva',	'Tromp',	'Quigley Inc'),
(3,	'RFBUbsJtaDuUl6g',	'{bcrypt}$2a$10$YWSVEp6QxBknYQ9.VakGpOdR9szIG0eUtDw4z7QErhFx6NcgqGDd.',	4,	1,	'Raina',	'Muller',	'Osinski Group'),
(4,	'j4LF_SGh6Ml6n4D',	'{bcrypt}$2a$10$uST9hNmsLIesttAVGA35jedF77DczK/PCP62bNBkSq5D1.alk1/WG',	4,	1,	'Preston',	'Lindgren',	'Cronin - Larkin'),
(5,	'Z8fThHxwZCm_Pl6',	'{bcrypt}$2a$10$nthMbb.8A1qTGHcQ4tKRIOPXLPf8IoOAMbozDCYnN6XZQXbROhpzG',	4,	1,	'Arden',	'Fahey',	'Littel - Monahan'),
(6,	'1SeKrL3L3mCljlQ',	'{bcrypt}$2a$10$daQM3x0BLdQhIH8ZCiQfe.3UR0yHnlfAubMsQKBcYZPAeNsnhK2qC',	4,	1,	'Tyson',	'Jaskolski',	'Lakin and Sons'),
(7,	'_beibN_r7_7JL40',	'{bcrypt}$2a$10$dQ8bSHNWaQlEXuJ9.OfPjetraUXxjhtLMTxKarILzLlnmih7aE/wu',	4,	1,	'Isom',	'Bins',	'Brekke - Reichel'),
(8,	'lwUR1QJJLelHO8x',	'{bcrypt}$2a$10$mvWNe8qoJD772s1uLydsVeB82Kq7HGifhP35nmclJRccKOP/39rYK',	4,	1,	'Abelardo',	'Sawayn',	'Sawayn - Bailey');


DROP TABLE IF EXISTS `OUTBOUNDPROXY`;
CREATE TABLE `OUTBOUNDPROXY` (
  `ID_OBP` int NOT NULL AUTO_INCREMENT,
  `IP_DESTINAZIONE` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DESCRIZIONE` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `PORTA` int NOT NULL,
  PRIMARY KEY (`ID_OBP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 2021-07-21 08:35:42
