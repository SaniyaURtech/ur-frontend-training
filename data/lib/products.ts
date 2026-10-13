export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// 1. Search products by name or category
export function searchProducts(
  products: Product[],
  query: string
): Product[] {
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
export function filterByCategory(
  products: Product[],
  category: string
): Product[] {
  if (category.toLowerCase() === "all") {
    return products;
  }

  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

// 3. Sort products without mutating the original array
export function sortProducts(
  products: Product[],
  field: "name" | "price" | "stock" | "createdAt",
  direction: "asc" | "desc" = "asc"
): Product[] {
  return [...products].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    let comparison: number;

    if (field === "name") {
      comparison = String(valueA).localeCompare(String(valueB));
    } else if (field === "createdAt") {
      comparison =
        new Date(String(valueA)).getTime() -
        new Date(String(valueB)).getTime();
    } else {
      comparison = Number(valueA) - Number(valueB);
    }

    return direction === "asc" ? comparison : -comparison;
  });
}

// 4. Get inventory summary
export function getInventorySummary(products: Product[]): {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  totalStockValue: number;
} {
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
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

// 6. Fetch products from API
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("products" in data) ||
    !Array.isArray(data.products)
  ) {
    throw new Error("Invalid products API response");
  }

  const products: unknown[] = data.products;

  // Validate each product before returning it
  const validProducts = products.filter(isProduct);

  if (validProducts.length !== products.length) {
    throw new Error("API returned invalid product data");
  }

  return validProducts;
}

// 7. Type guard: validate unknown data as a Product
export function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.sku === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    typeof product.stock === "number" &&
    (product.description === undefined ||
      typeof product.description === "string") &&
    typeof product.isActive === "boolean" &&
    typeof product.createdAt === "string" &&
    typeof product.updatedAt === "string"
  );
}