<!-- Not working  -->

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Photographer  Registration</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Photographer Registration Form</h2>
    <form action="UserServlet" method="post">
    
        <div class="inputs">
        	<input type="text" id="username" name="username" required>
        	<label for="username">Username:</label>
        </div>
        
        <div class="inputs">
        	<input type="password" id="password" name="password" required>
        	<label for="password">Password:</label>	
        </div>	
        
        <div class="inputs">
        	<input type="email" id="email" name="email" required>
        	<label for="email">Email:</label>	
        </div>
        
        <div class="inputs">
        	<input type="text" id="gender" name="gender" required>
        	<label for="gender">Gender:</label>
       </div>
       
       <div class="inputs">
        	<input type="text" id="address" name="address" required>
        	<label for="address">Address:</label>
        </div>	
        
        <div class="inputs">
        	<input type="text" id="phone" name="phone" required>	
        	<label for="phone">Phone Number:</label>
        </div>	

        
        <div class="inpBtn">
        	<input type="submit" value="Register">
        </div>
    </form>
    
    <p>Already have an photographer account? <a href="loginPhotographer.jsp">Login here</a></p>
    <br>
    <p>Are you a customer? <a href="signup.jsp">Signup here</a></p>
    <br>
    
    <% if (request.getAttribute("errorMessage") != null) { %>
        <p style="color: red;"><%= request.getAttribute("errorMessage") %></p>
    <% } %>
    
</body>
</html>