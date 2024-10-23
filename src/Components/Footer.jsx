import React, { useContext } from "react";
import Context from "./Context/Context";
import { UniqueCategory } from "./Pages/Category/getUniqueCategory";
import { Link } from "react-router-dom";

const Footer = () => {
  const { getProducts } = useContext(Context);
  const productsCategory = getProducts() || [];
  console.log(productsCategory, "papa");

  const Category = UniqueCategory(productsCategory);
  console.log(Category, "pop");

  return (
    <footer className="bg-black text-white py-12 px-6  ">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-5  ">
        {/* Categories */}
        <div>
          <h1 className="text-xl font-semibold text-green-400 mb-4">
            Categories
          </h1>
          <ul className="space-y-4 text-lg">
            {Category.map((category, index) => (
              <li key={index} className="hover:text-red-400">
                <Link
                  to={{
                    pathname: `/Dashboard/${category}`,
                  }}
                  state={{
                    CategoryName: category.toLowerCase(),
                  }}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h1 className="text-xl font-semibold text-green-400 mb-4">About</h1>
          <ul className="space-y-4 text-lg">
            <li>Careers</li>
            <li>Press & News</li>
            <li>Partnerships</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Investor Relations</li>
          </ul>
        </div>

        {/* Support & Education */}
        <div>
          <h1 className="text-xl font-semibold text-green-400 mb-4">
            Support & Education
          </h1>
          <ul className="space-y-4 text-lg">
            <li>Help & Support</li>
            <li>Trust & Safety</li>
            <li>Quality Guide</li>

            <li>Learn</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h1 className="text-xl font-semibold text-green-400 mb-4">
            Community
          </h1>
          <ul className="space-y-4 text-lg">
            <li>Success Stories</li>
            <li>Community Hub</li>
            <li>Invite Friends</li>
            <li>Seller Community</li>
          </ul>
        </div>

        {/* Business Solutions */}
        <div>
          <h1 className="text-xl font-semibold text-green-400 mb-4">
            Business Solutions
          </h1>
          <ul className="space-y-4 text-lg">
            <li>ClearVoice</li>
            <li>Content Marketing</li>
            <li>Contact Sales</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Ecommerce Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
