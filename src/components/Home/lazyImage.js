import React, { useState, useRef } from "react";
import { useIntersection } from "../../hooks/useIntersectionObserver";
import "./lazyStyles.css";

const ImageRenderer = ({ url, thumb, width, height,handleonClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: "100%",
      }}
    >
      {isInView && (
        <>
          <img
            className={`image thumb ${isLoaded ? "isLoaded" : ""}`}
            src={url}
            alt=""
          />
          <img
            className={`image ${isLoaded ? "isLoaded" : ""}`}
            src={url}
            onLoad={handleOnLoad}
            alt=""
            onClick={()=> handleonClick({value:true,imgUrl:url})}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
