
const DashboardShimmer = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-32 w-full rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-24 w-full rounded-lg"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardShimmer;
