INSERT INTO `FUNZIONE` (`CODICE`, `RESERVED`, `NOME`, `DESCRIZIONE`)
VALUES ('testgen.run', '0', 'Carica/Lancia Test Generatore', 'Carica/Lancia Test Generatore');

INSERT INTO AUTORIZZAZIONE_LEVEL(ID_LEVEL, FUNZIONE_CODICE)
SELECT L.ID_LEVEL, F.CODICE
FROM (LEVEL L, FUNZIONE F)
LEFT JOIN AUTORIZZAZIONE_LEVEL AL ON (AL.ID_LEVEL = L.ID_LEVEL AND AL.FUNZIONE_CODICE=F.CODICE)
WHERE LEVEL IN ('test', 'ADMIN')
AND AL.ID_LEVEL IS NULL
;

COMMIT;
