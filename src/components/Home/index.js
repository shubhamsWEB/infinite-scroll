import React, { useState } from "react";
import ImageModel from "../../components/shared/Model";
import LazyImage from "./lazyImage";
function ImagesContainer({ images, lastImageElementRef }) {
  const [isImgModelOpen, setIsImgModelOpen] = useState({
    value: false,
    imgUrl: "",
  });
  if(images.length>0) {
  return (
    <div className="grid sx:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sx:p-2 sm:p-3 md:p-4 px-5 md:px-50">
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
      } else {
        return <div><h1 className="text-center">No Images to show</h1></div>
      }
}

export default ImagesContainer;
