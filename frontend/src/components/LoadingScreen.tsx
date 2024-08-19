const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-ironGray z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-mustard mb-4"></div>
            <p className="text-center text-2xl text-white px-4">
                This might take a while to load if the site is inactive for some
                time, please be patient.
            </p>
        </div>
    );
};

export default LoadingScreen;
