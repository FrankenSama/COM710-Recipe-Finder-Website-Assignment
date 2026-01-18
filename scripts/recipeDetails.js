// Get recipes from memory or localStorage
function getRecipes() {
  try {
    return JSON.parse(localStorage.getItem('recipes')) || [];
  } catch (e) {
    return [];
  }
}

// Save recipes back to storage
function saveRecipes(recipes) {
  try {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  } catch (e) {
    console.log('Unable to save to localStorage');
  }
}

// Load the correct recipe based on URL ID
function loadRecipeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get('id'));

  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);

  if (recipe) {
    displayRecipe(recipe);
    setupCommentForm(recipeId);
  } else {
    showRecipeNotFound();
  }
}

// Display the recipe details
function displayRecipe(recipe) {
  const container = document.getElementById('recipe-details');
  container.innerHTML = `
    <div class="recipe-header">
      <img src="${recipe.thumbnail || 'assets/default-recipe.jpg'}" alt="${recipe.name}" onerror="this.src='assets/default-recipe.jpg'">
      <h1>${recipe.name}</h1>
      <p class="likes">❤️ ${recipe.likes} Likes</p>
    </div>
    
    <div class="recipe-content">
      <section class="ingredients">
        <h2>Ingredients</h2>
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>
      
      <section class="instructions">
        <h2>Instructions</h2>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </section>
    </div>
    
    <section class="comments-section">
      <h2>Comments (${recipe.comments?.length || 0})</h2>
      <div class="comments-list" id="comments-container">
        ${displayComments(recipe.comments)}
      </div>
      
      <form id="comment-form">
        <textarea id="comment-text" placeholder="Share your thoughts about this recipe..." required minlength="3"></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </section>
  `;
}

// Display comments
function displayComments(comments) {
  if (!comments || comments.length === 0) {
    return '<p style="color: #999; font-style: italic;">No comments yet. Be the first to share your thoughts!</p>';
  }
  
  return comments.map(c => `
    <div class="comment">
      <strong>${escapeHtml(c.user)}</strong>: ${escapeHtml(c.text)}
      <small>${formatDate(c.date)}</small>
    </div>
  `).join('');
}

// Format date nicely
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Setup comment form
function setupCommentForm(recipeId) {
  const form = document.getElementById('comment-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const textarea = document.getElementById('comment-text');
      const commentText = textarea.value.trim();
      
      if (commentText.length < 3) {
        alert('Comment must be at least 3 characters long');
        return;
      }
      
      addComment(recipeId, commentText);
      textarea.value = '';
    });
  }
}

// Add a new comment
function addComment(recipeId, commentText) {
  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) return;
  
  if (!recipe.comments) {
    recipe.comments = [];
  }
  
  // Get username from localStorage or use default
  let username = 'Guest';
  try {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      username = storedUsername;
    }
  } catch (e) {
    // Use default if localStorage fails
  }
  
  recipe.comments.unshift({
    user: username,
    text: commentText,
    date: new Date().toISOString()
  });
  
  saveRecipes(recipes);
  loadRecipeDetails(); // Refresh the display
}

// Show recipe not found message
function showRecipeNotFound() {
  document.getElementById('recipe-details').innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h2>Recipe not found</h2>
      <p style="color: #666; margin: 20px 0;">Sorry, we couldn't find the recipe you're looking for.</p>
      <a href="index.html" style="display: inline-block; padding: 10px 20px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 6px;">Back to all recipes</a>
    </div>
  `;
}

// Dark mode
function loadDarkModePreference() {
  try {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-theme');
    }
  } catch (e) {
    // Use default light mode
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
    // Skip if localStorage fails
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
    // Use default language
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadDarkModePreference();
  loadLanguagePreference();
  updateVisitorCounter();
  loadRecipeDetails();
});