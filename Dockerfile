FROM tomcat:9-jdk17

# Remove default webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the necessary directories
#COPY ./src/main/webapp/WEB-INF/lib/ /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/
#COPY ./src/main/java/ /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/
#COPY ./src/main/webapp/ /usr/local/tomcat/webapps/ROOT/

COPY ./src/ /usr/local/tomcat/

EXPOSE 8080
