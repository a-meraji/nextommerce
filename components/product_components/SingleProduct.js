import React from "react";
// product images component
import ImageSelectore from "./ImagesSecelctor";
// selece color size and add to cart component
import ColorSizeSelector from "./ColorSizeSolector";

function SingleProduct({ product }) {
  const { name, price, store, description } = product;

  // take out all image urls from store and push into images[]
  var images = [];
  store.forEach((color) => {
    color["imgUrls"].forEach((url) => images.push(url));
  });

  return (
    <div className="grid gridy">
      {/* column 1 */}
      <ImageSelectore name={name} price={price} images={images} />
      {/* column 2 */}
      <ColorSizeSelector
        store={store}
        description={description}
        name={name}
        price={price}
        img={images[0]}
      />
      <style jsx>{`
        @media screen and (min-width: 1024px) {
          .gridy {
            grid-template-columns: 65vw 35vw;
          }
        }
      `}</style>
    </div>
  );
}

export default SingleProduct;
