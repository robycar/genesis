
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
('linea.create', 'Creazione linea', 'Creazione linea'),
('obp.delete',	'Elimina Outbound Proxy',	'Consente di eliminare un Outbound Proxy'),
('obp.edit',	'Modifica Outbound Proxy',	'Consente di creare o modificare un Outbound Proxy'),
('obp.view',	'Mostra gli Outbound Proxy',	'Consente di accedere agli Outbound Proxy definiti nel sistema'),
('user.delete',	'Elimina utente',	'Consente di rimuovere un utente dal sistema'),
('user.edit',	'Modifica utente',	'Consente di aggiungere o modificare gli utenti che possono accedere al sistema'),
('user.view',	'Accedi dati utente',	'Consente di accedere ai dati di un altro utente'),
('template.view', 'Mostra test template', 'Consente di visualizzare i test template definiti nel sistema'),
('template.create', 'Crea un Test Template', 'Consente di create un nuovo template per la creazione dei test case'),
('template.edit', 'Modifica Test Template', 'Consente di modificare un template di test case'),
('template.delete', 'Elimina test Template', 'Consente di eliminare i template dei test definiti nel sistema'),
('test.view', 'Mostra Test Case', 'Consente di accedere ai test case'),
('test.edit', 'Modifica Test Case', 'Consente di modificare un test case'),
('test.delete', 'Elimina Test Case', 'Consente di eliminare un test case'),
('testsuite.view', 'Mostra Test Suite', 'Consente di accedere ad una test suite'),
('testsuite.edit', 'Modifica Test Suite', 'Consente di modificare una test suite esistente'),
('testsuite.create', 'Crea Test Suite', 'Consente di creare una nuova test suite'),
('testsuite.delete', 'Elimina Test Suite', 'Consente di eliminare una test suite esistente'),
('lineagen.view', 'Visualizza Linea Generatore', 'Visualizza Linea Generatore'),
('lineagen.create', 'Creazione Linea Generatore', 'Creazione Linea Generatore'),
('lineagen.edit', 'Modifica Linea Generatore', 'Modifica Linea Generatore'),
('lineagen.delete', 'Elimina Linea Generatore', 'Elimina Linea Generatore')
;

INSERT INTO `LEVEL` (`ID_LEVEL`, `DESCRIZIONE`, `LEVEL`, `MODIFIED_WHEN`, `CREATED_WHEN`, `MODIFIED_BY`, `CREATED_BY`, `VERSION`) VALUES
(2,	'Descrizione livello admin',	'ADMIN', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1),
(4,	'Regional',	'Lead Operations Manager', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1),
(5,	'Descrizione Level 5',	'Level 5', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1);

INSERT INTO `GRUPPO` (`ID_GRUPPO`, `DESCRIZIONE`, `GRUPPO`, `MODIFIED_WHEN`, `CREATED_WHEN`, `MODIFIED_BY`, `CREATED_BY`, `VERSION`) VALUES
(1,	'g1',	'g1', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1),
(2,	'Forward',	'Central Integration Designer', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1);

INSERT INTO `UTENZE` (`ID_UTENZA`, `USERNAME`, `PASSWORD`, `ID_LEVEL`, `ID_GROUP`, `NOME`, `COGNOME`, `AZIENDA`, `EMAIL`, `MODIFIED_WHEN`, `CREATED_WHEN`, `MODIFIED_BY`, `CREATED_BY`, `VERSION`) VALUES
(1, 'test',	'{noop}test',	2,	1,	'nome',	'cognome',	'azienda',	'test@test.it', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1);

INSERT INTO AUTORIZZAZIONE_LEVEL(ID_LEVEL, FUNZIONE_CODICE)
SELECT L.ID_LEVEL, F.CODICE
FROM (LEVEL L, FUNZIONE F)
LEFT JOIN AUTORIZZAZIONE_LEVEL AL ON (AL.ID_LEVEL = L.ID_LEVEL AND AL.FUNZIONE_CODICE=F.CODICE)
WHERE LEVEL = 'ADMIN'
AND AL.ID_LEVEL IS NULL
;

INSERT INTO `TYPE_LINEE` (`ID_TYPE_LINEA`, `DESCRIZIONE`, `MODIFIED_WHEN`, `CREATED_WHEN`, `MODIFIED_BY`, `CREATED_BY`, `VERSION`) VALUES
(1,	'descrizione type linea 1', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1),
(2,	'descrizione type linea 2', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1);

INSERT INTO `LINEE` (`ID_LINEA`, `ID_GRUPPO`, `NUMERO`, `ID_TYPE_LINEA`, `IP_LINEA`, `PORTA`, `PASSWORD`, `MODIFIED_WHEN`, `CREATED_WHEN`, `MODIFIED_BY`, `CREATED_BY`, `VERSION`) VALUES
(1,	1, '90-400-754-1037',	1,	'240.195.169.235',	924,	'IdZtVacO4inAlAw', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1),
(2,	1, '9042382',	1,	'241.88.251.202',	224,	'passwordSegreta', '2000-01-01 11:30:10', '2000-01-01 11:30:10', 'init', 'init', 1);


-- 2021-08-09 Solo per prepopolare alcuni file per lo sviluppo sui template

INSERT INTO `TEMPLATE` (`ID_TEMPLATE`, `ID_GRUPPO`, `VERSION`, `NOME`, `DURATA`, `TYPE_TEMPLATE`, `MODIFIED_BY`, `MODIFIED_WHEN`, `CREATED_BY`, `CREATED_WHEN`, `DESCRIZIONE`) VALUES
(1,	1, 21,	'Template 1',	57,	'bohh',	'test',	'2021-08-09 20:01:13',	'test',	'2021-08-06 18:41:30',	'Descrizione molto lunga per il template 1');

INSERT INTO `FILE_SYSTEM` (`ID`, `VERSION`, `SCOPE`, `ID_REF`, `PATH`, `MODIFIED_BY`, `CREATED_BY`, `MODIFIED_WHEN`, `CREATED_WHEN`, `CONTENT_TYPE`, `CONTENT`) VALUES
(1,	0,	'TEMPLATE',	1,	'file1.xml',	'roby',	'roby',	'2021-08-09 11:03:10',	'2021-08-09 11:03:10',	'application/xml',	'<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n	xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n	<modelVersion>4.0.0</modelVersion>\n	<parent>\n		<groupId>org.springframework.boot</groupId>\n		<artifactId>spring-boot-starter-parent</artifactId>\n		<version>2.5.0</version>\n		<relativePath/> <!-- lookup parent from repository -->\n	</parent>\n	<groupId>it.reply.sipp</groupId>\n	<artifactId>sipp</artifactId>\n	<version>0.0.1-SNAPSHOT</version>\n	<packaging>war</packaging>\n	<name>sipp</name>\n	<description>Sipp project</description>\n	<properties>\n		<java.version>11</java.version>\n	</properties>\n	<dependencies>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jdbc</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jpa</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-security</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-web</artifactId>\n		</dependency>\n\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-devtools</artifactId>\n			<scope>runtime</scope>\n			<optional>true</optional>\n		</dependency>\n		<dependency>\n			<groupId>mysql</groupId>\n			<artifactId>mysql-connector-java</artifactId>\n			<scope>runtime</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-tomcat</artifactId>\n			<scope>provided</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.security</groupId>\n			<artifactId>spring-security-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>com.auth0</groupId>\n			<artifactId>java-jwt</artifactId>\n			<version>3.16.0</version>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-validation</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.apache.commons</groupId>\n			<artifactId>commons-lang3</artifactId>\n		</dependency>\n	</dependencies>\n\n	<build>\n		<plugins>\n			<plugin>\n				<groupId>org.springframework.boot</groupId>\n				<artifactId>spring-boot-maven-plugin</artifactId>\n			</plugin>\n		</plugins>\n	</build>\n\n</project>\n'),
(2,	0,	'TEMPLATE',	1,	'file2.xml',	'roby',	'roby',	'2021-08-09 11:03:10',	'2021-08-09 11:03:10',	'application/xml',	'<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n	xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n	<modelVersion>4.0.0</modelVersion>\n	<parent>\n		<groupId>org.springframework.boot</groupId>\n		<artifactId>spring-boot-starter-parent</artifactId>\n		<version>2.5.0</version>\n		<relativePath/> <!-- lookup parent from repository -->\n	</parent>\n	<groupId>it.reply.sipp</groupId>\n	<artifactId>sipp</artifactId>\n	<version>0.0.1-SNAPSHOT</version>\n	<packaging>war</packaging>\n	<name>sipp</name>\n	<description>Sipp project</description>\n	<properties>\n		<java.version>11</java.version>\n	</properties>\n	<dependencies>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jdbc</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jpa</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-security</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-web</artifactId>\n		</dependency>\n\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-devtools</artifactId>\n			<scope>runtime</scope>\n			<optional>true</optional>\n		</dependency>\n		<dependency>\n			<groupId>mysql</groupId>\n			<artifactId>mysql-connector-java</artifactId>\n			<scope>runtime</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-tomcat</artifactId>\n			<scope>provided</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.security</groupId>\n			<artifactId>spring-security-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>com.auth0</groupId>\n			<artifactId>java-jwt</artifactId>\n			<version>3.16.0</version>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-validation</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.apache.commons</groupId>\n			<artifactId>commons-lang3</artifactId>\n		</dependency>\n	</dependencies>\n\n	<build>\n		<plugins>\n			<plugin>\n				<groupId>org.springframework.boot</groupId>\n				<artifactId>spring-boot-maven-plugin</artifactId>\n			</plugin>\n		</plugins>\n	</build>\n\n</project>\n'),
(3,	0,	'TEMPLATE',	1,	'file3.xml',	'roby',	'roby',	'2021-08-09 11:03:10',	'2021-08-09 11:03:10',	'application/xml',	'<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n	xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n	<modelVersion>4.0.0</modelVersion>\n	<parent>\n		<groupId>org.springframework.boot</groupId>\n		<artifactId>spring-boot-starter-parent</artifactId>\n		<version>2.5.0</version>\n		<relativePath/> <!-- lookup parent from repository -->\n	</parent>\n	<groupId>it.reply.sipp</groupId>\n	<artifactId>sipp</artifactId>\n	<version>0.0.1-SNAPSHOT</version>\n	<packaging>war</packaging>\n	<name>sipp</name>\n	<description>Sipp project</description>\n	<properties>\n		<java.version>11</java.version>\n	</properties>\n	<dependencies>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jdbc</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jpa</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-security</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-web</artifactId>\n		</dependency>\n\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-devtools</artifactId>\n			<scope>runtime</scope>\n			<optional>true</optional>\n		</dependency>\n		<dependency>\n			<groupId>mysql</groupId>\n			<artifactId>mysql-connector-java</artifactId>\n			<scope>runtime</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-tomcat</artifactId>\n			<scope>provided</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.security</groupId>\n			<artifactId>spring-security-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>com.auth0</groupId>\n			<artifactId>java-jwt</artifactId>\n			<version>3.16.0</version>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-validation</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.apache.commons</groupId>\n			<artifactId>commons-lang3</artifactId>\n		</dependency>\n	</dependencies>\n\n	<build>\n		<plugins>\n			<plugin>\n				<groupId>org.springframework.boot</groupId>\n				<artifactId>spring-boot-maven-plugin</artifactId>\n			</plugin>\n		</plugins>\n	</build>\n\n</project>\n'),
(4,	0,	'TEMPLATE',	1,	'file4.xml',	'roby',	'roby',	'2021-08-09 11:03:10',	'2021-08-09 11:03:10',	'application/xml',	'<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n	xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n	<modelVersion>4.0.0</modelVersion>\n	<parent>\n		<groupId>org.springframework.boot</groupId>\n		<artifactId>spring-boot-starter-parent</artifactId>\n		<version>2.5.0</version>\n		<relativePath/> <!-- lookup parent from repository -->\n	</parent>\n	<groupId>it.reply.sipp</groupId>\n	<artifactId>sipp</artifactId>\n	<version>0.0.1-SNAPSHOT</version>\n	<packaging>war</packaging>\n	<name>sipp</name>\n	<description>Sipp project</description>\n	<properties>\n		<java.version>11</java.version>\n	</properties>\n	<dependencies>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jdbc</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-data-jpa</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-security</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-web</artifactId>\n		</dependency>\n\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-devtools</artifactId>\n			<scope>runtime</scope>\n			<optional>true</optional>\n		</dependency>\n		<dependency>\n			<groupId>mysql</groupId>\n			<artifactId>mysql-connector-java</artifactId>\n			<scope>runtime</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-tomcat</artifactId>\n			<scope>provided</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.security</groupId>\n			<artifactId>spring-security-test</artifactId>\n			<scope>test</scope>\n		</dependency>\n		<dependency>\n			<groupId>com.auth0</groupId>\n			<artifactId>java-jwt</artifactId>\n			<version>3.16.0</version>\n		</dependency>\n		<dependency>\n			<groupId>org.springframework.boot</groupId>\n			<artifactId>spring-boot-starter-validation</artifactId>\n		</dependency>\n		<dependency>\n			<groupId>org.apache.commons</groupId>\n			<artifactId>commons-lang3</artifactId>\n		</dependency>\n	</dependencies>\n\n	<build>\n		<plugins>\n			<plugin>\n				<groupId>org.springframework.boot</groupId>\n				<artifactId>spring-boot-maven-plugin</artifactId>\n			</plugin>\n		</plugins>\n	</build>\n\n</project>\n'),
(12,	1,	'TEMPLATE',	1,	'README.md',	'test',	'test',	'2021-08-10 17:22:11',	'2021-08-10 17:22:11',	'text/markdown',	'# Getting Started with Create React App\r\n\r\nThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\r\n\r\n## Available Scripts\r\n\r\nIn the project directory, you can run:\r\n\r\n### `yarn start`\r\n\r\nRuns the app in the development mode.\\\r\nOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.\r\n\r\nThe page will reload if you make edits.\\\r\nYou will also see any lint errors in the console.\r\n\r\n### `yarn test`\r\n\r\nLaunches the test runner in the interactive watch mode.\\\r\nSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.\r\n\r\n### `yarn build`\r\n\r\nBuilds the app for production to the `build` folder.\\\r\nIt correctly bundles React in production mode and optimizes the build for the best performance.\r\n\r\nThe build is minified and the filenames include the hashes.\\\r\nYour app is ready to be deployed!\r\n\r\nSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.\r\n\r\n### `yarn eject`\r\n\r\n**Note: this is a one-way operation. Once you `eject`, you can’t go back!**\r\n\r\nIf you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.\r\n\r\nInstead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.\r\n\r\nYou don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.\r\n\r\n## Learn More\r\n\r\nYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).\r\n\r\nTo learn React, check out the [React documentation](https://reactjs.org/).\r\n\r\n### Code Splitting\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)\r\n\r\n### Analyzing the Bundle Size\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)\r\n\r\n### Making a Progressive Web App\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)\r\n\r\n### Advanced Configuration\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)\r\n\r\n### Deployment\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)\r\n\r\n### `yarn build` fails to minify\r\n\r\nThis section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)\r\n'),
(13,	1,	'TEMPLATE',	1,	'pom.xml',	'test',	'test',	'2021-08-10 17:23:48',	'2021-08-10 17:23:48',	'application/xml',	'<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\r\n  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n  xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\r\n  <modelVersion>4.0.0</modelVersion>\r\n  <parent>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-parent</artifactId>\r\n    <version>2.5.0</version>\r\n    <relativePath /> <!-- lookup parent from repository -->\r\n  </parent>\r\n  <groupId>it.reply.sipp</groupId>\r\n  <artifactId>sipp</artifactId>\r\n  <version>0.0.1-SNAPSHOT</version>\r\n  <packaging>war</packaging>\r\n  <name>sipp</name>\r\n  <description>Sipp project</description>\r\n  <properties>\r\n    <java.version>11</java.version>\r\n  </properties>\r\n\r\n  <dependencies>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-data-jdbc</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-data-jpa</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-security</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-web</artifactId>\r\n    </dependency>\r\n\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-devtools</artifactId>\r\n      <scope>runtime</scope>\r\n      <optional>true</optional>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>mysql</groupId>\r\n      <artifactId>mysql-connector-java</artifactId>\r\n      <scope>runtime</scope>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-tomcat</artifactId>\r\n      <scope>provided</scope>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-test</artifactId>\r\n      <scope>test</scope>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.security</groupId>\r\n      <artifactId>spring-security-test</artifactId>\r\n      <scope>test</scope>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>com.auth0</groupId>\r\n      <artifactId>java-jwt</artifactId>\r\n      <version>3.16.0</version>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.springframework.boot</groupId>\r\n      <artifactId>spring-boot-starter-validation</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.apache.commons</groupId>\r\n      <artifactId>commons-lang3</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.modeshape</groupId>\r\n      <artifactId>modeshape-jcr</artifactId>\r\n    </dependency>\r\n    <dependency>\r\n      <groupId>org.modeshape</groupId>\r\n      <artifactId>modeshape-jcr-api</artifactId>\r\n    </dependency>\r\n  </dependencies>\r\n\r\n  <build>\r\n    <plugins>\r\n      <plugin>\r\n        <groupId>org.springframework.boot</groupId>\r\n        <artifactId>spring-boot-maven-plugin</artifactId>\r\n      </plugin>\r\n      <plugin>\r\n        <artifactId>maven-assembly-plugin</artifactId>\r\n        <!-- <version>3.3.0</version>  -->\r\n        <configuration>\r\n          <descriptors>\r\n            <descriptor>src/assembly/distribution.xml</descriptor>\r\n          </descriptors>\r\n        </configuration>\r\n        <executions>\r\n          <execution>\r\n            <id>dist-assembly</id>\r\n            <phase>package</phase>\r\n            <goals>\r\n              <goal>single</goal>\r\n            </goals>\r\n          </execution>\r\n        </executions>\r\n      </plugin>\r\n      <!-- \r\n      <plugin>\r\n        <groupId>org.apache.maven.plugins</groupId>\r\n        <artifactId>maven-surfire-plugin</artifactId>\r\n        <version>3.0.0-M5</version>\r\n        <configuration>\r\n          <argLine>-Dspring.profiles.active=test</argLine>\r\n        </configuration>\r\n      </plugin>\r\n       -->\r\n    </plugins>\r\n  </build>\r\n  <scm>\r\n    <url>https://10.21.125.71/git/sipp.git</url>\r\n  </scm>\r\n  <dependencyManagement>\r\n    <dependencies>\r\n      <dependency>\r\n        <groupId>org.modeshape.bom</groupId>\r\n        <artifactId>modeshape-bom-embedded</artifactId>\r\n        <version>5.4.1.Final</version>\r\n        <type>pom</type>\r\n        <scope>import</scope>\r\n      </dependency>\r\n    </dependencies>\r\n  </dependencyManagement>\r\n</project>\r\n');

INSERT INTO `TEMPLATE_FILE` (`ID`, `TEMPLATE_ID`, `FILE_SYSTEM_ID`, `CATEGORY`, `ORDERING`) VALUES
(4,	1,	1,	'CHIAMATO',	1),
(6,	1,	2,	'CHIAMANTE',	3),
(5,	1,	3,	'CHIAMANTE',	2),
(1,	1,	4,	'CHIAMANTE',	1);
