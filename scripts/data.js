// Sample recipe data
const recipes = [
  {
    id: 1,
    name: "Pasta Carbonara",
    ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan", "Black Pepper"],
    instructions: [
      "Boil pasta in salted water until al dente",
      "Fry bacon until crispy, reserve some fat",
      "Mix eggs and grated Parmesan cheese in a bowl",
      "Drain pasta and add to bacon pan",
      "Remove from heat and quickly stir in egg mixture",
      "Add black pepper and serve immediately"
    ],
    likes: 42,
    thumbnail: "assets/pasta.jpg",
    comments: []
  },
  {
    id: 2,
    name: "Avocado Toast",
    ingredients: ["Bread", "Avocado", "Lemon", "Salt", "Red pepper flakes"],
    instructions: [
      "Toast bread until golden brown",
      "Mash ripe avocado in a bowl",
      "Add lemon juice, salt, and pepper to taste",
      "Spread avocado mixture generously on toast",
      "Garnish with red pepper flakes"
    ],
    likes: 35,
    thumbnail: "assets/toast.jpg",
    comments: []
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    ingredients: ["Flour", "Butter", "Brown sugar", "Chocolate chips", "Vanilla extract", "Eggs"],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      "Cream butter with brown and white sugars",
      "Beat in eggs and vanilla extract",
      "Mix in flour, baking soda, and salt",
      "Fold in chocolate chips",
      "Drop spoonfuls on baking sheet",
      "Bake for 10-12 minutes until golden"
    ],
    likes: 28,
    thumbnail: "assets/cookies.jpg",
    comments: []
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    ingredients: ["Broccoli", "Bell peppers", "Carrots", "Soy sauce", "Garlic", "Ginger", "Sesame oil"],
    instructions: [
      "Heat wok or large pan on high heat",
      "Add sesame oil and minced garlic",
      "Stir-fry harder vegetables first (carrots, broccoli)",
      "Add softer vegetables (bell peppers)",
      "Drizzle with soy sauce and ginger",
      "Toss until vegetables are crisp-tender",
      "Serve over rice or noodles"
    ],
    likes: 19,
    thumbnail: "assets/stirfry.jpg",
    comments: []
  },
  {
    id: 5,
    name: "Greek Salad",
    ingredients: ["Cucumber", "Tomatoes", "Red onion", "Feta cheese", "Olives", "Olive oil", "Oregano"],
    instructions: [
      "Dice cucumbers and tomatoes into bite-sized pieces",
      "Slice red onion thinly",
      "Combine vegetables in a large bowl",
      "Add cubed feta cheese and Kalamata olives",
      "Drizzle generously with olive oil",
      "Sprinkle with dried oregano and salt",
      "Toss gently and serve chilled"
    ],
    likes: 23,
    thumbnail: "assets/salad.jpg",
    comments: []
  },
  {
    id: 6,
    name: "Beef Tacos",
    ingredients: ["Ground beef", "Taco shells", "Lettuce", "Tomato", "Cheddar cheese", "Taco seasoning", "Sour cream"],
    instructions: [
      "Brown ground beef in a skillet over medium heat",
      "Drain excess fat and add taco seasoning",
      "Add a splash of water and simmer for 5 minutes",
      "Warm taco shells in oven",
      "Chop lettuce and dice tomatoes",
      "Fill shells with seasoned beef",
      "Top with lettuce, tomatoes, cheese, and sour cream"
    ],
    likes: 31,
    thumbnail: "assets/tacos.jpg",
    comments: []
  },
  {
    id: 7,
    name: "Blueberry Pancakes",
    ingredients: ["Pancake mix", "Milk", "Egg", "Blueberries", "Maple syrup", "Butter"],
    instructions: [
      "Mix pancake batter with milk and egg until smooth",
      "Let batter rest for 5 minutes",
      "Heat griddle or pan over medium heat",
      "Pour batter onto griddle",
      "Sprinkle fresh blueberries onto each pancake",
      "Flip when bubbles form on surface",
      "Cook until golden brown on both sides",
      "Serve hot with butter and maple syrup"
    ],
    likes: 27,
    thumbnail: "assets/pancakes.jpg",
    comments: []
  },
  {
    id: 8,
    name: "Margherita Pizza",
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves", "Olive oil", "Garlic"],
    instructions: [
      "Preheat oven to 475°F (245°C)",
      "Roll out pizza dough on floured surface",
      "Spread tomato sauce evenly, leaving a border",
      "Tear fresh mozzarella and distribute on pizza",
      "Drizzle with olive oil",
      "Bake for 10-12 minutes until crust is golden",
      "Remove from oven and top with fresh basil leaves",
      "Slice and serve immediately"
    ],
    likes: 38,
    thumbnail: "assets/pizza.jpg",
    comments: []
  },
  {
    id: 9,
    name: "Chicken Curry",
    ingredients: ["Chicken thighs", "Coconut milk", "Curry paste", "Bell peppers", "Jasmine rice", "Onion", "Lime"],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Sauté diced onion until translucent",
      "Add chicken and brown on all sides",
      "Stir in curry paste and cook for 1 minute",
      "Add chopped bell peppers",
      "Pour in coconut milk and bring to simmer",
      "Cook for 20 minutes until chicken is tender",
      "Serve over jasmine rice with lime wedges"
    ],
    likes: 29,
    thumbnail: "assets/curry.jpg",
    comments: []
  },
  {
    id: 10,
    name: "Berry Smoothie",
    ingredients: ["Mixed berries", "Greek yogurt", "Almond milk", "Honey", "Chia seeds", "Banana"],
    instructions: [
      "Add frozen mixed berries to blender",
      "Add Greek yogurt and sliced banana",
      "Pour in almond milk",
      "Drizzle honey for sweetness",
      "Blend on high until smooth and creamy",
      "Add ice cubes if desired for thickness",
      "Pour into glasses",
      "Top with chia seeds and fresh berries"
    ],
    likes: 17,
    thumbnail: "assets/smoothie.jpg",
    comments: []
  },
  {
    id: 11,
    name: "Garlic Butter Shrimp",
    ingredients: ["Shrimp", "Garlic", "Butter", "Lemon", "Parsley", "White wine"],
    instructions: [
      "Peel and devein shrimp",
      "Melt butter in large skillet over medium heat",
      "Add minced garlic and cook until fragrant (30 seconds)",
      "Add shrimp in single layer",
      "Cook 2 minutes per side until pink",
      "Add splash of white wine",
      "Squeeze fresh lemon juice over shrimp",
      "Garnish with chopped fresh parsley",
      "Serve over pasta or with crusty bread"
    ],
    likes: 33,
    thumbnail: "assets/shrimp.jpg",
    comments: []
  },
  {
    id: 12,
    name: "Chocolate Mousse",
    ingredients: ["Dark chocolate", "Heavy cream", "Egg whites", "Sugar", "Vanilla extract", "Cocoa powder"],
    instructions: [
      "Melt dark chocolate in double boiler",
      "Let chocolate cool slightly",
      "Whip heavy cream to stiff peaks",
      "In separate bowl, beat egg whites until foamy",
      "Gradually add sugar and beat to stiff peaks",
      "Fold cooled chocolate into whipped cream",
      "Gently fold in egg whites",
      "Divide into serving glasses",
      "Chill for at least 4 hours",
      "Dust with cocoa powder and serve with berries"
    ],
    likes: 25,
    thumbnail: "assets/mousse.jpg",
    comments: []
  }
];

// Initialize the in-memory storage
if (typeof recipesData !== 'undefined') {
  recipesData = recipes;
}

// Also save to localStorage as backup (for compatibility)
try {
  localStorage.setItem('recipes', JSON.stringify(recipes));
} catch (e) {
  console.log('localStorage not available, using memory only');
}