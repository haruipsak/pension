# JDK 21 slim 베이스 이미지를 사용 (JDK 21 환경)
FROM openjdk:21-slim

# 작업 디렉터리 설정
WORKDIR /pension

# Maven
COPY target/pension-0.0.1-SNAPSHOT.jar app.jar

# 포트
EXPOSE 8082

# Render에서 제공하는 PORT 환경변수를 사용하여 실행 (JAVA_OPTS 전달)
CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
