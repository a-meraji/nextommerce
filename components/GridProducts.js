export default function GridProducts({ products }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => {
        return (
          <div key={i} className={`relative w-full bg-third rounded-sm`}>
            <img
              className="w-full object-contain"
              src={product.store[0]["imgUrls"][0]}
            />
            <div className="absolute bottom-0 right-0 left-0 bg-hover text-secondary rounded-sm">
              <div className="flex justify-between px-4 text-lg">
                <p>{product.name.replace("_", " ")}</p>
                <p>{product.price}$</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
