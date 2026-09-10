import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto px-6 py-20">

                <div className="text-center">

                    <h1 className="text-5xl font-bold text-gray-800">
                        Mini LLD Evaluator
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Practice Low-Level Design problems, submit your
                        solution, and receive structured feedback.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                        <Link
                            to="/problems"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Start Practicing
                        </Link>

                        <Link
                            to="/history"
                            className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            View History
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Home;