const LoggedOutView = () => {
    return (
        <div className="text-white text-3xl text-center">
            You need to sign in to add and see notes
            <div className="mt-24 w-96 p-4 mx-auto rounded-lg shadow-lg overflow-hidden relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-b after:from-transparent after:to-white">
                <h1 className="text-3xl mb-3 font-bold underline">
                    Hello world!
                </h1>
                <p className="leading-snug">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default LoggedOutView;
