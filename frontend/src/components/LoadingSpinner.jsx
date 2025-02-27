const LoadingSpinner = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
