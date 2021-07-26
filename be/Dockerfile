FROM maven:3.8-openjdk-11 AS MAVEN_TOOL_CHAIN
COPY sipp/pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY sipp/src /tmp/src/
WORKDIR /tmp
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests


FROM openjdk:11-jre-slim
EXPOSE 9081
RUN mkdir /app
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/*.war /app/genesys-be.jar

ENTRYPOINT ["java","-jar","/app/genesys-be.jar","--spring.profiles.active=docker"]


HEALTHCHECK --interval=1m --timeout=3s CMD wget -q -T 3 -s http://localhost:9081/actuator/health/ || exit 1
