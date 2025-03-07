<!-- Not finished -->

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    session.invalidate();
    response.sendRedirect("loginPhotographer.jsp");
%>
<html>
<head>
    <meta charset="UTF-8">
    <title>Logout</title>
	<link rel="stylesheet" href="style.css">   
</head>
<body>
    <p>Logging out as a Photographer...</p>
</body>
</html>