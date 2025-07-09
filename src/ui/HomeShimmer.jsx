
const HomeShimmer = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
            <div className="mt-2 bg-gray-300 h-4 w-3/4 rounded"></div>
            <div className="mt-2 bg-gray-300 h-4 w-1/2 rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default HomeShimmer;
