type Product = {
  id: number;
  title: string;
  price: number;
};

const isProduct = (value: unknown): value is Product => {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "price" in value &&
    typeof value.price === "number"
  );
};

console.log(
  isProduct({ id: 1, title: "Shoes", price: 999 })
);

console.log(
  isProduct({ id: 1, title: 123, price: 999 })
);

console.log(
  isProduct(null)
);