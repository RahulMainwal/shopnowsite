import React from "react";
import { NewProducts } from "../components/NewProducts";
import Products from "../components/Products";
// import WallpaperSlider from "../components/WallpaperSlider";
function Homepage() {
  window.scrollBy(0, 0);
  return (
    <div>
      {/* <WallpaperSlider /> */}
      <NewProducts />
      <Products />
    </div>
  );
}

export default Homepage;
