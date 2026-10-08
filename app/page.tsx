import productsData from "../data/products.json";

type Product = {
  id: number | string;
  name: string;
  price: number;
  category?: string;
  stock?: number;
};

const products = productsData as Product[];

function formatPrice(price: number): string {
  return `$${Number(price).toFixed(2)}`;
}

function searchProducts(list: Product[], query: string): Product[] {
  const q = query.toLowerCase();
  return list.filter((p) => p.name.toLowerCase().includes(q));
}

function filterByCategory(list: Product[], category: string): Product[] {
  return list.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}

function sortByPrice(list: Product[]): Product[] {
  return [...list].sort((a, b) => a.price - b.price);
}

function getInventorySummary(list: Product[]) {
  const totalProducts = list.length;
  const totalStockValue = list.reduce(
    (sum, p) => sum + p.price * (p.stock ?? 0),
    0
  );
  return { totalProducts, totalStockValue };
}

export default function Home() {
  const inventorySummary = getInventorySummary(products);
  const searchedProducts = searchProducts(products, "shirt");
  const clothingProducts = filterByCategory(products, "clothing");
  const sortedProducts = sortByPrice(products);

  return (
    <main style={{ padding: 20 }}>
      <h1>Product Dashboard</h1>

      <h3>Inventory Summary</h3>
      <p>Total Products: {inventorySummary.totalProducts}</p>
      <p>
        Total Stock Value: {formatPrice(inventorySummary.totalStockValue)}
      </p>

      <hr />

      <h3>Search Results: Shirt</h3>
      {searchedProducts.map((product) => (
        <p key={product.id}>
          {product.name} - {formatPrice(product.price)}
        </p>
      ))}

      <hr />

      <h3>Clothing Products</h3>
      {clothingProducts.map((product) => (
        <p key={product.id}>
          {product.name} - {formatPrice(product.price)}
        </p>
      ))}

      <hr />

      <h3>Products Sorted By Price</h3>
      {sortedProducts.slice(0, 5).map((product) => (
        <p key={product.id}>
          {product.name} - {formatPrice(product.price)}
        </p>
      ))}
    </main>
  );
}