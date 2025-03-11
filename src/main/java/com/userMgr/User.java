package com.userMgr;

public class User {
    private String username;
    private String password;
    private String email;
    private String gender;
    private String address;
    private String phone;
    
    public User() {
		this.username = "Null";
		this.password = "Null";
		this.email = "Null";
		this.gender = "Hidden";
		this.address = "Null";
		this.phone = "Null";
    }

    public User(String username, String password, String email, String gender, String address, String phone) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.gender = gender;
        setAddress(address); // Using setter to validate/transform address
        this.phone = phone;
    }
    
    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    /**
     * Sets the address after validating and replacing commas with @;%
     * @param address the address to set
     */
    public void setAddress(String address) {
        if (address != null) {
            // Replace all commas with "@;%"
            this.address = address.replace(",", "@;%");
        } else {
            this.address = "";
        }
    }
    
    /**
     * Returns the original address with commas restored
     * @return address with original commas
     */
    public String getOriginalAddress() {
        if (address != null) {
            return address.replace("@;%", ",");
        }
        return "";
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return username + ", " + password + ", " + email + ", " + gender + ", " + address + ", " + phone;
    }
}
