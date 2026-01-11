export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.products;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);

  const data = await res.json();
  return data;
};