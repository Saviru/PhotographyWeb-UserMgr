FROM tomcat:9-jdk11

# Remove default Tomcat apps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your web application
COPY ./WebContent/ /usr/local/tomcat/webapps/ROOT/
COPY ./build/classes/ /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/

# If you have library dependencies
COPY ./WebContent/WEB-INF/lib/ /usr/local/tomcat/webapps/ROOT/WEB-INF/lib/

EXPOSE 8080
CMD ["catalina.sh", "run"]
