// Add console log to verify script loading
console.log("Customer dashboard script loading...");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");
    // Initialize data objects for favorites and bookings
    const favorites = [
        {
            id: 1,
            name: "Jane Doe",
            specialty: "Portrait Photography",
            image: "https://picsum.photos/id/1005/300/300",
            rating: 4.8
        },
        {
            id: 2,
            name: "David Williams",
            specialty: "Wedding Photography",
            image: "https://picsum.photos/id/1012/300/300",
            rating: 4.9
        },
        {
            id: 3,
            name: "Emma Johnson",
            specialty: "Family Photography",
            image: "https://picsum.photos/id/1027/300/300",
            rating: 4.7
        }
    ];
    
    const bookings = [
        {
            id: 101,
            photographerId: 1,
            photographerName: "Jane Doe",
            date: "2023-12-15",
            time: "10:00 AM",
            location: "Central Park",
            status: "Confirmed",
            type: "Portrait Session"
        },
        {
            id: 102,
            photographerId: 3,
            photographerName: "Emma Johnson",
            date: "2024-01-10",
            time: "2:00 PM",
            location: "Client's Home",
            status: "Pending",
            type: "Family Photoshoot"
        }
    ];
    
    // Create customerData object from form values
    const customerData = {
        get name() { return document.getElementById("customer-name-input").value; },
        get email() { return document.getElementById("customer-email-input").value; },
        get gender() { 
            return document.querySelector('input[name="gender"]:checked')?.value || 
                   document.getElementById("gender-display").textContent.toLowerCase(); 
        },
        get phone() { return document.getElementById("phone-input").value; },
        get address() { return document.getElementById("address-input").value; },
        get preferences() { return document.getElementById("customer-preferences-input").value; },
        favorites: favorites,
        bookings: bookings
    };
    
    // Make customerData accessible globally
    window.customerData = customerData;

    // Load customer profile data from HTML values
    loadProfileData();
    loadFavoritesGallery(customerData.favorites);
    loadBookings(customerData.bookings);

    // Edit profile functionality
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const profileForm = document.getElementById("profile-form");

    if (editProfileBtn) {
        editProfileBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Edit profile button clicked");
            toggleEditMode(true);
        };
    }

    if (cancelEditBtn) {
        cancelEditBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Cancel edit button clicked");
            toggleEditMode(false);
            loadProfileData(); // Reset form fields
        };
    }

    if (profileForm) {
        profileForm.onsubmit = function(e) {
            e.preventDefault();
            console.log("Form submitted");
            
            // In a real application, save the updated data to the backend
            // Update the displayed name in the welcome message
            document.getElementById("customer-name").textContent = customerData.name;
            
            toggleEditMode(false);
            
            // Show success message
            showNotification("Profile updated successfully!");
        };
    }

    // Delete profile functionality
    const deleteProfileBtn = document.getElementById("delete-profile-btn");
    const deleteConfirmationModal = document.getElementById("delete-confirmation-modal");
    const cancelModalBtn = document.querySelector(".cancel-modal-btn");
    const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");
    
    // Show delete confirmation modal
    if (deleteProfileBtn) {
        deleteProfileBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Delete profile button clicked");
            deleteConfirmationModal.classList.add("active");
            
            // Add slight shake animation to alert user of serious action
            document.querySelector(".modal-content").classList.add("shake");
            setTimeout(() => {
                document.querySelector(".modal-content").classList.remove("shake");
            }, 500);
        };
    }
    
    // Hide modal when cancel is clicked
    if (cancelModalBtn) {
        cancelModalBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Cancel delete button clicked");
            deleteConfirmationModal.classList.remove("active");
        };
    }
    
    // Handle delete confirmation
    if (confirmDeleteBtn) {
        confirmDeleteBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Confirm delete button clicked");
            // Show loading state
            this.classList.add("loading");
            this.textContent = "";
            
            // Simulate API call with delay
            setTimeout(() => {
                // In a real application, this would make an API call to delete the profile
                
                // Show success message
                deleteConfirmationModal.classList.remove("active");
                showNotification("Profile deleted successfully. Redirecting...");
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = "../auth/customer-login.html";
                }, 2000);
            }, 1500);
        };
    }
    
    // Close modal when clicking outside of it
    deleteConfirmationModal.addEventListener("click", function(e) {
        if (e.target === this) {
            this.classList.remove("active");
        }
    });
    
    // Escape key to close modal
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && deleteConfirmationModal.classList.contains("active")) {
            deleteConfirmationModal.classList.remove("active");
        }
    });

    // Fix Logout button
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Logout button clicked");
            
            // Show confirmation or just log out directly
            if (confirm("Are you sure you want to log out?")) {
                showNotification("Logging out...");
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = "../auth/customer-login.html";
                }, 1500);
            }
        };
    }
    
    // Add Change Password functionality
    const changePasswordBtn = document.getElementById("change-password-btn");
    const passwordChangeForm = document.getElementById("password-change-form");
    const savePasswordBtn = document.getElementById("save-password-btn");
    const cancelPasswordBtn = document.getElementById("cancel-password-btn");
    const passwordDisplay = document.getElementById("password-display");
    
    if (changePasswordBtn) {
        changePasswordBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Change password button clicked");
            passwordChangeForm.classList.remove("hidden");
            changePasswordBtn.classList.add("hidden");
            passwordDisplay.classList.add("hidden");
        };
    }
    
    if (cancelPasswordBtn) {
        cancelPasswordBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Cancel password change clicked");
            passwordChangeForm.classList.add("hidden");
            changePasswordBtn.classList.remove("hidden");
            passwordDisplay.classList.remove("hidden");
            
            // Clear form fields
            document.getElementById("current-password").value = "";
            document.getElementById("new-password").value = "";
            document.getElementById("confirm-password").value = "";
        };
    }
    
    if (savePasswordBtn) {
        savePasswordBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Save password button clicked");
            
            const currentPassword = document.getElementById("current-password").value;
            const newPassword = document.getElementById("new-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            
            // Basic validation
            if (!currentPassword) {
                showNotification("Please enter your current password", "error");
                return;
            }
            
            if (!newPassword) {
                showNotification("Please enter a new password", "error");
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification("Passwords don't match", "error");
                return;
            }
            
            // Show loading state
            savePasswordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            savePasswordBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success
                passwordChangeForm.classList.add("hidden");
                changePasswordBtn.classList.remove("hidden");
                passwordDisplay.classList.remove("hidden");
                
                // Clear fields
                document.getElementById("current-password").value = "";
                document.getElementById("new-password").value = "";
                document.getElementById("confirm-password").value = "";
                
                // Reset button
                savePasswordBtn.innerHTML = 'Save Password';
                savePasswordBtn.disabled = false;
                
                showNotification("Password changed successfully!");
            }, 1500);
        };
    }
});

// Global handler functions for direct onclick attributes
function handleEditProfile(e) {
    e.preventDefault();
    console.log("Edit profile button clicked via inline handler");
    toggleEditMode(true);
}

function handleCancelEdit(e) {
    e.preventDefault();
    console.log("Cancel edit button clicked via inline handler");
    toggleEditMode(false);
    loadProfileData();
}

function handleSaveProfile(e) {
    e.preventDefault();
    console.log("Save profile button clicked via inline handler");
    document.getElementById("customer-name").textContent = 
        document.getElementById("customer-name-input").value;
    toggleEditMode(false);
    showNotification("Profile updated successfully!");
}

function handleDeleteProfile(e) {
    e.preventDefault();
    console.log("Delete profile button clicked via inline handler");
    const modal = document.getElementById("delete-confirmation-modal");
    modal.classList.add("active");
    
    document.querySelector(".modal-content").classList.add("shake");
    setTimeout(() => {
        document.querySelector(".modal-content").classList.remove("shake");
    }, 500);
}

function handleCancelDelete(e) {
    e.preventDefault();
    console.log("Cancel delete clicked via inline handler");
    document.getElementById("delete-confirmation-modal").classList.remove("active");
}

function handleConfirmDelete(e) {
    e.preventDefault();
    console.log("Confirm delete clicked via inline handler");
    const btn = e.currentTarget;
    btn.classList.add("loading");
    btn.textContent = "";
    
    setTimeout(() => {
        document.getElementById("delete-confirmation-modal").classList.remove("active");
        showNotification("Profile deleted successfully. Redirecting...");
        
        /*setTimeout(() => {
            window.location.href = "customer-login.jsp";
        }, 2000);*/
    }, 1500);
}


function handleChangePassword(e) {
    e.preventDefault();
    console.log("Change password clicked via inline handler");
    document.getElementById("password-change-form").classList.remove("hidden");
    document.getElementById("change-password-btn").classList.add("hidden");
    document.getElementById("password-display").classList.add("hidden");
}

function handleCancelPassword(e) {
    e.preventDefault();
    console.log("Cancel password change clicked via inline handler");
    document.getElementById("password-change-form").classList.add("hidden");
    document.getElementById("change-password-btn").classList.remove("hidden");
    document.getElementById("password-display").classList.remove("hidden");
    
    // Clear fields
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";
}

function handleSavePassword(e) {
    e.preventDefault();
    console.log("Save password clicked via inline handler");
    
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    // Basic validation
    if (!currentPassword) {
        showNotification("Please enter your current password", "error");
        return;
    }
    
    if (!newPassword) {
        showNotification("Please enter a new password", "error");
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification("Passwords don't match", "error");
        return;
    }
    
    // Show loading state
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success
        document.getElementById("password-change-form").classList.add("hidden");
        document.getElementById("change-password-btn").classList.remove("hidden");
        document.getElementById("password-display").classList.remove("hidden");
        
        // Clear fields
        document.getElementById("current-password").value = "";
        document.getElementById("new-password").value = "";
        document.getElementById("confirm-password").value = "";
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        showNotification("Password changed successfully!");
    }, 1500);
}

function loadProfileData() {
    // Set the welcome text from the input value
    /*document.getElementById("customer-name").textContent = 
        document.getElementById("customer-name-input").value;*/
    
    // Set gender display from selected radio button or default
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (selectedGender) {
        document.getElementById("gender-display").textContent = capitalizeFirstLetter(selectedGender.value);
    }
}

function loadFavoritesGallery(favorites) {
    const gallery = document.getElementById("favorites-gallery");
    gallery.innerHTML = "";
    
    if (favorites && favorites.length > 0) {
        favorites.forEach((photographer) => {
            const photographerCard = document.createElement("div");
            photographerCard.className = "photographer-card glass-card";
            
            // Create photographer card HTML with prominent profile picture
            photographerCard.innerHTML = `
                <div class="photographer-img">
                    <img src="${photographer.image}" alt="${photographer.name}">
                    <div class="favorite-badge active"><i class="fas fa-heart"></i></div>
                </div>
                <div class="photographer-info">
                    <h3>${photographer.name}</h3>
                    <p>${photographer.specialty}</p>
                    <div class="rating">
                        ${generateStarRating(photographer.rating)}
                        <span>${photographer.rating} (${Math.floor(Math.random() * 100) + 50} reviews)</span>
                    </div>
                    <button class="btn-animated view-details" data-id="${photographer.id}"><i class="fas fa-camera"></i> View Profile</button>
                </div>
            `;
            
            // Add event listener to view details button
            photographerCard.querySelector('.view-details').addEventListener('click', function() {
                // Here you would open the photographer details modal
                showNotification(`Viewing ${photographer.name}'s profile...`);
            });
            
            gallery.appendChild(photographerCard);
        });
    } else {
        // Create a visual empty state with icon
        const emptyState = document.createElement("div");
        emptyState.className = "portfolio-empty-state";
        
        // Add icon and message
        emptyState.innerHTML = `
            <i class="fas fa-heart"></i>
            <h4>No favorite photographers yet</h4>
            <p>Browse photographers and add them to your favorites</p>
        `;
        
        gallery.appendChild(emptyState);
    }
}

// Helper function to generate star ratings based on rating value
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

function loadBookings(bookings) {
    const bookingsList = document.getElementById("bookings-list");
    bookingsList.innerHTML = "";
    
    if (bookings && bookings.length > 0) {
        bookings.forEach(booking => {
            const bookingItem = document.createElement("div");
            bookingItem.className = `booking-item glass-card ${booking.status.toLowerCase()}`;
            
            // Format date to be more readable
            const bookingDate = new Date(booking.date);
            const formattedDate = bookingDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            bookingItem.innerHTML = `
                <div class="booking-header">
                    <h4>${booking.type}</h4>
                    <span class="booking-status">${booking.status}</span>
                </div>
                <div class="booking-details">
                    <p><i class="fas fa-user-circle"></i> ${booking.photographerName}</p>
                    <p><i class="fas fa-calendar"></i> ${formattedDate}</p>
                    <p><i class="fas fa-clock"></i> ${booking.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${booking.location}</p>
                </div>
                <div class="booking-actions">
                    <button class="btn-animated" title="View details"><i class="fas fa-eye"></i></button>
                    <button class="btn-animated" title="Reschedule"><i class="fas fa-calendar-alt"></i></button>
                    <button class="btn-animated" title="Cancel booking"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            bookingsList.appendChild(bookingItem);
        });
    } else {
        // Create a visual empty state with icon
        const emptyState = document.createElement("div");
        emptyState.className = "portfolio-empty-state";
        
        // Add icon and message
        emptyState.innerHTML = `
            <i class="fas fa-calendar-times"></i>
            <h4>No upcoming bookings</h4>
            <p>Book a photographer to see your appointments here</p>
        `;
        
        bookingsList.appendChild(emptyState);
    }
}

// Function to remove photographer from favorites
function removeFavorite(photographerId) {
    if (confirm('Are you sure you want to remove this photographer from your favorites?')) {
        // Get the global customer data reference
        const customerData = document.customerData || window.customerData;
        
        // Remove the photographer from favorites
        if (customerData && customerData.favorites) {
            customerData.favorites = customerData.favorites.filter(p => p.id !== photographerId);
            
            // Reload the favorites gallery with updated list
            loadFavoritesGallery(customerData.favorites);
            
            // Show success notification
            showNotification("Photographer removed from favorites");
        }
    }
}

function toggleEditMode(isEditable) {
    const inputs = document.querySelectorAll(".profile-field input:not([type='radio'])");
    const genderDisplay = document.getElementById("gender-display");
    const genderEdit = document.querySelector(".gender-edit");
    const formActions = document.querySelector(".form-actions");
    
    // Edit-only fields
    const editOnlyFields = document.querySelectorAll(".profile-field.edit-only");
    
    inputs.forEach(input => {
        input.disabled = !isEditable;
    });
    
    if (isEditable) {
        // Show gender editing controls
        genderDisplay.classList.add("hidden");
        genderEdit.classList.remove("hidden");
        formActions.classList.remove("hidden");
        
        // Show edit-only fields
        editOnlyFields.forEach(field => {
            field.style.display = "block";
        });
    } else {
        // Hide gender editing controls
        genderDisplay.classList.remove("hidden");
        genderEdit.classList.add("hidden");
        formActions.classList.add("hidden");
        
        // Hide edit-only fields
        editOnlyFields.forEach(field => {
            field.style.display = "none";
        });
    }
}

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    
    // Choose icon and background based on type
    let icon = "check-circle";
    let bgColor = "rgba(72, 187, 120, 0.9)"; // Success green
    
    if (type === "error") {
        icon = "exclamation-circle";
        bgColor = "rgba(220, 53, 69, 0.9)"; // Error red
    } else if (type === "warning") {
        icon = "exclamation-triangle";
        bgColor = "rgba(255, 193, 7, 0.9)"; // Warning yellow
    }
    
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: bgColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "5px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease"
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
