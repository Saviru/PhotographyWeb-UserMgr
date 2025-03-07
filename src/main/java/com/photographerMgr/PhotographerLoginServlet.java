package com.photographerMgr;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class PhotographerLoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pgIdentifier = request.getParameter("pgIdentifier");
        String password = request.getParameter("password");
        
        PhotographerDataProcessor processor = new PhotographerDataProcessor();
        Photographer photographer = processor.authenticateUser(pgIdentifier, password);
        
        if (photographer != null) {
            // Successful login
            HttpSession session = request.getSession();
            session.setAttribute("user", photographer);
            session.setAttribute("loginTime", new java.util.Date());
            
            response.sendRedirect("dashboard.jsp");
        } else {
            // Failed login
            request.setAttribute("error", "Invalid username/email or password");
            request.getRequestDispatcher("loginPhotographer.jsp").forward(request, response);
        }
    }
}