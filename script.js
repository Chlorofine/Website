document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // NEW: Authentication Form Switching (for index.html)
    // ------------------------------------------
    const loginCard = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');
    const showSignupBtn = document.getElementById('show-signup-btn');
    const showLoginBtn = document.getElementById('show-login-btn');
    const signupForm = document.getElementById('signup-form');

    if (showSignupBtn) {
        // Function to show the Sign Up card
        const showSignup = (event) => {
            event.preventDefault();
            loginCard.classList.add('hidden');
            signupCard.classList.remove('hidden');
        };

        // Function to show the Log In card
        const showLogin = (event) => {
            event.preventDefault();
            signupCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        };

        // Event listeners for switching
        showSignupBtn.addEventListener('click', showSignup);
        showLoginBtn.addEventListener('click', showLogin);

        // Registration Submission Logic (Redirects to Login on success)
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the default form submission

            // *** Simulated Registration Process ***
            const email = signupForm.querySelector('input[type="email"]').value;
            const username = signupForm.querySelector('input[type="text"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;
            
            // Check for basic validation
            if (email && username && password) {
                alert(`User ${username} registered successfully! Please log in.`);
                
                // 1. Clear the sign up form inputs
                signupForm.reset();
                
                // 2. Switch back to the login card
                showLogin(event);
                
            } else {
                alert('Please fill out all fields for registration.');
            }
        });
    }
    
    // ------------------------------------------
    // 1. Sidebar Navigation Functionality (Existing code, unchanged)
    // ------------------------------------------
    const navItems = document.querySelectorAll('.side-nav-menu .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent default anchor behavior unless it's the Logout link
            if (!item.classList.contains('logout-item')) {
                event.preventDefault(); 
            }

            // Remove 'active' class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add 'active' class to the clicked item
            item.classList.add('active');

            const pageName = item.dataset.page;
            console.log(`Navigating to: ${pageName}`);
            
            if (pageName === 'Logout') {
                // The anchor link handles the actual page change
                console.log('Logging out...');
            } else {
                // In a real application, you'd load content here
                alert(`Mapsd to the ${pageName} view! (See console for URL change simulation)`);
            }
        });
    });

    // ------------------------------------------
    // 2. 'Create Post' Button Functionality (Existing code, unchanged)
    // ------------------------------------------
    // Assuming you add the 'id="create-post-sidebar-btn"' and 'id="post-composer-card"'
    const createPostSidebarBtn = document.querySelector('.create-post-btn'); // Using class for consistency
    const postComposerCard = document.querySelector('.post-composer-card');

    if(createPostSidebarBtn && postComposerCard) {
        createPostSidebarBtn.addEventListener('click', () => {
            console.log('Toggling Post Composer visibility...');
            
            // The composer is currently visible in the HTML structure, so we toggle it
            // For the demo, let's just alert
            alert('Post Composer toggled/focused. (In a real app, this might open a modal)');
        });
    }
    

    // Simulate 'Post' action from the composer
    const composerPostBtn = document.querySelector('.composer-btn'); // Using class for consistency
    if (composerPostBtn) {
        composerPostBtn.addEventListener('click', () => {
            const postContent = document.querySelector('.composer-input').value;
            if (postContent.trim() === "") {
                alert('Please enter something to post!');
            } else {
                alert(`Draft Post: "${postContent}"\n\n(In a real app, this would be submitted to a server.)`);
                document.querySelector('.composer-input').value = ""; // Clear input
                // postComposerCard.style.display = 'none'; // Keep visible in feed for demo simplicity
            }
        });
    }


    // ------------------------------------------
    // 3. Post Actions (Like, Comment, Share) (Existing code, modified to use querySelectorAll)
    // ------------------------------------------

    // Like Button Toggle
    const likeBtns = document.querySelectorAll('.post-actions .fa-heart');

    likeBtns.forEach(btnIcon => {
        const btn = btnIcon.closest('.action-icon');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isLiked = btn.classList.toggle('active-like');
            // For this simple demo, we won't try to link counts since the HTML has hardcoded counts
            console.log(`Post like state toggled to: ${isLiked ? 'Liked' : 'Unliked'}`);
            
            // Optional: Provide visual feedback
            btn.style.transform = isLiked ? 'scale(1.1)' : 'scale(1.0)';
            setTimeout(() => btn.style.transform = 'scale(1.0)', 100);

        });
    });

    // Other Action Buttons
    document.querySelectorAll('.post-actions .fa-comment').forEach(btnIcon => {
        const btn = btnIcon.closest('.action-icon');
        if (!btn) return;
        btn.addEventListener('click', () => {
            console.log('Comment button clicked.');
            alert('Opening comment section/modal. (Scroll simulation)');
        });
    });

    document.querySelectorAll('.post-actions .fa-share').forEach(btnIcon => {
        const btn = btnIcon.closest('.action-icon');
        if (!btn) return;
        btn.addEventListener('click', () => {
            console.log('Share button clicked.');
            alert('Opening share options. (Sharing simulation)');
        });
    });

    // ------------------------------------------
    // 4. Follow Button Functionality (Existing code, simplified)
    // ------------------------------------------
    const followBtns = document.querySelectorAll('.follow-btn');

    followBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real app, you would use a unique ID here
            const userId = btn.closest('.suggestion-item').querySelector('.username').textContent;
            const isFollowing = btn.textContent === 'Following';
            
            if (isFollowing) {
                btn.textContent = 'Follow';
                btn.style.color = '#0095f6'; 
                console.log(`Unfollowed user: ${userId}`);
            } else {
                btn.textContent = 'Following';
                btn.style.color = '#8e8e8e'; 
                console.log(`Now following user: ${userId}`);
            }
            alert(btn.textContent + ' ' + userId);
        });
    });

    // ------------------------------------------
    // 5. Upload Button Functionality (Right Sidebar) (Existing code, simplified)
    // ------------------------------------------
    const uploadBtn = document.querySelector('.upload-btn'); // Using class for consistency
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            const uploadArea = uploadBtn.closest('.upload-area');
            const fileInput = uploadArea.querySelector('input[type="file"]');
            const captionInput = uploadArea.querySelector('input[type="text"]'); 

            if (fileInput.files.length === 0) {
                alert('Please select a file to upload!');
                return;
            }

            const fileName = fileInput.files[0].name;
            const caption = captionInput.value || "No caption provided";

            alert(`Ready to upload: \nFile: ${fileName}\nCaption: ${caption}\n\n(In a real app, this would upload the file.)`);
            
            // Clear inputs after simulated upload
            fileInput.value = '';
            captionInput.value = '';
            console.log('Upload simulated and inputs cleared.');
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    // --- New Pop-up Display Logic ---
    const notificationBtn = document.getElementById('nav-notification');
    const bookmarksBtn = document.getElementById('nav-bookmarks');
    const notificationPopup = document.getElementById('notification-popup');
    const bookmarksPopup = document.getElementById('bookmarks-popup');

    const popups = [
        { btn: notificationBtn, popup: notificationPopup, name: 'Notification' },
        { btn: bookmarksBtn, popup: bookmarksPopup, name: 'Bookmarks' }
    ];

    function togglePopup(targetPopup) {
        // Close all other popups
        popups.forEach(({ popup }) => {
            if (popup !== targetPopup) {
                popup.classList.remove('show-popup');
            }
        });
        
        // Toggle the target popup
        targetPopup.classList.toggle('show-popup');
    }

    popups.forEach(({ btn, popup, name }) => {
        if (btn && popup) {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                
                // 1. Calculate the button's position relative to the viewport
                const rect = btn.getBoundingClientRect();
                
                // 2. Set the position of the popup
                // 'top' is button's top + current scroll position
                popup.style.top = `${rect.top + window.scrollY}px`;
                
                // 'left' is button's right edge + a small offset (e.g., 20px)
                popup.style.left = `${rect.right + 20}px`;
                
                // 3. Show/hide the popup
                togglePopup(popup);

                console.log(`${name} popup toggled.`);
            });
        }
    });
    
    // Close popups if the user clicks anywhere else on the document
    document.addEventListener('click', (event) => {
        const isPopup = event.target.closest('.nav-popup');
        const isButton = event.target.closest('.nav-item');

        if (!isPopup && !isButton) {
            popups.forEach(({ popup }) => {
                popup.classList.remove('show-popup');
            });
        }
    });

    // ------------------------------------------
    // (Keep all other existing JavaScript code below this point)
    // ------------------------------------------

    // 1. Sidebar Navigation Functionality (Existing logic modified to include new IDs)
    // Removed the alert from navigation for these two specific items to allow the pop-up to work.
    const navItems = document.querySelectorAll('.side-nav-menu .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent default anchor behavior unless it's the Logout link
            if (!item.classList.contains('logout-item')) {
                event.preventDefault(); 
            }
            
            // Only fire the alert/log for non-popup items
            if (item.id !== 'nav-notification' && item.id !== 'nav-bookmarks') {
                // Remove 'active' class from all items
                navItems.forEach(i => i.classList.remove('active'));
                // Add 'active' class to the clicked item
                item.classList.add('active');
                
                const pageName = item.textContent.trim();
                if (pageName === 'Logout') {
                    console.log('Logging out...');
                } else {
                    alert(`Mapsd to the ${pageName} view!`);
                }
            }
        });
    });

    // ... (Keep all other existing functions like post composer, likes, follows, and uploads) ...
    // Note: The rest of your script.js content should follow here.

});
});