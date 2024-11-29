FROM 615299753054.dkr.ecr.ap-northeast-2.amazonaws.com/alpine_openjdk:17.0.8

ADD /build/libs/sumits.auth.jwt.api*.jar /sumits.auth.jwt.api.jar

ENTRYPOINT ["java", "-jar", "/sumits.auth.jwt.api.jar"]

EXPOSE 8080

