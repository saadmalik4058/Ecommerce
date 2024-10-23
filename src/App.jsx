import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Rootlayout from "./Components/Rootlayout";
// import Products from "./Components/products";
import ProductsStore from "./Components/Products/ProductsStore";
import ProductCard from "./Components/Products/ProductCard";
import ProductList from "./Components/Products/ProductList";
import Admin from "./Components/Admin";
import ProductDetail from "./Components/Products/ProductDetail";
import ProtectedRoute from "./Components/ProtectedRoute";
import Search from "./Components/Pages/Search";
import EmptySearch from "./Components/Pages/EmptySearch";
import Category from "./Components/Pages/Category/Category";
import Properdetail from "./Components/Waste/Properdetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/Dashboard",
      element: (
        <ProtectedRoute>
          <Rootlayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <ProductList />,
        },
        // {
        //   path: "p/:id",
        //   element: <Properdetail />,
        // },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/Dashboard/admin",
          element: <Admin />,
        },
        {
          path: "/Dashboard/Search",
          element: <Search />,
        },
        {
          path: "/Dashboard/EmptySearch",
          element: <EmptySearch />,
        },
        { path: "/Dashboard/:CategoryName", element: <Category /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
