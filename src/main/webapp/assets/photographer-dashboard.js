document.addEventListener("DOMContentLoaded", function() {
    // Create a global object to store portfolio images
    window.photographerData = {
        portfolio: []
    };
    
    // Load photographer profile data from HTML attributes
    loadProfileData();
    loadPortfolioGallery(window.photographerData.portfolio);

    // Edit profile functionality
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const profileForm = document.getElementById("profile-form");

    editProfileBtn.addEventListener("click", function() {
        toggleEditMode(true);
    });

    cancelEditBtn.addEventListener("click", function() {
        toggleEditMode(false);
        loadProfileData(); // Reset form fields
    });

    profileForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // In a real application, save the updated data to the backend
        // For now, we'll just update our DOM and toggle edit mode off
        const nameInput = document.getElementById("photographer-name-input");
        const nameDisplay = document.getElementById("photographer-name");
        
        // Update the displayed name in the welcome message
        nameDisplay.textContent = nameInput.value;
        
        // Set data attributes for persistence
        nameInput.setAttribute('value', nameInput.value);
        document.getElementById("photographer-email-input").setAttribute('value', document.getElementById("photographer-email-input").value);
        document.getElementById("phone-input").setAttribute('value', document.getElementById("phone-input").value);
        document.getElementById("address-input").setAttribute('value', document.getElementById("address-input").value);
        document.getElementById("photographer-specialty-input").setAttribute('value', document.getElementById("photographer-specialty-input").value);
        
        // Get selected gender
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        if (selectedGender) {
            document.getElementById("gender-display").setAttribute('data-gender', selectedGender.value);
            document.getElementById("gender-display").textContent = capitalizeFirstLetter(selectedGender.value);
        }
        
        toggleEditMode(false);
        
        // Show success message
        alert("Profile updated successfully!");
    });

    // Portfolio file upload handling
    const portfolioInput = document.getElementById("portfolio");
    const fileInfo = document.querySelector(".file-info");
    
    portfolioInput.addEventListener("change", function() {
        if (this.files.length > 0) {
            fileInfo.textContent = `${this.files.length} file(s) selected`;
            
            // In a real app, you would upload these files to a server
            // For now, we'll just preview them
            const files = Array.from(this.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    window.photographerData.portfolio.push(e.target.result);
                    loadPortfolioGallery(window.photographerData.portfolio);
                };
                reader.readAsDataURL(file);
            });
        } else {
            fileInfo.textContent = "No files selected";
        }
    });

    // Delete profile functionality
    const deleteProfileBtn = document.getElementById("delete-profile-btn");
    const deleteConfirmationModal = document.getElementById("delete-confirmation-modal");
    const cancelModalBtn = document.querySelector(".cancel-modal-btn");
    const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");
    
    // Show delete confirmation modal
    deleteProfileBtn.addEventListener("click", function() {
        deleteConfirmationModal.classList.add("active");
        
        // Add slight shake animation to alert user of serious action
        document.querySelector(".modal-content").classList.add("shake");
        setTimeout(() => {
            document.querySelector(".modal-content").classList.remove("shake");
        }, 500);
    });
    
    // Hide modal when cancel is clicked
    cancelModalBtn.addEventListener("click", function() {
        deleteConfirmationModal.classList.remove("active");
    });
    
    // Handle delete confirmation
    confirmDeleteBtn.addEventListener("click", function() {
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
                window.location.href = "../auth/photographer-login.html";
            }, 2000);
        }, 1500);
    });
    
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
});

function loadProfileData() {
    // Get values from the HTML attributes
    const nameInput = document.getElementById("photographer-name-input");
    const emailInput = document.getElementById("photographer-email-input");
    const phoneInput = document.getElementById("phone-input");
    const addressInput = document.getElementById("address-input");
    const specialtyInput = document.getElementById("photographer-specialty-input");
    const genderDisplay = document.getElementById("gender-display");
    
    // Set values in the fields if they exist
    document.getElementById("photographer-name").textContent = nameInput.getAttribute('value') || '';
    nameInput.value = nameInput.getAttribute('value') || '';
    emailInput.value = emailInput.getAttribute('value') || '';
    phoneInput.value = phoneInput.getAttribute('value') || '';
    addressInput.value = addressInput.getAttribute('value') || '';
    specialtyInput.value = specialtyInput.getAttribute('value') || '';
    
    const gender = genderDisplay.getAttribute('data-gender') || '';
    genderDisplay.textContent = capitalizeFirstLetter(gender);
    
    // Set radio button based on gender
    if (gender) {
        const genderRadio = document.querySelector(`input[name="gender"][value="${gender}"]`);
        if (genderRadio) {
            genderRadio.checked = true;
        }
    }
}

function loadPortfolioGallery(images) {
    const gallery = document.getElementById("portfolio-gallery");
    gallery.innerHTML = "";
    
    if (images && images.length > 0) {
        images.forEach((src, index) => {
            const imgContainer = document.createElement("div");
            imgContainer.className = "portfolio-item";
            
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Portfolio Image";
            
            // Create image controls container
            const imgControls = document.createElement("div");
            imgControls.className = "img-controls";
            
            // Create download button
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "img-control-btn download-btn";
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.title = "Download image";
            downloadBtn.type = "button"; // Explicitly set type to button
            downloadBtn.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent default button behavior
                e.stopPropagation(); // Stop event from bubbling up
                downloadImage(src, `portfolio-image-${index}`);
                return false; // Additional prevention for older browsers
            });
            
            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.className = "img-control-btn remove-btn";
            removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            removeBtn.title = "Remove image";
            removeBtn.type = "button"; // Explicitly set type to button
            removeBtn.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent default button behavior
                e.stopPropagation(); // Stop event from bubbling up
                removePortfolioImage(index);
                return false; // Additional prevention for older browsers
            });
            
            // Add buttons to controls
            imgControls.appendChild(downloadBtn);
            imgControls.appendChild(removeBtn);
            
            // Add image and controls to container
            imgContainer.appendChild(img);
            imgContainer.appendChild(imgControls);
            gallery.appendChild(imgContainer);
            
            // Add lightbox functionality
            img.addEventListener("click", () => {
                createLightbox(src, images);
            });
        });
    } else {
        // Create a visual empty state with icon
        const emptyState = document.createElement("div");
        emptyState.className = "portfolio-empty-state";
        
        // Add icon and message
        emptyState.innerHTML = `
            <i class="fas fa-images"></i>
            <h4>No portfolio images yet</h4>
            <p>Upload some of your best work to showcase your photography skills</p>
        `;
        
        gallery.appendChild(emptyState);
    }
}

// Function to download portfolio image
function downloadImage(src, filename = 'portfolio-image') {
    try {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = src;
        link.download = filename;
        
        // Append to body, click and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download failed:", error);
        showNotification("Failed to download image");
    }
    
    // Prevent any form submission that might occur
    return false;
}

// Function to remove portfolio image
function removePortfolioImage(index) {
    if (confirm('Are you sure you want to remove this image from your portfolio?')) {
        // Remove the image from the array
        if (window.photographerData && window.photographerData.portfolio) {
            window.photographerData.portfolio.splice(index, 1);
            
            // Reload the gallery with updated portfolio
            loadPortfolioGallery(window.photographerData.portfolio);
            
            // Show success notification
            showNotification("Image removed from portfolio");
        }
    }
}

function toggleEditMode(isEditable) {
    const inputs = document.querySelectorAll(".profile-field input:not([type='radio'])");
    const genderDisplay = document.getElementById("gender-display");
    const genderEdit = document.querySelector(".gender-edit");
    const portfolioUpload = document.querySelector(".portfolio-upload");
    const formActions = document.querySelector(".form-actions");
    const imgControls = document.querySelectorAll(".img-controls");
    
    inputs.forEach(input => {
        input.disabled = !isEditable;
    });
    
    if (isEditable) {
        genderDisplay.classList.add("hidden");
        genderEdit.classList.remove("hidden");
        portfolioUpload.classList.remove("hidden");
        formActions.classList.remove("hidden");
        
        // Show image controls when in edit mode
        imgControls.forEach(control => {
            control.style.display = "flex";
        });
    } else {
        genderDisplay.classList.remove("hidden");
        genderEdit.classList.add("hidden");
        portfolioUpload.classList.add("hidden");
        formActions.classList.add("hidden");
        
        // Hide image controls when not in edit mode
        imgControls.forEach(control => {
            control.style.display = "none";
        });
    }
}

function updateWelcomeName(name) {
    const welcomeNameEl = document.getElementById("photographer-name");
    const currentText = welcomeNameEl.textContent;
    
    // Animate the name change
    welcomeNameEl.style.opacity = "0";
    welcomeNameEl.style.transform = "translateY(-10px)";
    welcomeNameEl.style.transition = "all 0.3s ease";
    
    setTimeout(() => {
        welcomeNameEl.textContent = name;
        welcomeNameEl.style.opacity = "1";
        welcomeNameEl.style.transform = "translateY(0)";
    }, 300);
}

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(72, 187, 120, 0.9)",
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

function createLightbox(imageSrc, allImages) {
    // Create lightbox container
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    
    // Style the lightbox
    Object.assign(lightbox.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "2000",
        opacity: "0",
        transition: "opacity 0.3s ease"
    });
    
    // Create image container
    const imgContainer = document.createElement("div");
    Object.assign(imgContainer.style, {
        position: "relative",
        maxWidth: "90%",
        maxHeight: "90%",
        overflow: "hidden"
    });
    
    // Create image element
    const img = document.createElement("img");
    img.src = imageSrc;
    Object.assign(img.style, {
        maxWidth: "100%",
        maxHeight: "90vh",
        objectFit: "contain",
        borderRadius: "5px",
        boxShadow: "0 5px 25px rgba(0, 0, 0, 0.5)",
        transform: "scale(0.95)",
        transition: "all 0.3s ease"
    });
    
    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    Object.assign(closeBtn.style, {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "rgba(255, 255, 255, 0.2)",
        color: "white",
        border: "none",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "1.2em",
        transition: "all 0.3s ease"
    });
    
    // Add navigation buttons if there are multiple images
    if (allImages && allImages.length > 1) {
        const currentIndex = allImages.indexOf(imageSrc);
        
        // Previous button
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        Object.assign(prevBtn.style, {
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.2em",
            transition: "all 0.3s ease"
        });
        
        // Next button
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        Object.assign(nextBtn.style, {
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.2em",
            transition: "all 0.3s ease"
        });
        
        // Navigation functionality
        prevBtn.addEventListener("click", () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = allImages.length - 1;
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = allImages[newIndex];
                img.style.opacity = "1";
            }, 300);
        });
        
        nextBtn.addEventListener("click", () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= allImages.length) newIndex = 0;
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = allImages[newIndex];
                img.style.opacity = "1";
            }, 300);
        });
        
        imgContainer.appendChild(prevBtn);
        imgContainer.appendChild(nextBtn);
    }
    
    // Add elements to DOM
    imgContainer.appendChild(img);
    imgContainer.appendChild(closeBtn);
    lightbox.appendChild(imgContainer);
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = "1";
        img.style.transform = "scale(1)";
    }, 10);
    
    // Close lightbox on click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
    });
    
    // Close button functionality
    closeBtn.addEventListener("click", () => {
        lightbox.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
}

function createBokehEffect() {
    const bokehContainer = document.createElement("div");
    bokehContainer.className = "bokeh-container";
    document.body.appendChild(bokehContainer);
    
    // Create bokeh lights
    const colors = [
        "rgba(255, 255, 255, 0.8)",
        "rgba(173, 216, 230, 0.8)",
        "rgba(255, 182, 193, 0.8)"
    ];
    
    // Create bokeh particles with different sizes
    for (let i = 0; i < 15; i++) {
        createBokehParticle(bokehContainer, 
            Math.random() * 150 + 50, // Size between 50-200px
            colors[Math.floor(Math.random() * colors.length)],
            i < 5 ? "realistic-large" : i < 10 ? "realistic-medium" : "realistic-small"
        );
    }
}

function createBokehParticle(container, size, color, className) {
    const bokeh = document.createElement("div");
    bokeh.className = `bokeh ${className}`;
    
    // Set bokeh style
    bokeh.style.width = `${size}px`;
    bokeh.style.height = `${size}px`;
    bokeh.style.background = `radial-gradient(circle at 40% 40%, 
                              ${color} 0%, 
                              rgba(255, 255, 255, 0.3) 40%, 
                              rgba(255, 255, 255, 0.1) 100%)`;
    
    // Random position
    bokeh.style.left = `${Math.random() * 100}%`;
    bokeh.style.top = `${Math.random() * 100}%`;
    
    // Add to container
    container.appendChild(bokeh);
    
    // Animate bokeh
    animateBokeh(bokeh);
}

function animateBokeh(bokeh) {
    // Random duration between 10-30 seconds
    const duration = Math.random() * 20000 + 10000;
    
    // Random positions
    const startX = parseFloat(bokeh.style.left);
    const startY = parseFloat(bokeh.style.top);
    const targetX = Math.max(0, Math.min(100, startX + (Math.random() - 0.5) * 30));
    const targetY = Math.max(0, Math.min(100, startY + (Math.random() - 0.5) * 30));
    
    // Animate with CSS animations
    bokeh.style.transition = `left ${duration}ms ease, top ${duration}ms ease, opacity 2s ease`;
    
    setTimeout(() => {
        bokeh.style.left = `${targetX}%`;
        bokeh.style.top = `${targetY}%`;
        
        // Random opacity changes
        setInterval(() => {
            bokeh.style.opacity = (0.1 + Math.random() * 0.2).toString();
        }, duration / 2);
        
        // Continue animation
        setTimeout(() => {
            animateBokeh(bokeh);
        }, duration);
    }, 100);
}

// Add this CSS animation for the shake effect
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    60% { transform: translateX(-7px); }
    80% { transform: translateX(7px); }
    100% { transform: translateX(0); }
}
.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
</style>
`);
