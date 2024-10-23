import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  Category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Image file is required"),
});

function Addproducts({ onAdd, editProduct }) {
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (editProduct) {
      setEditMode(true);
      setValue("name", editProduct.name);
      setValue("Category", editProduct.Category);
      setValue("price", editProduct.price);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editProduct, setValue, reset]);

  function onSubmit(data) {
    const file = data.image[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64image = reader.result;

      const dataWithFile = {
        ...data,
        image: base64image,
      };
      onAdd(dataWithFile, editMode);
      reset();
    };
    reader.readAsDataURL(file);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {" "}
        {editMode ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Product Name */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Product Name"
          className={`w-full p-3 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Category"
          className={`w-full p-3 border ${
            errors.Category ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          {...register("Category")}
        />
        {errors.Category && (
          <p className="text-red-500 mt-1 text-sm">{errors.Category.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="w-full">
        <input
          type="number"
          placeholder="Price"
          className={`w-full p-3 border ${
            errors.price ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-red-500 mt-1 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="w-full">
        <input
          type="file"
          className={`w-full p-3 border ${
            errors.image ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          {...register("image")}
        />
        {errors.image && (
          <p className="text-red-500 mt-1 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
      >
        {editMode ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default Addproducts;
