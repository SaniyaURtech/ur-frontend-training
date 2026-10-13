import { NextResponse } from "next/server";

type Product = {
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

const products: Product[] = [
  {
    id: "p1",
    name: "Shoes",
    sku: "SH-001",
    category: "footwear",
    price: 1999,
    stock: 10,
    description: "Comfortable everyday shoes",
    isActive: true,
    createdAt: "2026-10-13T10:00:00.000Z",
    updatedAt: "2026-10-13T10:00:00.000Z",
  },
  {
    id: "p2",
    name: "T-Shirt",
    sku: "TS-001",
    category: "clothing",
    price: 799,
    stock: 20,
    isActive: true,
    createdAt: "2026-10-13T10:00:00.000Z",
    updatedAt: "2026-10-13T10:00:00.000Z",
  },
];

export function GET() {
  return NextResponse.json({
    success: true,
    data: products,
    message: "Products loaded successfully",
  });
}
