import React from "react";
import Image from "./imageContainer";
function ImagesContainer({ images, lastImageElementRef }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 px-20">
      {images.map((photo, index) => {
        if (images.length === index + 1) {
          return (
            <div key={photo.id} ref={lastImageElementRef}>
              <Image img={photo}/>
            </div>
          );
        } else {
          return (
            <div key={photo.id}>
              <Image img={photo}/>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ImagesContainer;
