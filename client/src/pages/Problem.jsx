import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await api.get("/problems");

                setProblems(response.data);
            } catch (error) {
                console.error(error);

                setError("Failed to load problems.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Loading problems...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">

            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        LLD Problems
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Choose a problem and start practicing.
                    </p>
                </div>

                <div className="grid gap-6">

                    {problems.map((problem) => (
                        <div
                            key={problem._id}
                            className="bg-white rounded-xl shadow-sm p-6"
                        >

                            <div className="flex justify-between items-start gap-4">

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {problem.title}
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        {problem.description}
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                    {problem.difficulty}
                                </span>

                            </div>

                            <div className="mt-5">

                                <h3 className="font-medium text-gray-700">
                                    Requirements
                                </h3>

                                <ul className="list-disc list-inside mt-2 text-gray-600">
                                    {problem.requirements.map(
                                        (requirement, index) => (
                                            <li key={index}>
                                                {requirement}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>

                            <Link
                                to={`/problems/${problem._id}`}
                                className="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Start Practice
                            </Link>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Problems;