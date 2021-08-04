
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
('obp.delete',	'Elimina Outbound Proxy',	'Consente di eliminare un Outbound Proxy'),
('obp.edit',	'Modifica Outbound Proxy',	'Consente di creare o modificare un Outbound Proxy'),
('obp.view',	'Mostra gli Outbound Proxy',	'Consente di accedere agli Outbound Proxy definiti nel sistema'),
('user.delete',	'Elimina utente',	'Consente di rimuovere un utente dal sistema'),
('user.edit',	'Modifica utente',	'Consente di aggiungere o modificare gli utenti che possono accedere al sistema'),
('user.view',	'Accedi dati utente',	'Consente di accedere ai dati di un altro utente');

INSERT INTO `LEVEL` (`ID_LEVEL`, `DESCRIZIONE`, `LEVEL`) VALUES
(2,	'Descrizione livello admin',	'ADMIN'),
(4,	'Regional',	'Lead Operations Manager'),
(6,	'Descrizione Level 5',	'Level 6');

INSERT INTO `GRUPPO` (`ID_GRUPPO`, `DESCRIZIONE`, `GRUPPO`) VALUES
(1,	'g1',	'g1'),
(2,	'Forward',	'Central Integration Designer');

INSERT INTO `UTENZE` (`ID_UTENZA`, `USERNAME`, `PASSWORD`, `ID_LEVEL`, `ID_GROUP`, `NOME`, `COGNOME`, `AZIENDA`, `EMAIL`) VALUES
(1, 'test',	'{noop}test',	2,	1,	'nome',	'cognome',	'azienda',	'test@test.it');

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
(2,	'user.view');

INSERT INTO `TYPE_LINEE` (`ID_TYPE_LINEA`, `DESCRIZIONE`) VALUES
(1,	'descrizione type linea 1'),
(2,	'descrizione type linea 2');

INSERT INTO `LINEE` (`ID_LINEA`, `NUMERO`, `ID_TYPE_LINEA`, `IP_LINEA`, `PORTA`, `PASSWORD`) VALUES
(1,	'90-400-754-1037',	1,	'240.195.169.235',	924,	'IdZtVacO4inAlAw'),
(2,	'9042382',	1,	'241.88.251.202',	224,	'passwordSegreta');

