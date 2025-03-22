package com.userMgr;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class DeleteServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("user");
        
        if (currentUser == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        String username = request.getParameter("username");
        
        // Validate that the username from the form matches the logged-in user
        if (!currentUser.getUsername().equals(username)) {
            request.setAttribute("errorMessage", "Invalid user verification");
            request.getRequestDispatcher("deleteConfirm.jsp").forward(request, response);
            return;
        }
        
        // Delete the user profile
        UserDeletionManager deletionManager = new UserDeletionManager();
        boolean success = deletionManager.deleteUserProfile(username);
        
        if (success) {
            // Invalidate session and redirect to a confirmation page
            session.invalidate();
            response.sendRedirect("deletionSuccess.jsp");
        } else {
            // Redirect to error page
            request.setAttribute("errorMessage", "Failed to delete user profile");
            request.getRequestDispatcher("deleteConfirm.jsp").forward(request, response);
        }
    }
}