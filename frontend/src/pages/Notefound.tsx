import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-4">This Page Note Found</p>

            <Link
                to="/home"
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg"
            >
                Go To Home Page
            </Link>
        </div>
    );
};

export default NotFound;
