import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Products } from "../exports";

const Category = () => {
  const { data: allCategories } = useQuery("allCategories", () => {
    return axios.get("http://localhost:4000/stocks/add/category");
  });

  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryMenu, setActiveCategoryMenu] = useState(false);

  const { data: products } = useQuery(
    ["productsByCat", activeCategory],
    () => {
      return axios.get(
        `http://localhost:4000/stocks/category?q=${activeCategory}`
      );
    },
    {
      enabled: activeCategory ? true : false,
    }
  );

  function updateState(activeState) {
    setActiveCategory(activeState);
  }
  return (
    <div className="container mx-auto pt-20 mb-5">
      <div
        className={`drop-shadow-md flex justify-between items-center gap-4 rounded-md px-3 py-2 mobile-category-menu ${
          activeCategoryMenu && "active"
        }`}
      >
        {allCategories?.data.map((data) => (
          <p
            className={`hover:bg-slate-200 hover:text-orange cursor-pointer px-2 text-xl ${
              activeCategory === data.name ? "bg-slate-200 text-orange" : ""
            }`}
            key={data._id}
            onClick={() => updateState(data.name)}
          >
            {data.name}
          </p>
        ))}

        <div className="inline-flex justify-center items-center gap-2 border-2 rounded-md px-2 py-1 text-xl cursor-pointer hover:text-orange desktop-category-toggler">
          Categories
          <span>
            <HiOutlineMenuAlt2 />
          </span>
        </div>
      </div>
      <div
        className="justify-center items-center gap-2 mobile-category-toggler"
        onClick={() => setActiveCategoryMenu(!activeCategoryMenu)}
      >
        Categories
        <span className="text-xl">
          <HiOutlineMenuAlt2 />
        </span>
      </div>

      <div
        className={`${activeCategoryMenu ? "mt-32" : "mt-16"}
         `}
      >
        {products && (
          <Products
            text={"Get the latest cookie for a bite"}
            products={products.data}
            number={products.data.length}
          />
        )}
      </div>
    </div>
  );
};

export default Category;
