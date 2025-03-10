<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Profile Deleted</title>
    <style>
        .container {
            width: 400px;
            margin: 50px auto;
            text-align: center;
        }
        .message {
            color: green;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px;
            border: none;
            cursor: pointer;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Profile Deleted Successfully</h2>
        <p class="message">Your profile has been permanently deleted from our system.</p>
        <p>Thank you for using our service.</p>
        <a href="index.jsp" class="button">Register New Account</a>
        <a href="login.jsp" class="button">Login</a>
    </div>
</body>
</html>