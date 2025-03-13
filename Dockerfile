FROM tomcat:9-jdk17

# Remove default webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the necessary directories
COPY ./src/main/webapp/WEB-INF/lib/ /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/
COPY ./target/classes/ /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/
COPY ./src/main/webapp/ /usr/local/tomcat/webapps/ROOT/

EXPOSE 8080
