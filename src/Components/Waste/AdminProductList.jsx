// import React, { useEffect, useState } from "react";

// const AdminProductList = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = () => {
//     const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
//     setProducts(storedProducts);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">
//         Product Listtttttttttttt
//       </h2>
//       {products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
//             >
//               <img
//                 className="w-full h-48 object-cover"
//                 src={product.image}
//                 alt={product.name}
//               />
//               <div className="p-4">
//                 <h4 className="text-xl font-semibold mb-2 text-gray-900">
//                   {product.name}
//                 </h4>
//                 <p className="text-gray-700 text-sm mb-2">
//                   Category: {product.Category || "N/A"}
//                 </p>
//                 <p className="text-green-600 font-bold">
//                   Price: ${parseFloat(product.price).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600 text-lg">No products added yet</p>
//       )}
//     </div>
//   );
// };

// export default AdminProductList;
