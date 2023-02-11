import React from "react";

const WallpaperSlider = () => {
  const array = [
    // "https://res.cloudinary.com/shopnow-image-cloudinary/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672900516/shopnowProducts/slider_image_3_ywh6ze.jpg",
    "https://res.cloudinary.com/shopnow-image-cloudinary/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672900520/shopnowProducts/slider_image_1_mejhrh.jpg",
    // "https://res.cloudinary.com/shopnow-image-cloudinary/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672900570/shopnowProducts/slider_image_4_pryi42.jpg",
    "https://res.cloudinary.com/shopnow-image-cloudinary/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672900516/shopnowProducts/slider_image_5_bpketi.jpg"
  ];

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-mdb-ride="carousel"
      style={{
        width: "atuo",
        margin: "15px"
      }}
    >
      <div className="carousel-inner">
        {array.map((x, i) => (
          <div
            key={i}
            className={i === 0 ? "carousel-item active" : "carousel-item"}
            data-mdb-interval={3000}
          >
            <img src={x} className="d-block w-100" alt="Wild Landscape" />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        data-mdb-target="#carouselExampleInterval"
        type="button"
        data-mdb-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        data-mdb-target="#carouselExampleInterval"
        type="button"
        data-mdb-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default WallpaperSlider;
