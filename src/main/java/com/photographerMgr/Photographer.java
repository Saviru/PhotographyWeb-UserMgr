package com.photographerMgr;

public class Photographer {
    private String pgUsername;
    private String pgPassword;
    private String pgEmail;
    private String pgGender;
    private String pgAddress;
    private String pgPhone;
    private String skills;

    public Photographer(String pgUsername, String pgPassword, String pgEmail, String pgGender, String pgAddress, String pgPhone, String skills) {
        this.pgUsername = pgUsername;
        this.pgPassword = pgPassword;
        this.pgEmail = pgEmail;
        this.pgGender = pgGender;
        setAddress(pgAddress); // Using setter to validate/transform address
        this.pgPhone = pgPhone;
        this.skills = skills;
    }
    
    // Getters and setters
    public String getUsername() {
        return pgUsername;
    }

    public void setUsername(String pgUsername) {
        this.pgUsername = pgUsername;
    }

    public String getPassword() {
        return pgPassword;
    }

    public void setPassword(String pgPassword) {
        this.pgPassword = pgPassword;
    }

    public String getEmail() {
        return pgEmail;
    }

    public void setEmail(String pgEmail) {
        this.pgEmail = pgEmail;
    }

    public String getGender() {
        return pgGender;
    }

    public void setGender(String pgGender) {
        this.pgGender = pgGender;
    }

    public String getAddress() {
        return pgAddress;
    }

    /**
     * Sets the address after validating and replacing commas with @;%
     * @param address the address to set
     */
    public void setAddress(String pgAddress) {
        if (pgAddress != null) {
            // Replace all commas with "@;%"
            this.pgAddress = pgAddress.replace(",", "@;%");
        } else {
            this.pgAddress = "";
        }
    }
    
    /**
     * Returns the original address with commas restored
     * @return address with original commas
     */
    public String getOriginalAddress() {
        if (pgAddress != null) {
            return pgAddress.replace("@;%", ",");
        }
        return "";
    }

    public String getPhone() {
        return pgPhone;
    }

    public void setPhone(String pgPhone) {
        this.pgPhone = pgPhone;
    }
    
    public String getSkills() {
		return skills;
	}
    
    public String getOriginalSkills() {
		if (skills != null) {
			return skills.replace("@;%", ",");
		}
		return "";
	}
    
    public void setSkills(String skills) {
    	if (skills != null) {
    		this.skills = skills.replace(",", "@;%");
    	} else {
			this.skills = "";
		}
    	
    }

    @Override
    public String toString() {
        return pgUsername + ", " + pgPassword + ", " + pgEmail + ", " + pgGender + ", " + pgAddress + ", " + pgPhone;
    }
}
