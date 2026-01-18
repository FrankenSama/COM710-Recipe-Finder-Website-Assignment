// Load recipes from localStorage or global variable
function getRecipes() {
  try {
    // First try localStorage
    const stored = localStorage.getItem('recipes');
    if (stored) {
      const recipes = JSON.parse(stored);
      console.log('Loaded recipes from localStorage:', recipes.length);
      return recipes;
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
  
  // Fallback to global variable if data.js loaded
  if (window.recipesData && window.recipesData.length > 0) {
    console.log('Loaded recipes from window.recipesData:', window.recipesData.length);
    return window.recipesData;
  }
  
  console.error('No recipes found!');
  return [];
}

// Render recipes to the page
function renderRecipes(recipesToRender = getRecipes()) {
  const container = document.getElementById('recipe-container');
  
  if (recipesToRender.length === 0) {
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No recipes found. Try a different search term!</p>';
    return;
  }
  
  container.innerHTML = recipesToRender.map(recipe => `
    <div class="recipe-card">
      ${recipe.thumbnail ? `<img src="${recipe.thumbnail}" alt="${recipe.name}" onerror="this.src='assets/default-recipe.jpg'">` : '<img src="assets/default-recipe.jpg" alt="Recipe">'}
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.slice(0, 3).join(', ')}${recipe.ingredients.length > 3 ? '...' : ''}</p>
      <div class="recipe-actions">
        <button onclick="handleLike(${recipe.id})">❤️ ${recipe.likes}</button>
        <a href="recipe-details.html?id=${recipe.id}">View Recipe</a>
      </div>
    </div>
  `).join('');
}

// Handle likes
function handleLike(recipeId) {
  try {
    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      recipe.likes++;
      // Save back to localStorage
      localStorage.setItem('recipes', JSON.stringify(recipes));
      renderRecipes();
    }
  } catch (e) {
    console.error('Error handling like:', e);
  }
}

// Search functionality
function performSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  
  if (!searchTerm) {
    renderRecipes(); // Show all recipes if search is empty
    return;
  }
  
  const filteredRecipes = getRecipes().filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm) || 
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
  );
  renderRecipes(filteredRecipes);
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  
  // Save preference
  try {
    localStorage.setItem('darkMode', isDark);
  } catch (e) {
    // If localStorage fails, just continue
  }
  
  // Update button emoji
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  if (darkModeBtn) {
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
  }
}

// Load dark mode preference
function loadDarkModePreference() {
  try {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-theme');
      const darkModeBtn = document.getElementById('dark-mode-toggle');
      if (darkModeBtn) {
        darkModeBtn.textContent = '☀️';
      }
    }
  } catch (e) {
    // If localStorage fails, use default light mode
  }
}

// Visitor counter
let visitorCount = 0;

function updateVisitorCounter() {
  try {
    visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
  } catch (e) {
    // If localStorage fails, just increment in memory
    visitorCount++;
  }
  
  const counter = document.getElementById('visitor-counter');
  if (counter) {
    counter.textContent = visitorCount;
  }
}

// Language switcher
const translations = {
  en: {
    intro: "Welcome to our recipe hub!"
  },
  es: {
    intro: "¡Bienvenido a nuestro centro de recetas!"
  }
};

function changeLanguage(lang) {
  const introText = document.getElementById('intro-text');
  if (introText && translations[lang]) {
    introText.textContent = translations[lang].intro;
  }
  
  try {
    localStorage.setItem('language', lang);
  } catch (e) {
    // Continue if localStorage fails
  }
}

function loadLanguagePreference() {
  try {
    const savedLang = localStorage.getItem('language') || 'en';
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = savedLang;
      changeLanguage(savedLang);
    }
  } catch (e) {
    // Use default language if localStorage fails
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Check if recipes are available
  const recipes = getRecipes();
  console.log('Available recipes:', recipes.length);
  
  // Load preferences
  loadDarkModePreference();
  loadLanguagePreference();
  updateVisitorCounter();
  
  // Search button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
  
  // Search on Enter key
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  // Language selector
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.addEventListener('change', function(e) {
      changeLanguage(e.target.value);
    });
  }
  
  // Initialize the page
  renderRecipes();
});