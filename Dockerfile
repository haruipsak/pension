# JDK 21 slim 베이스 이미지를 사용 (JDK 21 환경)
FROM openjdk:21-slim

# 작업 디렉터리 설정 (예: /app)
WORKDIR /app

# Maven 빌드 후 생성된 JAR 파일을 컨테이너의 /app 디렉터리로 복사 (파일명은 실제 빌드 산출물에 맞게 수정)
COPY target/pension-0.0.1-SNAPSHOTp.jar app.jar

# 기본 8080 포트 개방
EXPOSE 8080

# Render에서 제공하는 PORT 환경변수를 사용하여 실행 (JAVA_OPTS 전달)
CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
