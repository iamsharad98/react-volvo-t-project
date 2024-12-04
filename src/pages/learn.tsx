import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/Product";

const Learn: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch("/api/cars.json")
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">Product not found</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {product.modelName} Details
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={product.imageUrl}
          alt={product.modelName}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="text-section space-y-4 w-full">
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Model Name:</strong>{" "}
            {product.modelName}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Body Type:</strong>{" "}
            {product.bodyType}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Model Type:</strong>{" "}
            {product.modelType}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-gray-700">Description:</strong>{" "}
            {product.bodyType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Learn;