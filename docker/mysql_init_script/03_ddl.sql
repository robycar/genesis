SET NAMES utf8;
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `TEMPLATE_LINEA_CHIAMANTE`;
DROP TABLE IF EXISTS `TIPO_TEMPLATE`;

CREATE TABLE `TIPO_TEMPLATE` (
  `NOME` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`NOME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `TIPO_TEMPLATE` (`NOME`) VALUES
('3PY'),
('CFB'),
('CFU – CFNR – CW – CFnoAv'),
('Chiamata Base'),
('Chiamate ACU – CDC –NNG'),
('Manovra'),
('Registrazione/Deregistrazione');

INSERT INTO `TIPO_TEMPLATE`
SELECT DISTINCT TYPE_TEMPLATE FROM TEMPLATE WHERE TYPE_TEMPLATE NOT IN (SELECT NOME FROM TIPO_TEMPLATE)
;

ALTER TABLE `TEMPLATE`
CHANGE `TYPE_TEMPLATE` `TYPE_TEMPLATE` varchar(40) COLLATE 'utf8mb4_general_ci' NULL AFTER `DURATA`,
ADD CONSTRAINT `TEMPLATE_ibfk_2` FOREIGN KEY (`TYPE_TEMPLATE`) REFERENCES `TIPO_TEMPLATE` (`NOME`);

ALTER TABLE `TYPE_LINEE`
ADD `NATURA` enum('REALE','SIMULATO') NOT NULL DEFAULT 'REALE' AFTER `CREATED_BY`;

CREATE TABLE `TEMPLATE_LINEA_CHIAMANTE` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `TEMPLATE_ID` int NOT NULL,
  `FILE_SYSTEM_ID` bigint NOT NULL,
  `NATURA` enum('REALE','SIMULATO') NOT NULL,
  `ORDERING` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `TEMPLATE_ID` (`TEMPLATE_ID`),
  KEY `FILE_SYSTEM_ID` (`FILE_SYSTEM_ID`),
  CONSTRAINT `template_linea_chiamante_ibfk_1` FOREIGN KEY (`TEMPLATE_ID`) REFERENCES `TEMPLATE` (`ID_TEMPLATE`),
  CONSTRAINT `template_linea_chiamante_ibfk_2` FOREIGN KEY (`FILE_SYSTEM_ID`) REFERENCES `FILE_SYSTEM` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `TEMPLATE`
ADD `FILE_SYSTEM_ID_CHIAMATO` bigint NULL AFTER `CREATED_WHEN`,
ADD `NATURA_CHIAMATO` enum('REALE','SIMULATO') NULL AFTER `FILE_SYSTEM_ID_CHIAMATO`,
ADD CONSTRAINT `TEMPLATE_ibfk_3` FOREIGN KEY (`FILE_SYSTEM_ID_CHIAMATO`) REFERENCES `FILE_SYSTEM` (`ID`);


INSERT INTO TEMPLATE_LINEA_CHIAMANTE (TEMPLATE_ID, FILE_SYSTEM_ID, NATURA, ORDERING)
SELECT TEMPLATE_ID, FILE_SYSTEM_ID, 'REALE', ORDERING-1
FROM TEMPLATE_FILE
WHERE CATEGORY='CHIAMANTE'
;

UPDATE TEMPLATE AS T
INNER JOIN TEMPLATE_FILE AS TF ON T.ID_TEMPLATE = TF.TEMPLATE_ID AND TF.CATEGORY='CHIAMATO'
SET FILE_SYSTEM_ID_CHIAMATO = TF.FILE_SYSTEM_ID
;

UPDATE TEMPLATE SET NATURA_CHIAMATO='REALE' WHERE NATURA_CHIAMATO IS NULL
;

-- rimozione file dai test case
ALTER TABLE TEST_CASE 
DROP CONSTRAINT `test_case_ibfk_6`,
DROP COLUMN FILE_SYSTEM_ID_CHIAMATO
;

ALTER TABLE TEST_CASE_LINEA_CHIAMANTE
DROP CONSTRAINT `test_case_linea_chiamante_ibfk_4`,
DROP COLUMN `FILE_SYSTEM_ID`
;
