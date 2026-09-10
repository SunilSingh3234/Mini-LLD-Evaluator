import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const Evaluation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [evaluation, setEvaluation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await api.get(
                    `/evaluations/attempt/${id}`
                );

                setEvaluation(response.data);
            } catch (error) {
                console.error(error);

                setError("Failed to load evaluation.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluation();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading feedback...
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

    const percentage = Math.round(
        (evaluation.totalScore / evaluation.maxScore) * 100
    );

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Your Evaluation
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Review your LLD design and improve your solution.
                    </p>

                </div>

                {/* Score */}

                <div className="bg-white rounded-xl shadow-sm p-8 text-center mb-6">

                    <p className="text-gray-500">
                        Overall Score
                    </p>

                    <div className="mt-3">

                        <span className="text-5xl font-bold text-blue-600">
                            {evaluation.totalScore}
                        </span>

                        <span className="text-2xl text-gray-400">
                            {" "} / {evaluation.maxScore}
                        </span>

                    </div>

                    <p className="mt-3 text-gray-600">
                        {percentage}% overall performance
                    </p>

                </div>

                {/* Criteria */}

                <div className="space-y-6">

                    {evaluation.results.map((result, index) => {

                        const resultPercentage =
                            (result.score / result.maxScore) * 100;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >

                                <div className="flex justify-between items-center">

                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {result.criterion}
                                    </h2>

                                    <span className="font-semibold text-blue-600">
                                        {result.score}/{result.maxScore}
                                    </span>

                                </div>

                                {/* Progress Bar */}

                                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-blue-600"
                                        style={{
                                            width: `${resultPercentage}%`
                                        }}
                                    />

                                </div>

                                {/* Evidence */}

                                <div className="mt-5">

                                    <h3 className="font-medium text-gray-800">
                                        Evidence
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        {result.evidence}
                                    </p>

                                </div>

                                {/* Concern */}

                                {result.concern && (
                                    <div className="mt-5">

                                        <h3 className="font-medium text-gray-800">
                                            Concern
                                        </h3>

                                        <p className="mt-2 text-gray-600">
                                            {result.concern}
                                        </p>

                                    </div>
                                )}

                                {/* Suggestion */}

                                {result.suggestion && (
                                    <div className="mt-5">

                                        <h3 className="font-medium text-gray-800">
                                            Suggestion
                                        </h3>

                                        <p className="mt-2 text-gray-600">
                                            {result.suggestion}
                                        </p>

                                    </div>
                                )}

                            </div>
                        );
                    })}

                </div>

                {/* Actions */}

                <div className="flex justify-center gap-4 mt-8">

                    <button
                        onClick={() =>
                            navigate(`/problems/${evaluation.attempt.problem._id}`)
                        }
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/problems")}
                        className="px-6 py-3 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition"
                    >
                        Try Another Problem
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Evaluation;