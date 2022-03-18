import React, { useState } from "react";
import ImageModel from "../../components/shared/Model";
import LazyImage from "./lazyImage";
function ImagesContainer({ images, lastImageElementRef }) {
  const [isImgModelOpen, setIsImgModelOpen] = useState({
    value: false,
    imgUrl: "",
  });
  return (
    <div className="grid grid-cols-3 gap-4 p-4 px-20">
      {images.map((photo, index) => {
        if (images.length === index + 1) {
          return (
            <div key={photo.id} ref={lastImageElementRef}>
              <LazyImage
                key={photo.id}
                thumb="https://i.imgur.com/67r0FdBm.jpg"
                width={photo.width_m}
                height={photo.height_m}
                url={photo.url_m}
                alt={photo.title}
                handleonClick={setIsImgModelOpen}
              />
            </div>
          );
        } else {
          return (
            <div key={photo.id}>
              <LazyImage
                key={photo.id}
                thumb="https://i.imgur.com/67r0FdBm.jpg"
                width={photo.width_m}
                height={photo.height_m}
                url={photo.url_m}
                alt={photo.title}
                handleonClick={setIsImgModelOpen}

              />
            </div>
          );
        }
      })}
      {isImgModelOpen.value && (
        <ImageModel
          modalIsOpen={isImgModelOpen}
          setIsOpen={setIsImgModelOpen}
        />
      )}
    </div>
  );
}

export default ImagesContainer;
