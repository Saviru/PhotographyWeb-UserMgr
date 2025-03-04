package com.userMgr;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("user");
        
        if (currentUser == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        String originalUsername = request.getParameter("originalUsername");
        String originalEmail = request.getParameter("originalEmail");
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String gender = request.getParameter("gender");
        String address = request.getParameter("address");
        String phone = request.getParameter("phone");
        
        User updatedUser = new User(username, password, email, gender, address, phone);
        
        UserProfileManager profileManager = new UserProfileManager();
        boolean success = profileManager.updateUserProfile(originalUsername, originalEmail, updatedUser);
        
        if (success) {
            // Update the session with the new user data
            session.setAttribute("user", updatedUser);
            request.setAttribute("message", "Profile updated successfully!");
        } else {
            request.setAttribute("error", "Failed to update profile. Please try again.");
        }
        
        request.getRequestDispatcher("profile.jsp").forward(request, response);
    }
}