# 1단계: Maven 빌드
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

# 2단계: 실행용 이미지
FROM openjdk:21-slim
WORKDIR /app
COPY --from=builder /build/target/pension-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
CMD ["sh", "-c", "java -Dserver.port=${PORT:-8082} -jar app.jar"]
