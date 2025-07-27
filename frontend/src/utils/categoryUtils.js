
/**
 * Gets all parent categories from the categories list
 * @param {Array} allCategories - Array of all categories
 * @returns {Array} Array of parent categories with their subcategories
 */
export const getParentCategories = (allCategories) => {
  const parentNames = [...new Set(allCategories
    .map(c => c.parentCategory)
    .filter(name => name !== null && name !== undefined))];

  return parentNames.map(name => {
    const slug = name.toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-');
    
    
    return {
      id: `parent-${slug}`,
      name,
      slug,
      image: `/src/assets/images/products/${slug}.jpg`, 
      parentCategory: null,
      subcategories: allCategories.filter(c => c.parentCategory === name),
  isParent: true
};
  });
};

/**
 * @param {string} slug 
 * @param {Array} allCategories 
 * @returns {Object|null} 
 */
export const findCategoryBySlug = (slug, allCategories) => {
  const foundCategory = allCategories.find(c => c.slug === slug);
  if (foundCategory) return foundCategory;
  const parentCategories = getParentCategories(allCategories);
  return parentCategories.find(c => c.slug === slug) || null;
};

/**
 * Gets the full category hierarchy path for a category
 * @param {string} slug - The category slug
 * @param {Array} allCategories - Array of all categories
 * @returns {Array} Array of category objects in hierarchy order (parent to child)
 */
export const getCategoryHierarchy = (slug, allCategories) => {
  const category = findCategoryBySlug(slug, allCategories);
  if (!category) return [];

  const hierarchy = [];
  let currentCategory = category;

  // Work our way up the hierarchy
  while (currentCategory) {
    hierarchy.unshift(currentCategory);
    currentCategory = currentCategory.parentCategory 
      ? findCategoryBySlug(
          currentCategory.parentCategory.toLowerCase()
            .replace(/ & /g, '-')
            .replace(/\s+/g, '-'),
          allCategories
        )
      : null;
  }

  return hierarchy;
};

/**
 * Gets all subcategories for a given category slug
 * @param {string} slug - The category slug
 * @param {Array} allCategories - Array of all categories
 * @returns {Array} Array of subcategories
 */
export const getSubcategories = (slug, allCategories) => {
  const category = findCategoryBySlug(slug, allCategories);
  if (!category) return [];
  if (category.isParent || !category.parentCategory) {
    return category.subcategories || [];
  }

  // For child categories, return empty array or siblings if needed
  return [];
};