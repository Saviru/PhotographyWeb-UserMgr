package com.photographerMgr.servlets;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.photographerMgr.models.Photographer;

@WebServlet(urlPatterns = {"/view"})
public class ImageViewServlet extends HttpServlet {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Base directory - we'll append the username dynamically
    private static final String BASE_UPLOAD_DIRECTORY = "C:\\Users\\savir\\Documents\\Java projects\\photoWeb\\src\\main\\webapp\\WEB-INF\\uploads\\photographerSamples\\";
    
    // Method to get user-specific upload directory
    private String getUserUploadDirectory(HttpServletRequest request) {
        // Get the session and photographer object
        HttpSession session = request.getSession();
        Photographer photographer = (Photographer)session.getAttribute("photographer");
        
        // Create user-specific directory path
        String username = "default"; // Default fallback
        
        if (photographer != null && photographer.getUsername() != null) {
            username = photographer.getUsername();
        }
        
        // Create the path with the username
        return BASE_UPLOAD_DIRECTORY + username + "\\";
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String fileName = request.getParameter("file");
        
        if (fileName == null || fileName.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "File name is required");
            return;
        }
        
        // Security check - prevent directory traversal
        if (fileName.contains("..") || fileName.contains("/") || fileName.contains("\\")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid file name");
            return;
        }
        
        // Get user-specific upload directory
        String uploadDirectory = getUserUploadDirectory(request);
        String filePath = uploadDirectory + fileName;
        
        File file = new File(filePath);
        
        if (!file.exists() || !file.isFile()) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
            return;
        }
        
        // Set the content type based on the file extension
        String contentType = getServletContext().getMimeType(fileName);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        
        response.setContentType(contentType);
        response.setContentLength((int) file.length());
        
        // Set cache control headers
        response.setHeader("Cache-Control", "public, max-age=86400"); // Cache for a day
        
        // Stream the file to the client
        try (FileInputStream in = new FileInputStream(filePath);
             OutputStream out = response.getOutputStream()) {
            
            byte[] buffer = new byte[4096];
            int bytesRead;
            
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }
}