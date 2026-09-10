import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const History = () => {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const response = await api.get("/attempts");

                setAttempts(response.data);
            } catch (error) {
                console.error(error);

                setError("Failed to load attempt history.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttempts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading history...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-5xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Attempt History
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Review your previous LLD practice attempts.
                    </p>

                </div>

                {error && (
                    <p className="text-red-600 mb-6">
                        {error}
                    </p>
                )}

                {attempts.length === 0 ? (

                    <div className="bg-white rounded-xl p-8 text-center shadow-sm">

                        <h2 className="text-xl font-semibold text-gray-800">
                            No attempts yet
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Start practicing an LLD problem to see your
                            attempts here.
                        </p>

                        <Link
                            to="/problems"
                            className="inline-block mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Browse Problems
                        </Link>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {attempts.map((attempt) => (

                            <div
                                key={attempt._id}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >

                                <div className="flex justify-between items-start gap-4">

                                    <div>

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {attempt.problem?.title ||
                                                "Unknown Problem"}
                                        </h2>

                                        <p className="mt-2 text-gray-500 text-sm">
                                            {new Date(
                                                attempt.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            attempt.status === "Evaluated"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {attempt.status}
                                    </span>

                                </div>

                                <div className="mt-5 flex gap-3">

                                    {attempt.status === "Evaluated" && (
                                        <Link
                                            to={`/evaluations/attempt/${attempt._id}`}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            View Feedback
                                        </Link>
                                    )}

                                    <Link
                                        to={`/attempts/${attempt._id}`}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        View Attempt
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default History;