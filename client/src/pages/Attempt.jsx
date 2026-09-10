import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const Attempt = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [submission, setSubmission] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const response = await api.get(`/attempts/${id}`);

                setAttempt(response.data);

                setSubmission(response.data.submission || "");
            } catch (error) {
                console.error(error);

                setError("Failed to load attempt.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttempt();
    }, [id]);

    const handleSubmit = async () => {
        if (!submission.trim()) {
            setError("Please write your design before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const response = await api.post(
                `/attempts/${id}/submit`,
                {
                    submission
                }
            );

            const evaluationId = response.data.evaluation._id;

            navigate(`/evaluations/attempt/${id}`);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to submit design."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading attempt...
                </p>
            </div>
        );
    }

    if (error && !attempt) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Problem Section */}

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

                    <div className="flex justify-between items-start">

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {attempt.problem.title}
                            </h1>

                            <p className="mt-3 text-gray-600">
                                {attempt.problem.description}
                            </p>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            {attempt.problem.difficulty}
                        </span>

                    </div>

                    <div className="mt-6">

                        <h2 className="font-semibold text-gray-800">
                            Requirements
                        </h2>

                        <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">

                            {attempt.problem.requirements.map(
                                (requirement, index) => (
                                    <li key={index}>
                                        {requirement}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                </div>

                {/* Editor Section */}

                <div className="bg-white rounded-xl shadow-sm p-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Your LLD Design
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Explain your classes, responsibilities,
                        relationships, interfaces, and edge cases.
                    </p>

                    <textarea
                        value={submission}
                        onChange={(event) =>
                            setSubmission(event.target.value)
                        }
                        placeholder={`Example:

Classes:

Vehicle
- vehicleNumber
- vehicleType

ParkingSpot
- spotNumber
- vehicle

ParkingLot
- parkVehicle()
- removeVehicle()
- findAvailableSpot()

Relationships:
ParkingLot manages ParkingSpot.
ParkingSpot contains a Vehicle.`}
                        className="w-full  mt-6 p-4 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />

                    <div className="flex items-center justify-between mt-4">

                        <p className="text-sm text-gray-500">
                            {submission.length} characters
                        </p>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                        >
                            {submitting
                                ? "Evaluating..."
                                : "Submit Design"}
                        </button>

                    </div>

                    {error && (
                        <p className="mt-4 text-red-600">
                            {error}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Attempt;