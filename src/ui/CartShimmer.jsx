
const CartShimmer = () => {
  return (
    <div className="p-4 space-y-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 animate-pulse"
          >
            <div className="bg-gray-300 h-20 w-20 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
            </div>
            <div className="bg-gray-300 h-4 w-12 rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default CartShimmer;
