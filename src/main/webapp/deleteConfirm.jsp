<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ page import="com.userMgr.User "%>
 
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirm Delete Profile</title>
    <style>
        .container {
            width: 400px;
            margin: 50px auto;
            text-align: center;
        }
        .warning {
            color: red;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .button-group {
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            margin: 0 10px;
            border: none;
            cursor: pointer;
        }
        .delete-button {
            background-color: #f44336;
            color: white;
        }
        .delete-button:hover {
            background-color: #d32f2f;
        }
        .cancel-button {
            background-color: #ccc;
            color: #333;
        }
        .cancel-button:hover {
            background-color: #bbb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Confirm Profile Deletion</h2>
        
        <% User user = (User)session.getAttribute("user"); %>
        <% if (user != null) { %>
            <p>You are about to delete your profile: <strong><%= user.getUsername() %></strong></p>
            <p class="warning">This action cannot be undone. All your data will be permanently removed.</p>
            
            <div class="button-group">
                <form action="DeleteServlet" method="post">
                    <input type="hidden" name="username" value="<%= user.getUsername() %>">
                    <input type="submit" value="Confirm Delete" class="button delete-button">
                    <a href="dashboard.jsp" class="button cancel-button">Cancel</a>
                </form>
            </div>
        <% } else { %>
            <p>No user found in session. Please <a href="login.jsp">login</a>.</p>
        <% } %>
    </div>
</body>
</html>