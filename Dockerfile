FROM tomcat:9-jdk17

# Remove default webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the necessary directories
COPY ./WebContent/WEB-INF/lib/ /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/
COPY ./build/classes/ /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/
COPY ./WebContent/ /usr/local/tomcat/webapps/ROOT/

EXPOSE 8080
