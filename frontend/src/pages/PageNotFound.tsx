import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <section className="bg-slate-600">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-teal-500 ">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-300 md:text-4xl">
                        Something's missing.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-400 ">
                        Sorry, we can't find that page. You'll find lots to
                        explore on the home page.{' '}
                    </p>
                    <Link
                        to="/"
                        className="inline-flex text-gray-200 bg-teal-700 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;
