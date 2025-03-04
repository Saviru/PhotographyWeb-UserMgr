package com.userMgr;

import java.io.FileWriter;
import java.io.IOException;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String FILE_PATH = "C:\\Users\\savir\\Documents\\Java projects\\photoWeb\\src\\main\\webapp\\WEB-INF\\users.txt";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String email = request.getParameter("email");
            String gender = request.getParameter("gender");
            String address = request.getParameter("address");
            String phone = request.getParameter("phone");
            
            User user = new User(username, password, email, gender, address, phone);
            
            try (FileWriter writer = new FileWriter(FILE_PATH, true)) {
                writer.write(user.toString() + System.lineSeparator());
            }
            
            // Redirect to success page
            response.sendRedirect("success.jsp");
        } catch (Exception e) {
            // Forward to error page with error message
            request.setAttribute("errorMessage", "Registration failed: " + e.getMessage());
            request.getRequestDispatcher("signup.jsp").forward(request, response);
        }
    }
}
