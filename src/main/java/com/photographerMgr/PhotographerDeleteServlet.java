package com.photographerMgr;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class PhotographerDeleteServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Photographer currentPhotographer = (Photographer) session.getAttribute("photographer");
        
        if (currentPhotographer == null) {
            response.sendRedirect("loginPhotographer.jsp");
            return;
        }
        
        String username = request.getParameter("username");
        
        // Validate that the username from the form matches the logged-in user
        if (!currentPhotographer.getUsername().equals(username)) {
            request.setAttribute("errorMessage", "Invalid user verification");
            request.getRequestDispatcher("deleteConfirmPhotographer.jsp").forward(request, response);
            return;
        }
        
        // Delete the user profile
        PhotographerDeletionManager deletionManager = new PhotographerDeletionManager();
        boolean success = deletionManager.deletePhotographerProfile(username);
        
        if (success) {
            // Invalidate session and redirect to a confirmation page
            session.invalidate();
            response.sendRedirect("deletionSuccess.jsp");
        } else {
            // Redirect to error page
            request.setAttribute("errorMessage", "Failed to delete user profile");
            request.getRequestDispatcher("deleteConfirmPhotographer.jsp").forward(request, response);
        }
    }
}