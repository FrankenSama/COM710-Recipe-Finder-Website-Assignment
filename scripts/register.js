// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Load existing users or initialize empty array
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch (e) {
    return [];
  }
}

// Save users to storage
function saveUsers(users) {
  try {
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (e) {
    console.error('Unable to save user data');
    return false;
  }
}

// Dark mode preference
function loadDarkModePreference() {
  try {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.getElementById('dark-mode-pref').checked = true;
    }
  } catch (e) {
    // Use default
  }
}

// Visitor counter
function updateVisitorCounter() {
  try {
    let count = parseInt(localStorage.getItem('visitorCount') || '0');
    const counter = document.getElementById('visitor-counter');
    if (counter) {
      counter.textContent = count;
    }
  } catch (e) {
    // Skip if fails
  }
}

// Language preference
function loadLanguagePreference() {
  try {
    const savedLang = localStorage.getItem('language') || 'en';
    const langSelect = document.getElementById('language-select');
    const introText = document.getElementById('intro-text');
    
    if (langSelect && introText) {
      langSelect.value = savedLang;
      
      const translations = {
        en: "Welcome to our recipe hub!",
        es: "¡Bienvenido a nuestro centro de recetas!"
      };
      
      introText.textContent = translations[savedLang] || translations.en;
      
      langSelect.addEventListener('change', function(e) {
        const lang = e.target.value;
        introText.textContent = translations[lang] || translations.en;
        localStorage.setItem('language', lang);
      });
    }
  } catch (e) {
    // Use default
  }
}

// Show message to user
function showMessage(message, isError = false) {
  const messageEl = document.getElementById('form-message');
  messageEl.textContent = message;
  messageEl.className = isError ? 'error' : 'success';
  messageEl.style.display = 'block';
  
  // Auto-hide success messages after 3 seconds
  if (!isError) {
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
  }
}

// Validate form inputs
function validateForm(username, email, password) {
  if (!username || username.length < 3) {
    showMessage('Username must be at least 3 characters long', true);
    return false;
  }
  
  if (!email || !emailRegex.test(email)) {
    showMessage('Please enter a valid email address', true);
    return false;
  }
  
  if (!password || password.length < 6) {
    showMessage('Password must be at least 6 characters long', true);
    return false;
  }
  
  return true;
}

// Check if user already exists
function userExists(username, email) {
  const users = getUsers();
  return users.some(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    u.email.toLowerCase() === email.toLowerCase()
  );
}

// Handle registration
function handleRegistration(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const darkModePref = document.getElementById('dark-mode-pref').checked;
  
  // Validate inputs
  if (!validateForm(username, email, password)) {
    return;
  }
  
  // Check if user already exists
  if (userExists(username, email)) {
    showMessage('Username or email already exists. Please choose different credentials.', true);
    return;
  }
  
  // Create new user object
  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password, // In real app, this would be hashed
    darkMode: darkModePref,
    createdAt: new Date().toISOString()
  };
  
  // Save user
  const users = getUsers();
  users.push(newUser);
  
  if (saveUsers(users)) {
    // Save current username for comments
    try {
      localStorage.setItem('username', username);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (e) {
      // Continue even if this fails
    }
    
    // Apply dark mode preference if selected
    if (darkModePref) {
      try {
        localStorage.setItem('darkMode', 'true');
      } catch (e) {
        // Continue
      }
    }
    
    showMessage('Registration successful! Redirecting to home page...', false);
    
    // Clear form
    document.getElementById('register-form').reset();
    
    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } else {
    showMessage('Registration failed. Please try again.', true);
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  loadDarkModePreference();
  loadLanguagePreference();
  updateVisitorCounter();
  
  // Setup form submission
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', handleRegistration);
  }
  
  // Real-time validation feedback
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (usernameInput) {
    usernameInput.addEventListener('blur', function() {
      if (this.value.length > 0 && this.value.length < 3) {
        this.style.borderColor = '#ff6b6b';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (this.value.length > 0 && !emailRegex.test(this.value)) {
        this.style.borderColor = '#ff6b6b';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      if (this.value.length > 0 && this.value.length < 6) {
        this.style.borderColor = '#ff6b6b';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
  }
});