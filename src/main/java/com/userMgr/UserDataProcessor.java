package com.userMgr;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;

public class UserDataProcessor {
    private static final String FILE_PATH = "C:\\Users\\savir\\Documents\\Java projects\\photoWeb\\src\\main\\webapp\\WEB-INF\\users.txt";
    
    /**
     * Authenticates a user using bubble search algorithm on a queue of users
     * @param userIdentifier username or email
     * @param password user's password
     * @return User object if authenticated, null otherwise
     */
    public User authenticateUser(String userIdentifier, String password) {
        Queue<User> userQueue = loadUsersIntoQueue();
        return bubbleSearchUser(userQueue, userIdentifier, password);
    }
    
    /**
     * Loads all users from users.txt into a queue
     * @return Queue of User objects
     */
    private Queue<User> loadUsersIntoQueue() {
        Queue<User> queue = new LinkedList<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(", ");
                if (parts.length >= 6) {
                    String username = parts[0];
                    String pwd = parts[1];
                    String email = parts[2];
                    String gender = parts[3];
                    String address = parts[4];
                    String phone = parts[5];
                    
                    User user = new User(username, pwd, email, gender, address, phone);
                    queue.add(user);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return queue;
    }
    
    /**
     * Implements bubble search algorithm on a queue of users
     * Bubble search: We compare adjacent elements (in this case, we're using it to search through the queue)
     * @param userQueue queue of users
     * @param userIdentifier username or email
     * @param password user's password
     * @return User object if found and authenticated, null otherwise
     */
    private User bubbleSearchUser(Queue<User> userQueue, String userIdentifier, String password) {
        int size = userQueue.size();
        User[] users = new User[size];
        
        // Convert queue to array for bubble search
        for (int i = 0; i < size; i++) {
            users[i] = userQueue.remove();
        }
        
        // Bubble search algorithm
        for (int i = 0; i < size - 1; i++) {
            for (int j = 0; j < size - i - 1; j++) {
                // Check current position
                if (isMatchingUser(users[j], userIdentifier, password)) {
                    return users[j];
                }
                
                // Check next position
                if (isMatchingUser(users[j+1], userIdentifier, password)) {
                    return users[j+1];
                }
            }
        }
        
        return null; // User not found or credentials don't match
    }
    
    /**
     * Checks if a user matches the provided credentials
     * @param user User object
     * @param userIdentifier username or email
     * @param password user's password
     * @return true if matching, false otherwise
     */
    private boolean isMatchingUser(User user, String userIdentifier, String password) {
        return (user.getUsername().equals(userIdentifier) || 
                user.getEmail().equals(userIdentifier)) && 
               user.getPassword().equals(password);
    }
}