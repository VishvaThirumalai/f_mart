// src/data/products.js
// Fruits & Vegetables
import freshApples from '../assets/images/products/fresh-apples.jpg';
import bananaImage from '../assets/images/products/bananas.jpg';
import sweetGrapes from '../assets/images/products/sweet-grapes.jpg';
import freshStrawberries from '../assets/images/products/fresh-strawberries.jpg';
import avocados from '../assets/images/products/ripe-avocados.jpg';
import organicCarrots from '../assets/images/products/organic-carrots.jpg';
import broccoliCrowns from '../assets/images/products/broccoli-crowns.jpg';
import organicSpinach from '../assets/images/products/organic-spinach.jpg';
import sweetCorn from '../assets/images/products/sweet-corn.jpg';
import organicTomatoes from '../assets/images/products/organic-tomatoes.jpg';
import redPotatoes from '../assets/images/products/red-potatoes.webp';
import organicBlueberries from '../assets/images/products/organic-blueberries.jpg';
import organicKale from '../assets/images/products/organic-kale.jpg';
import mangoes from '../assets/images/products/mangoes.jpg';
import organicCucumbers from '../assets/images/products/organic-cucumbers.jpg';

// Dairy & Eggs
import organicMilk from '../assets/images/products/organic-milk.jpg';
import eggsDozen from '../assets/images/products/eggs-dozen.jpg';
import greekYogurt from '../assets/images/products/greek-yogurt.jpg';
import sharpCheddar from '../assets/images/products/sharp-cheddar.jpg';
import organicButter from '../assets/images/products/organic-butter.jpg';
import almondMilk from '../assets/images/products/almond-milk.jpg';
import cottageCheese from '../assets/images/products/cottage-cheese.jpg';
import organicSourCream from '../assets/images/products/organic-sour-cream.jpg';
import eggWhites from '../assets/images/products/egg-whites.jpg';
import swissCheese from '../assets/images/products/swiss-cheese.jpg';

// Meat & Fish
import freshSalmon from '../assets/images/products/fresh-salmon.jpg';
import chickenBreast from '../assets/images/products/chicken-breast.jpg';
import groundBeef from '../assets/images/products/ground-beef.jpg';
import shrimp from '../assets/images/products/shrimp.jpg';
import porkChops from '../assets/images/products/pork-chops.jpg';
import tilapiaFillets from '../assets/images/products/tilapia-fillets.jpg';
import organicChickenThighs from '../assets/images/products/organic-chicken-thighs.jpg';
import sirloinSteak from '../assets/images/products/sirloin-steak.jpg';
import bacon from '../assets/images/products/bacon.jpg';
import codFillets from '../assets/images/products/cod-fillets.jpg';
import italianSausage from '../assets/images/products/italian-sausage.jpg';
import groundTurkey from '../assets/images/products/ground-turkey.jpg';

// Bakery
import wholeWheatBread from '../assets/images/products/whole-wheat-bread.jpg';
import bagels from '../assets/images/products/bagels.jpg';
import croissants from '../assets/images/products/croissants.jpg';
import chocolateChipCookies from '../assets/images/products/chocolate-chip-cookies.jpg';
import frenchBaguette from '../assets/images/products/french-baguette.jpg';
import cinnamonRolls from '../assets/images/products/cinnamon-rolls.jpg';
import sourdoughBread from '../assets/images/products/sourdough-bread.jpg';
import blueberryMuffins from '../assets/images/products/blueberry-muffins.jpg';
import wholeGrainEnglishMuffins from '../assets/images/products/whole-grain-english-muffins.jpg';
import applePie from '../assets/images/products/apple-pie.jpg';

// Beverages
import bottledWater from '../assets/images/products/bottled-water.jpg';
import orangeJuice from '../assets/images/products/orange-juice.jpg';
import sparklingWater from '../assets/images/products/sparkling-water.jpg';
import icedTea from '../assets/images/products/iced-tea.jpg';
import coffeeBeans from '../assets/images/products/coffee-beans.jpg';
import energyDrink from '../assets/images/products/energy-drink.jpg';
import greenTea from '../assets/images/products/green-tea.jpg';
import soda from '../assets/images/products/soda.jpg';
import almondMilkBeverage from '../assets/images/products/almond-milk-beverage.jpg';
import hotCocoaMix from '../assets/images/products/hot-cocoa-mix.jpg';

// Snacks
import potatoChips from '../assets/images/products/potato-chips.jpg';
import granolaBars from '../assets/images/products/granola-bars.jpg';
import mixedNuts from '../assets/images/products/mixed-nuts.jpg';
import popcorn from '../assets/images/products/popcorn.jpg';
import trailMix from '../assets/images/products/trail-mix.jpg';
import pretzels from '../assets/images/products/pretzels.jpg';
import chocolateBars from '../assets/images/products/chocolate-bars.jpg';
import riceCakes from '../assets/images/products/rice-cakes.jpg';
import cheeseCrackers from '../assets/images/products/cheese-crackers.jpg';
import driedFruitMix from '../assets/images/products/dried-fruit-mix.jpg';

export const products = [

  { 
    id: 1, 
    name: 'Fresh Bananas', 
    price: 45, 
    oldPrice: 60, 
    rating: 4.5, 
    image: bananaImage,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Fresh, ripe bananas perfect for smoothies and snacking',
    unit: 'per dozen',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 2, 
    name: 'Organic Apples', 
    price: 120, 
    oldPrice: 150, 
    rating: 4.8, 
    image: freshApples,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Crisp and sweet organic apples',
    unit: 'per kg',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 3, 
    name: 'Sweet Grapes', 
    price: 49, 
    oldPrice: 69, 
    rating: 4.6, 
    image: sweetGrapes,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Seedless red grapes',
    unit: 'per lb',
    discount: '18% OFF',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 4, 
    name: 'Fresh Strawberries', 
    price: 99, 
    oldPrice: 109, 
    rating: 4.7, 
    image: freshStrawberries,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Juicy California strawberries',
    unit: '1 lb package',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 5, 
    name: 'Ripe Avocados', 
    price: 99, 
    oldPrice: 100, 
    rating: 4.4, 
    image: avocados,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Hass avocados, ready to eat',
    unit: 'each',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 6, 
    name: 'Organic Carrots', 
    price: 25, 
    oldPrice: 30, 
    rating: 4.1, 
    image: organicCarrots,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Fresh organic carrots',
    unit: 'per kg',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 7, 
    name: 'Broccoli Crowns', 
    price: 25, 
    oldPrice: 29, 
    rating: 4.1, 
    image: broccoliCrowns,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Fresh green broccoli',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 8, 
    name: 'Organic Spinach', 
    price: 30, 
    oldPrice: 40, 
    rating: 4.5, 
    image: organicSpinach,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Pre-washed organic baby spinach',
    unit: '5 oz package',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 9, 
    name: 'Sweet Corn', 
    price: 50, 
    oldPrice: 75, 
    rating: 4.6, 
    image: sweetCorn,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Fresh sweet corn on the cob',
    unit: 'each',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 10, 
    name: 'Organic Tomatoes', 
    price: 30, 
    oldPrice: 40, 
    rating: 4.2, 
    image: organicTomatoes,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Vine-ripened organic tomatoes',
    unit: 'per kg',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 11, 
    name: 'Red Potatoes', 
    price: 30, 
    oldPrice: 50, 
    rating: 4.4, 
    image: redPotatoes,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Fresh red potatoes',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 12, 
    name: 'Organic Blueberries', 
    price: 180, 
    oldPrice: 220, 
    rating: 4.7, 
    image: organicBlueberries,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Fresh organic blueberries',
    unit: '1 pint',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 13, 
    name: 'Organic Kale', 
    price: 59, 
    oldPrice: 99, 
    rating: 4.2, 
    image: organicKale,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Fresh organic kale',
    unit: 'per bunch',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 14, 
    name: 'Mangoes', 
    price: 49, 
    oldPrice: 99, 
    rating: 4.5, 
    image: mangoes,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    description: 'Sweet tropical mangoes',
    unit: 'each',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 15, 
    name: 'Organic Cucumbers', 
    price: 29, 
    oldPrice: 59, 
    rating: 4.0, 
    image: organicCucumbers,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    description: 'Organic English cucumbers',
    unit: 'each',
    inStock: true,
    organic: true,
    freeShipping: true
  },

  // Dairy & Eggs (10 items)
  { 
    id: 16, 
    name: 'Organic Milk', 
    price: 65, 
    oldPrice: 75, 
    rating: 4.6, 
    image: organicMilk,
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    description: 'Fresh whole organic milk',
    unit: '1 liter',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 17, 
    name: 'Large Eggs', 
    price: 85, 
    oldPrice: 95, 
    rating: 4.4, 
    image: eggsDozen,
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    description: 'Farm-fresh large eggs',
    unit: 'dozen',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 18, 
    name: 'Greek Yogurt', 
    price: 95, 
    oldPrice: 110, 
    rating: 4.5, 
    image: greekYogurt,
    category: 'Dairy & Eggs',
    subcategory: 'Yogurt',
    description: 'Creamy Greek yogurt',
    unit: '5.3 oz',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 19, 
    name: 'Sharp Cheddar', 
    price: 150, 
    oldPrice: 180, 
    rating: 4.5, 
    image: sharpCheddar,
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    description: 'Aged sharp cheddar cheese',
    unit: '8 oz block',
    discount: '17% OFF',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 20, 
    name: 'Organic Butter', 
    price: 59, 
    oldPrice: 69, 
    rating: 4.8, 
    image: organicButter,
    category: 'Dairy & Eggs',
    subcategory: 'Dairy',
    description: 'Creamy organic butter',
    unit: '1 lb',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 21, 
    name: 'Almond Milk', 
    price: 34, 
    oldPrice: 39, 
    rating: 4.4, 
    image: almondMilk,
    category: 'Dairy & Eggs',
    subcategory: 'Milk',
    description: 'Unsweetened almond milk',
    unit: 'half gallon',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 22, 
    name: 'Cottage Cheese', 
    price: 29, 
    oldPrice: 39, 
    rating: 4.2, 
    image: cottageCheese,
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    description: 'Low-fat cottage cheese',
    unit: '16 oz',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 23, 
    name: 'Organic Sour Cream', 
    price: 249, 
    oldPrice: 279, 
    rating: 4.3, 
    image: organicSourCream,
    category: 'Dairy & Eggs',
    subcategory: 'Dairy',
    description: 'Organic cultured sour cream',
    unit: '16 oz',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 24, 
    name: 'Egg Whites', 
    price: 50, 
    oldPrice: 60,
    rating: 4.6, 
    image: eggWhites,
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    description: '100% liquid egg whites',
    unit: '16 oz carton',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 25, 
    name: 'Swiss Cheese', 
    price: 59, 
    oldPrice: 99, 
    rating: 4.6, 
    image: swissCheese,
    category: 'Dairy & Eggs',
    subcategory: 'Cheese',
    description: 'Premium Swiss cheese slices',
    unit: '8 oz package',
    inStock: true,
    organic: false,
    freeShipping: false
  },

  // Meat & Fish (12 items)
  { 
    id: 26, 
    name: 'Fresh Salmon', 
    price: 450, 
    oldPrice: 500, 
    rating: 4.8, 
    image: freshSalmon,
    category: 'Meat & Fish',
    subcategory: 'Fish',
    description: 'Wild-caught Alaskan salmon fillet',
    unit: 'per kg',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 27, 
    name: 'Chicken Breast',  
    price: 280, 
    oldPrice: 300,
    rating: 4.7,
    image: chickenBreast,
    category: 'Meat & Fish',
    subcategory: 'Chicken',
    description: 'Boneless skinless chicken breasts',
    unit: 'per kg',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 28, 
    name: 'Ground Beef', 
    price: 50, 
    oldPrice: 60, 
    rating: 4.5, 
    image: groundBeef,
    category: 'Meat & Fish',
    subcategory: 'Beef',
    description: '85% lean ground beef',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 29, 
    name: 'Shrimp', 
    price: 520, 
    oldPrice: 600, 
    rating: 4.7, 
    image: shrimp,
    category: 'Meat & Fish',
    subcategory: 'Seafood',
    description: 'Large wild-caught shrimp',
    unit: 'per kg',
    discount: '17% OFF',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 30, 
    name: 'Pork Chops', 
    price: 49, 
    oldPrice: 59, 
    rating: 4.4, 
    image: porkChops,
    category: 'Meat & Fish',
    subcategory: 'Pork',
    description: 'Center-cut pork chops',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 31, 
    name: 'Tilapia Fillets', 
    price: 79, 
    oldPrice: 89, 
    rating: 4.3, 
    image: tilapiaFillets,
    category: 'Meat & Fish',
    subcategory: 'Fish',
    description: 'Fresh tilapia fillets',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 32, 
    name: 'Organic Chicken Thighs', 
    price: 49, 
    oldPrice: 59, 
    rating: 4.5, 
    image: organicChickenThighs,
    category: 'Meat & Fish',
    subcategory: 'Chicken',
    description: 'Boneless organic chicken thighs',
    unit: 'per lb',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 33, 
    name: 'Sirloin Steak', 
    price: 109, 
    oldPrice: 129, 
    rating: 4.7, 
    image: sirloinSteak,
    category: 'Meat & Fish',
    subcategory: 'Beef',
    description: 'USDA choice sirloin steak',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 34, 
    name: 'Bacon', 
    price: 69, 
    oldPrice: 79, 
    rating: 4.6, 
    image: bacon,
    category: 'Meat & Fish',
    subcategory: 'Pork',
    description: 'Thick-cut smoked bacon',
    unit: '12 oz package',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 35, 
    name: 'Cod Fillets', 
    price: 89, 
    oldPrice: 99, 
    rating: 4.4, 
    image: codFillets,
    category: 'Meat & Fish',
    subcategory: 'Fish',
    description: 'Fresh Atlantic cod fillets',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 36, 
    name: 'Italian Sausage', 
    price: 49, 
    oldPrice: 69, 
    rating: 4.3, 
    image: italianSausage,
    category: 'Meat & Fish',
    subcategory: 'Pork',
    description: 'Mild Italian sausage links',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 37, 
    name: 'Ground Turkey', 
    price: 50, 
    oldPrice: 60, 
    rating: 4.5, 
    image: groundTurkey,
    category: 'Meat & Fish',
    subcategory: 'Poultry',
    description: '93% lean ground turkey',
    unit: 'per lb',
    inStock: true,
    organic: false,
    freeShipping: false
  },

  // Bakery (10 items)
  { 
    id: 38, 
    name: 'Whole Wheat Bread', 
    price: 40, 
    oldPrice: 50, 
    rating: 4.3, 
    image: wholeWheatBread,
    category: 'Bakery',
    subcategory: 'Bread',
    description: 'Freshly baked whole grain bread',
    unit: '24 oz loaf',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 39, 
    name: 'Bagels', 
    price: 39, 
    oldPrice: 49, 
    rating: 4.3, 
    image: bagels,
    category: 'Bakery',
    subcategory: 'Bread',
    description: 'Fresh plain bagels',
    unit: '6-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 40, 
    name: 'Croissants', 
    price: 75, 
    oldPrice: 90, 
    rating: 4.6, 
    image: croissants,
    category: 'Bakery',
    subcategory: 'Pastries',
    description: 'Buttery French croissants',
    unit: '4-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 41, 
    name: 'Chocolate Chip Cookies', 
    price: 29, 
    oldPrice: 49, 
    rating: 4.7, 
    image: chocolateChipCookies,
    category: 'Bakery',
    subcategory: 'Cookies',
    description: 'Freshly baked chocolate chip cookies',
    unit: '12 oz package',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 42, 
    name: 'French Baguette', 
    price: 49, 
    oldPrice: 99, 
    rating: 4.4, 
    image: frenchBaguette,
    category: 'Bakery',
    subcategory: 'Bread',
    description: 'Traditional French baguette',
    unit: 'each',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 43, 
    name: 'Cinnamon Rolls', 
    price: 49, 
    oldPrice: 99, 
    rating: 4.8, 
    image: cinnamonRolls,
    category: 'Bakery',
    subcategory: 'Pastries',
    description: 'Fresh cinnamon rolls with icing',
    unit: '6-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 44, 
    name: 'Artisan Sourdough', 
    price: 65, 
    oldPrice: 75, 
    rating: 4.9, 
    image: sourdoughBread,
    category: 'Bakery',
    subcategory: 'Bread',
    description: 'Handcrafted sourdough bread',
    unit: '20 oz',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 45, 
    name: 'Blueberry Muffins', 
    price: 90, 
    oldPrice: 110, 
    rating: 4.4, 
    image: blueberryMuffins,
    category: 'Bakery',
    subcategory: 'Muffins',
    description: 'Fresh blueberry muffins',
    unit: '4-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 46, 
    name: 'Whole Grain English Muffins', 
    price: 299, 
    oldPrice: 349, 
    rating: 4.3, 
    image: wholeGrainEnglishMuffins,
    category: 'Bakery',
    subcategory: 'Bread',
    description: 'Whole grain English muffins',
    unit: '6-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 47, 
    name: 'Apple Pie', 
    price: 79, 
    oldPrice: 99, 
    rating: 4.7, 
    image: applePie,
    category: 'Bakery',
    subcategory: 'Desserts',
    description: 'Homemade apple pie',
    unit: '9-inch pie',
    inStock: true,
    organic: false,
    freeShipping: false
  },

  // Beverages (10 items)
  { 
    id: 48, 
    name: 'Bottled Water', 
    price: 50, 
    oldPrice: 60, 
    rating: 4.2, 
    image: bottledWater,
    category: 'Beverages',
    subcategory: 'Water',
    description: 'Purified bottled water',
    unit: '24-pack',
    discount: '20% OFF',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 49, 
    name: 'Orange Juice', 
    price: 85, 
    oldPrice: 100, 
    rating: 4.4, 
    image: orangeJuice,
    category: 'Beverages',
    subcategory: 'Juice',
    description: '100% pure orange juice',
    unit: '52 oz',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 50, 
    name: 'Sparkling Water', 
    price: 45, 
    oldPrice: 55, 
    rating: 4.2, 
    image: sparklingWater,
    category: 'Beverages',
    subcategory: 'Water',
    description: 'Assorted flavors sparkling water',
    unit: '12-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 51, 
    name: 'Iced Tea', 
    price: 29, 
    oldPrice: 49, 
    rating: 4.4, 
    image: icedTea,
    category: 'Beverages',
    subcategory: 'Tea',
    description: 'Unsweetened iced tea',
    unit: '12-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 52, 
    name: 'Coffee Beans', 
    price: 350, 
    oldPrice: 400, 
    rating: 4.6, 
    image: coffeeBeans,
    category: 'Beverages',
    subcategory: 'Coffee',
    description: 'Premium Arabica coffee beans',
    unit: '12 oz bag',
    inStock: true,
    organic: true,
    freeShipping: true
  },
  { 
    id: 53, 
    name: 'Energy Drink', 
    price: 199, 
    oldPrice: 249, 
    rating: 4.1, 
    image: energyDrink,
    category: 'Beverages',
    subcategory: 'Energy',
    description: 'Sugar-free energy drink',
    unit: '16 oz can',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 54, 
    name: 'Green Tea', 
    price: 120, 
    oldPrice: 140, 
    rating: 4.3, 
    image: greenTea,
    category: 'Beverages',
    subcategory: 'Tea',
    description: 'Organic green tea bags',
    unit: '20-count box',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 55, 
    name: 'Soda', 
    price: 599, 
    oldPrice: 699, 
    rating: 4.0, 
    image: soda,
    category: 'Beverages',
    subcategory: 'Soda',
    description: 'Assorted flavors soda',
    unit: '12-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 56, 
    name: 'Almond Milk Beverage', 
    price: 299, 
    oldPrice: 349, 
    rating: 4.5, 
    image: almondMilkBeverage,
    category: 'Beverages',
    subcategory: 'Milk',
    description: 'Unsweetened vanilla almond milk',
    unit: 'half gallon',
    inStock: true,
    organic: true,
    freeShipping: false
  },
  { 
    id: 57, 
    name: 'Hot Cocoa Mix', 
    price: 349, 
    oldPrice: 399, 
    rating: 4.4, 
    image: hotCocoaMix,
    category: 'Beverages',
    subcategory: 'Mixes',
    description: 'Rich chocolate hot cocoa mix',
    unit: '10 oz canister',
    inStock: true,
    organic: false,
    freeShipping: false
  },

  // Snacks (10 items)
  { 
    id: 58, 
    name: 'Potato Chips', 
    price: 299, 
    oldPrice: 349, 
    rating: 4.3, 
    image: potatoChips,
    category: 'Snacks',
    subcategory: 'Chips',
    description: 'Classic salted potato chips',
    unit: '8 oz bag',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 59, 
    name: 'Granola Bars', 
    price: 300, 
    oldPrice: 470, 
    rating: 4.5, 
    image: granolaBars,
    category: 'Snacks',
    subcategory: 'Bars',
    description: 'Oats & honey granola bars',
    unit: '12-count box',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 60, 
    name: 'Mixed Nuts', 
    price: 500, 
    oldPrice: 600, 
    rating: 4.7, 
    image: mixedNuts,
    category: 'Snacks',
    subcategory: 'Nuts',
    description: 'Deluxe mixed nuts',
    unit: '16 oz can',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 61, 
    name: 'Popcorn', 
    price: 75, 
    oldPrice: 90, 
    rating: 4.2, 
    image: popcorn,
    category: 'Snacks',
    subcategory: 'Popcorn',
    description: 'Microwave popcorn',
    unit: '3-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 62, 
    name: 'Trail Mix', 
    price: 439, 
    oldPrice: 499, 
    rating: 4.4, 
    image: trailMix,
    category: 'Snacks',
    subcategory: 'Nuts',
    description: 'Energy trail mix with fruit & nuts',
    unit: '12 oz bag',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 63, 
    name: 'Pretzels', 
    price: 50, 
    oldPrice: 60, 
    rating: 4.1, 
    image: pretzels,
    category: 'Snacks',
    subcategory: 'Crackers',
    description: 'Salted pretzel twists',
    unit: '16 oz bag',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 64, 
    name: 'Chocolate Bars', 
    price: 45, 
    oldPrice: 70, 
    rating: 4.8, 
    image: chocolateBars,
    category: 'Snacks',
    subcategory: 'Candy',
    description: 'Milk chocolate bars',
    unit: '1.55 oz each',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 65, 
    name: 'Rice Cakes', 
    price: 75, 
    oldPrice: 90, 
    rating: 4.0, 
    image: riceCakes,
    category: 'Snacks',
    subcategory: 'Crackers',
    description: 'Light & crispy rice cakes',
    unit: '6-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 66, 
    name: 'Cheese Crackers', 
    price: 200, 
    oldPrice: 300, 
    rating: 4.3, 
    image: cheeseCrackers,
    category: 'Snacks',
    subcategory: 'Crackers',
    description: 'Cheese-filled sandwich crackers',
    unit: '12-pack',
    inStock: true,
    organic: false,
    freeShipping: false
  },
  { 
    id: 67, 
    name: 'Dried Fruit Mix', 
    price: 459, 
    oldPrice: 500, 
    rating: 4.6, 
    image: driedFruitMix,
    category: 'Snacks',
    subcategory: 'Fruit',
    description: 'Assorted dried fruit mix',
    unit: '12 oz bag',
    inStock: true,
    organic: true,
    freeShipping: false
  }
];

export const categories = [
  { id: 1, name: 'Fruits & Vegetables', image: null },
  { id: 2, name: 'Dairy & Eggs', image: null },
  { id: 3, name: 'Meat & Fish', image: null },
  { id: 4, name: 'Bakery', image: null },
  { id: 5, name: 'Beverages', image: null },
  { id: 6, name: 'Snacks', image: null },
];

export const deals = products.filter(product => product.discount);

export default products;