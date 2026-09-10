import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ProblemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await api.get(`/problems/${id}`);

                setProblem(response.data);
            } catch (error) {
                console.error(error);

                setError("Failed to load problem.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id]);

    const startAttempt = async () => {
        try {
            setStarting(true);
            setError("");

            const response = await api.post("/attempts", {
                problemId: id
            });

            const attemptId = response.data.attempt._id;

            navigate(`/attempts/${attemptId}`);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to start attempt."
            );
        } finally {
            setStarting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading problem...
                </p>
            </div>
        );
    }

    if (error && !problem) {
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

            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => navigate("/problems")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Back to Problems
                </button>

                <div className="bg-white rounded-xl shadow-sm p-8">

                    <div className="flex justify-between items-start gap-4">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {problem.title}
                            </h1>

                            <p className="mt-4 text-gray-600 leading-7">
                                {problem.description}
                            </p>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            {problem.difficulty}
                        </span>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Requirements
                        </h2>

                        <ul className="mt-4 space-y-3">

                            {problem.requirements.map(
                                (requirement, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3 text-gray-700"
                                    >
                                        <span className="font-bold">
                                            {index + 1}.
                                        </span>

                                        <span>
                                            {requirement}
                                        </span>
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                    <div className="mt-10 p-5 bg-gray-50 rounded-lg">

                        <h2 className="font-semibold text-gray-800">
                            Your Task
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Think about the classes, responsibilities,
                            relationships, interfaces, and edge cases
                            required to solve this problem.
                        </p>

                    </div>

                    {error && (
                        <p className="mt-4 text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={startAttempt}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Start Practice
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProblemDetails;