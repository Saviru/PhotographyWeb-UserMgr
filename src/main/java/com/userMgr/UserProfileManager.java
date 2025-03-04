package com.userMgr;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;

public class UserProfileManager {
    private static final String FILE_PATH = "C:\\Users\\savir\\Documents\\Java projects\\photoWeb\\src\\main\\webapp\\WEB-INF\\users.txt";
    
    /**
     * Updates a user's profile in the users.txt file using bubble search algorithm and queue
     * 
     * @param originalUsername the original username to identify the user
     * @param originalEmail the original email to identify the user (as backup)
     * @param updatedUser the updated user information
     * @return true if update was successful, false otherwise
     */
    public boolean updateUserProfile(String originalUsername, String originalEmail, User updatedUser) {
        Queue<String> userRecords = new LinkedList<>();
        boolean userFound = false;
        
        try {
            // Read all user records into a queue
            try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    userRecords.add(line);
                }
            }
            
            // Convert queue to array for bubble search
            String[] userArray = userRecords.toArray(new String[0]);
            int userIndex = bubbleSearchUserIndex(userArray, originalUsername, originalEmail);
            
            if (userIndex != -1) {
                // User found, update the record
                userArray[userIndex] = updatedUser.toString();
                userFound = true;
                
                // Write the updated records back to the file
                try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH))) {
                    for (String record : userArray) {
                        writer.write(record);
                        writer.newLine();
                    }
                }
            }
            
            return userFound;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * Implements bubble search algorithm to find the index of a user in the array
     * 
     * @param userArray array of user record strings
     * @param username the username to search for
     * @param email the email to search for (as backup)
     * @return the index of the user in the array, or -1 if not found
     */
    private int bubbleSearchUserIndex(String[] userArray, String username, String email) {
        for (int i = 0; i < userArray.length - 1; i++) {
            for (int j = 0; j < userArray.length - i - 1; j++) {
                // Check if current record matches
                if (isUserRecord(userArray[j], username, email)) {
                    return j;
                }
                
                // Check if next record matches
                if (isUserRecord(userArray[j + 1], username, email)) {
                    return j + 1;
                }
            }
        }
        
        // Special case: check the last element if only one element in array
        if (userArray.length > 0 && isUserRecord(userArray[userArray.length - 1], username, email)) {
            return userArray.length - 1;
        }
        
        return -1; // User not found
    }
    
    /**
     * Checks if a user record matches the given username or email
     * 
     * @param record the user record string
     * @param username the username to match
     * @param email the email to match
     * @return true if the record matches the username or email, false otherwise
     */
    private boolean isUserRecord(String record, String username, String email) {
        String[] parts = record.split(", ");
        if (parts.length >= 3) {
            String recordUsername = parts[0];
            String recordEmail = parts[2];
            
            return recordUsername.equals(username) || recordEmail.equals(email);
        }
        return false;
    }
}