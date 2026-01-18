// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get users from storage
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch (e) {
    return [];
  }
}

// Dark mode preference
function loadDarkModePreference() {
  try {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-theme');
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
function validateForm(email, password) {
  if (!email || !emailRegex.test(email)) {
    showMessage('Please enter a valid email address', true);
    return false;
  }
  
  if (!password) {
    showMessage('Please enter your password', true);
    return false;
  }
  
  return true;
}

// Find user by credentials
function findUser(email, password) {
  const users = getUsers();
  return users.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.password === password
  );
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  // Validate inputs
  if (!validateForm(email, password)) {
    return;
  }
  
  // Find user
  const user = findUser(email, password);
  
  if (user) {
    // Login successful
    try {
      localStorage.setItem('username', user.username);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Apply user's dark mode preference
      if (user.darkMode) {
        localStorage.setItem('darkMode', 'true');
        document.body.classList.add('dark-theme');
      }
    } catch (e) {
      console.log('Could not save user session');
    }
    
    showMessage('Login successful! Redirecting...', false);
    
    // Clear form
    document.getElementById('login-form').reset();
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    
  } else {
    // Login failed
    showMessage('Invalid email or password. Please try again.', true);
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  loadDarkModePreference();
  loadLanguagePreference();
  updateVisitorCounter();
  
  // Check if already logged in
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // User already logged in, could redirect to home or show message
      const user = JSON.parse(currentUser);
      showMessage(`Already logged in as ${user.username}. Redirecting...`, false);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
      return;
    }
  } catch (e) {
    // Continue with login
  }
  
  // Setup form submission
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', handleLogin);
  }
  
  // Real-time validation feedback
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  
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
    passwordInput.addEventListener('focus', function() {
      this.style.borderColor = '#ddd';
    });
  }
});