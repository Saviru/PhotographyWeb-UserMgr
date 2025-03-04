<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.userMgr.User" %>	
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Welcome to your Dashboard</h2>
    
    <% User user = (User)session.getAttribute("user"); %>
    <% if (user != null) { %>
        <h3>User Information</h3>
        <p>Username: <%= user.getUsername() %></p>
        <p>Email: <%= user.getEmail() %></p>
        <p>Gender: <%= user.getGender() %></p>
        <p>Address: <%= user.getOriginalAddress() %></p>
        <p>Phone: <%= user.getPhone() %></p>
        
        <p>Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-03-03 15:15:35</p>
        <p>Current User's Login: Saviru</p>
        
        <% 
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date loginTime = (java.util.Date)session.getAttribute("loginTime");
        %>
        <p>Login Time: <%= sdf.format(loginTime) %></p>
        
        <div style="margin-top: 20px;">
            <a href="profile.jsp" class="button">Profile</a>
            <a href="logout.jsp" class="button">Logout</a>
        </div>
    <% } else { %>
        <p>No user found in session. Please <a class="refLink"  href="login.jsp">login</a>.</p>
    <% } %>
</body>
</html>