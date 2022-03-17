import React from "react";
import LazyImage from "./lazyImage";
function ImageContainer({ img }) {
  return (
    <>
      {/* <img src={img.url_m} alt={img.title} /> */}
      <LazyImage
        key={img.title}
        thumb="https://i.imgur.com/67r0FdBm.jpg"
        width={img.width_m}
        height={img.height_m}
        url={img.url_m}
        alt={img.title}
      />
    </>
  );
}

export default ImageContainer;
