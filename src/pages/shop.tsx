import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/Product";

const Shop: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from URL parameters
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch("/api/cars.json") // Assuming this path is accessible, adjust as needed
        .then((response) => response.json())
        .then((data) => {
          const foundProduct = data.find((item: Product) => item.id === id);
          setProduct(foundProduct);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.modelName} Shop</h1>
      <img
        src={product.imageUrl}
        alt={product.modelName}
        style={{ width: "100%", maxWidth: "800px" }}
      />
      <p>
        <strong>Model Name:</strong> {product.modelName}
      </p>
      <p>
        <strong>Body Type:</strong> {product.bodyType}
      </p>
      <p>
        <strong>Model Type:</strong> {product.modelType}
      </p>
      <p>
        <strong>Price:</strong> {product.bodyType}
      </p>
      {/* Add more details or shop options here */}
    </div>
  );
};

export default Shop;