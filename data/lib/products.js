// 1. Search products by name or category
export function searchProducts(products, query) {
  const trimmedQuery = query.trim().toLowerCase();

  if (!trimmedQuery) {
    return products;
  }

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.category.toLowerCase().includes(trimmedQuery)
  );
}

// 2. Filter products by category
export function filterByCategory(products, category) {
  if (category.toLowerCase() === "all") {
    return products;
  }

  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

// 3. Sort products without mutating the original array
export function sortProducts(products, field, direction = "asc") {
  return [...products].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    if (field === "name") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (field === "createdAt") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    if (valueA < valueB) {
      return direction === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}

// 4. Get inventory summary
export function getInventorySummary(products) {
  return products.reduce(
    (summary, product) => {
      summary.totalProducts += 1;

      if (product.isActive) {
        summary.activeProducts += 1;
      }

      if (product.stock === 0) {
        summary.outOfStock += 1;
      }

      summary.totalStockValue += product.price * product.stock;

      return summary;
    },
    {
      totalProducts: 0,
      activeProducts: 0,
      outOfStock: 0,
      totalStockValue: 0,
    }
  );
}

// 5. Format price in Indian Rupees
export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

// 6. Fetch products from API
export async function fetchProducts() {
  const response = await fetch ("https://dummyjson.com/products-wrong");
  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data.products;
}
