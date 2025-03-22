<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Sign Up</title>
    <link rel="stylesheet" href="assets/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="background"></div>
    <div class="container">
        <div class="content">
            <h2 class="logo"><i class="fas fa-key"></i>Brand</h2>
            <div class="text-sci">
                <h2>Join Us!<br><span>Create an Account</span></h2>
                <p>Become a member and enjoy exclusive benefits.</p>
                
                <!-- User Type Selection -->
                <div class="user-type-question">Sign up as a</div>
                <div class="user-type-selection">
                    <a href="customer-signup.html" class="user-type-link active">Customer</a>
                    <a href="photographer-signup.html" class="user-type-link">Photographer</a>
                </div>
                
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div class="logreg-box">
            <div class="form-container active">
                <div class="form-box">
                    <form action="UserServlet" method="post">
                        <h2>Sign Up</h2>
                        
                        <div class="input-box">
                            <input type="text" id="fullName name-input" name="fullName" required placeholder=" ">
                            <label id="name-label" for="fullName">Full Name</label>
                            <i class="icon fas fa-user"></i>
                        </div>
                        
                        <div class="input-box">
                            <input type="text" id="username username-input" name="username" required placeholder=" ">
                            <label id="username-label" for="username">Username</label>
                            <i class="icon fas fa-file-signature"></i>
                        </div>
                        
                        <div class="input-box">
                            <input type="text" id="email email-input" name="email" required placeholder=" ">
                            <label id="email-label" for="email">Email</label>
                            <i class="icon fas fa-envelope"></i>
                        </div>
                        
                        <div class="gender-selection">
                            <div class="gender-label-container">
                                <span class="gender-label">Gender</span>
                                <i class="icon fas fa-venus-mars"></i>
                            </div>
                            <div class="radio-group">
                                <label><input type="radio" id="gender" name="gender" value="male" required> Male</label>
                                <label><input type="radio" id="gender" name="gender" value="female" required> Female</label>
                                <label><input type="radio" id="gender" name="gender" value="other" required> Other</label>
                            </div>
                        </div>

                        <div class="input-box">
                            <input type="phone" id="phone phone-input" name="phone" required placeholder=" ">
                            <label id="phone-label" for="phone">Phone</label>
                            <i class="icon fas fa-phone"></i>
                        </div>

                        <div class="input-box">
                            <input type="address" id="address address-input" name="address" required placeholder=" ">
                            <label id="address-label" for="address">Address</label>
                            <i class="icon fas fa-house"></i>
                        </div>

                        <div class="input-box">
                            <input type="password" id="password password-input" name="password"  required placeholder=" ">
                            <label id="password-label" for="password" >Password</label>
                            <i class="icon fas fa-lock"></i>
                        </div>
                        
                        <div class="input-box">
                            <input type="password" id="confirm-password-input" required placeholder=" ">
                            <label id="confirm-password-label">Confirm Password</label>
                            <i class="icon fas fa-lock"></i>
                            <span id="password-error" style="color: red; font-size: 12px; display: none;">Passwords do not match</span>
                            
                        </div>
                       
                        
                        <div class="remember-forgot">
                            <label><input type="checkbox" required>I agree to the <a href="#">Terms & Conditions</a></label>
                        </div>
                        
                        <button type="submit" class="btn">Register</button>
                        
                        <div class="login-register">
                            <p>Already have an account? <a href="customer-login.jsp">Login</a></p>
                            
							<%
								String errorType = request.getParameter("type");
								String errorMessage = request.getParameter("message");
								if (errorType != null && errorMessage != null) {
							%>
    								<div style="color: red;">
        							<%= errorMessage %>
   									</div>
   									<script>
        							showAuthNotification("<%= errorMessage.replace("\"", "\\\"") %>", "error");
    								</script>
							<%
			                    }	
							%>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="assets/auth.js"></script>
</body>
</html>
