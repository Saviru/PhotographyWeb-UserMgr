<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photographer Dashboard</title>
    <link rel="stylesheet" href="assets/main.css">
    <link rel="stylesheet" href="assets/dashboards.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="background"></div>
    
    <div class="dashboard-container">
        <div class="sidebar glass-card">
            <h2 class="logo"><i class="fas fa-key"></i>Brand</h2>
            <ul class="nav-links">
                <li class="active"><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
                <li><a href="#"><i class="fas fa-calendar"></i> Bookings</a></li>
                <li><a href="#"><i class="fas fa-images"></i> Portfolio</a></li>
                <li><a href="#"><i class="fas fa-dollar-sign"></i> Earnings</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="#" class="logout-btn btn-animated"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
        
        <div class="main-content">
            <header class="glass-card">
                <h1>Welcome, <span id="photographer-name">Photographer</span>!</h1>
                <div class="user-info">
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="badge">3</span>
                    </div>
                    <div class="user-avatar">
                        <img src="../assets/default-avatar.png" alt="Profile Picture" id="profile-picture">
                    </div>
                </div>
            </header>
            
            <div class="content-section glass-card">
                <div class="profile-section">
                    <div class="profile-header">
                        <h2>My Profile</h2>
                        <button id="edit-profile-btn" class="btn-animated"><i class="fas fa-edit"></i> Edit Profile</button>
                    </div>
                    
                    <form id="profile-form">
                        <div class="profile-grid">
                            <div class="profile-field">
                                <label>Full Name</label>
                                <div class="input-box glass-input">
                                    <input type="text" id="photographer-name-input" value="Jane Doe" required disabled>
                                    <i class="icon fas fa-user"></i>
                                </div>
                            </div>
                            
                            <div class="profile-field">
                                <label>Email</label>
                                <div class="input-box glass-input">
                                    <input type="email" id="photographer-email-input" value="jane.doe@example.com" required disabled>
                                    <i class="icon fas fa-envelope"></i>
                                </div>
                            </div>
                            
                            <div class="profile-field">
                                <label>Gender</label>
                                <div class="gender-display glass-input" id="gender-display" data-gender="female">Female</div>
                                <div class="gender-edit hidden">
                                    <div class="radio-group">
                                        <label><input type="radio" name="gender" value="male"> Male</label>
                                        <label><input type="radio" name="gender" value="female"> Female</label>
                                        <label><input type="radio" name="gender" value="other"> Other</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="profile-field">
                                <label>Phone</label>
                                <div class="input-box glass-input">
                                    <input type="tel" id="phone-input" value="+1234567890" required disabled>
                                    <i class="icon fas fa-phone"></i>
                                </div>
                            </div>
                            
                            <div class="profile-field">
                                <label>Address</label>
                                <div class="input-box glass-input">
                                    <input type="text" id="address-input" value="123 Photography St, Artville" required disabled>
                                    <i class="icon fas fa-house"></i>
                                </div>
                            </div>
                            
                            <div class="profile-field">
                                <label>Photography Specialty</label>
                                <div class="input-box glass-input">
                                    <input type="text" id="photographer-specialty-input" value="Portrait Photography" required disabled>
                                    <i class="icon fas fa-camera"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-field edit-only" style="display: none;">
                                <label>New Password</label>
                                <div class="input-box glass-input">
                                    <input type="password" id="password secondary-address-input" minlength="6" name="password" value="aaaa" placeholder="Your Password" disabled>
                                    <i class="icon fas fa-building"></i>
                                </div>
                        </div>
                        
                        
                        <div class="portfolio-section">
                            <h3>Portfolio Samples</h3>
                            <div class="portfolio-gallery" id="portfolio-gallery">
                                <!-- Portfolio images will be displayed here -->
                            </div>
                            <div class="portfolio-upload hidden">
                                <div class="file-upload-wrapper">
                                    <input type="file" id="portfolio" name="portfolio" multiple accept="image/*" class="hidden-file-input">
                                    <button type="button" class="file-upload-btn btn-animated" onclick="document.getElementById('portfolio').click()">
                                        <i class="fas fa-upload"></i> Add New Photos
                                    </button>
                                    <span class="file-info">No files selected</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions hidden">
                            <button type="submit" class="btn btn-animated save-btn">Save Changes</button>
                            <button type="button" class="btn btn-animated cancel-btn" id="cancel-edit-btn">Cancel</button>
                        </div>
                    </form>
                    
                    <div class="delete-profile-container">
                        <button type="button" class="btn btn-animated delete-btn" id="delete-profile-btn"><i class="fas fa-trash-alt"></i> Delete Profile</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Confirmation Modal -->
    <div class="modal" id="delete-confirmation-modal">
        <div class="modal-content glass-card">
            <h3><i class="fas fa-exclamation-triangle"></i> Delete Profile</h3>
            <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
            <div class="modal-actions">
                <button class="btn btn-animated cancel-modal-btn">Cancel</button>
                <button class="btn btn-animated confirm-delete-btn">Yes, Delete My Profile</button>
            </div>
        </div>
    </div>
    
    <script src="assets/main.js"></script>
    <script src="assets/photographer-dashboard.js"></script>
    <script src="assets/customer-dashboard.js"></script>
</body>
</html>
