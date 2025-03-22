package com.photographerMgr.servlets;

import java.io.FileWriter;
import java.io.IOException;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.photographerMgr.models.Photographer;
import com.photographerMgr.services.PhotographerValidator;

public class PhotographerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String FILE_PATH = "C:\\Users\\savir\\Documents\\Java projects\\photoWeb\\src\\main\\webapp\\WEB-INF\\photographers.txt";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String email = request.getParameter("email");
            String gender = request.getParameter("gender");
            String address = request.getParameter("address");
            String phone = request.getParameter("phone");
            String skills = request.getParameter("skills");
            String experience = request.getParameter("experience");
            
            // Create validator to check for duplicate values
            PhotographerValidator validator = new PhotographerValidator();
            
            // Check for duplicate username
            if (validator.isDuplicateUsername(username)) {
                request.setAttribute("errorMessage", "Username already exists! Please choose a different username.");
                request.getRequestDispatcher("signupPhotographer.jsp").forward(request, response);
                return;
            }
            
            // Check for duplicate email
            if (validator.isDuplicateEmail(email)) {
                request.setAttribute("errorMessage", "Email already exists! Please use a different email address.");
                request.getRequestDispatcher("signupPhotographer.jsp").forward(request, response);
                return;
            }
            
            // Check for duplicate phone number
            if (validator.isDuplicatePhone(phone)) {
                request.setAttribute("errorMessage", "Phone number already exists! Please use a different phone number.");
                request.getRequestDispatcher("signupPhotographer.jsp").forward(request, response);
                return;
            }
            
            // All validations passed, create user
            Photographer photographer = new Photographer(username, password, email, gender, address, phone, skills, experience);
            
            try (FileWriter writer = new FileWriter(FILE_PATH, true)) {
                writer.write(photographer.toString() + System.lineSeparator());
            }
            
            // Redirect to success page
            response.sendRedirect("successPhotographer.jsp");
        } catch (Exception e) {
            // Forward to error page with error message
            request.setAttribute("errorMessage", "Registration failed: " + e.getMessage());
            request.getRequestDispatcher("signupPhotographer.jsp").forward(request, response);
        }
    }
}
