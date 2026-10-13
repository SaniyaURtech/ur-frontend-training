export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export function isProduct(value: unknown): value is Product {
  if (value === null || typeof value !== "object") {
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
    typeof product.isActive === "boolean" &&
    typeof product.createdAt === "string" &&
    typeof product.updatedAt === "string"
  );
}

console.log(
  isProduct({
    id: "p1",
    name: "Shoes",
    sku: "SH-001",
    category: "footwear",
    price: 999,
    stock: 10,
    isActive: true,
    createdAt: "2026-10-13",
    updatedAt: "2026-10-13",
  })
); // true

console.log(
  isProduct({
    id: "p2",
    name: 123,
    sku: "SH-002",
    category: "footwear",
    price: 999,
    stock: 10,
    isActive: true,
    createdAt: "2026-10-13",
    updatedAt: "2026-10-13",
  })
); // false

console.log(isProduct(null)); // false