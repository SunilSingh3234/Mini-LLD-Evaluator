const evaluateSubmission = (submission) => {
    const text = submission.toLowerCase();

    const results = [];

    // 1. Requirement Understanding
    const requirementKeywords = [
        "park",
        "vehicle",
        "spot",
        "remove"
    ];

    const requirementMatches = requirementKeywords.filter((keyword) =>
        text.includes(keyword)
    );

    const requirementScore = Math.min(
        10,
        Math.round((requirementMatches.length / requirementKeywords.length) * 10)
    );

    results.push({
        criterion: "Requirement Understanding",
        score: requirementScore,
        maxScore: 10,
        evidence:
            requirementMatches.length > 0
                ? `Submission mentions: ${requirementMatches.join(", ")}`
                : "Important parking lot requirements were not identified.",
        concern:
            requirementScore < 7
                ? "Some important requirements may be missing."
                : "",
        suggestion:
            requirementScore < 7
                ? "Clearly explain the main system requirements before describing classes."
                : "Good coverage of the main requirements."
    });

    // 2. Responsibilities
    const responsibilityKeywords = [
        "responsible",
        "manages",
        "handles",
        "responsibility"
    ];

    const responsibilityMatches = responsibilityKeywords.filter((keyword) =>
        text.includes(keyword)
    );

    const responsibilityScore = Math.min(
        10,
        responsibilityMatches.length * 3
    );

    results.push({
        criterion: "Responsibilities",
        score: responsibilityScore,
        maxScore: 10,
        evidence:
            responsibilityMatches.length > 0
                ? `Responsibility-related explanation found: ${responsibilityMatches.join(", ")}`
                : "Classes and their responsibilities are not clearly explained.",
        concern:
            responsibilityScore < 7
                ? "Class responsibilities are unclear or poorly defined."
                : "",
        suggestion:
            responsibilityScore < 7
                ? "Explain what each class is responsible for and avoid giving one class too many responsibilities."
                : "Responsibilities are reasonably clear."
    });

    // 3. Encapsulation / Interfaces
    const abstractionKeywords = [
        "interface",
        "abstract",
        "encapsulation",
        "private",
        "method"
    ];

    const abstractionMatches = abstractionKeywords.filter((keyword) =>
        text.includes(keyword)
    );

    const abstractionScore = Math.min(
        10,
        abstractionMatches.length * 2
    );

    results.push({
        criterion: "Encapsulation & Interfaces",
        score: abstractionScore,
        maxScore: 10,
        evidence:
            abstractionMatches.length > 0
                ? `Found design concepts: ${abstractionMatches.join(", ")}`
                : "No clear interface or encapsulation discussion was found.",
        concern:
            abstractionScore < 7
                ? "Limited discussion of interfaces or data encapsulation."
                : "",
        suggestion:
            abstractionScore < 7
                ? "Consider interfaces or encapsulation where they improve flexibility and reduce coupling."
                : "Good attention to abstraction and encapsulation."
    });

    // 4. Extensibility
    const extensibilityKeywords = [
        "car",
        "bike",
        "truck",
        "vehicle type",
        "extend",
        "extension"
    ];

    const extensibilityMatches = extensibilityKeywords.filter((keyword) =>
        text.includes(keyword)
    );

    const extensibilityScore = Math.min(
        10,
        extensibilityMatches.length * 2
    );

    results.push({
        criterion: "Extensibility",
        score: extensibilityScore,
        maxScore: 10,
        evidence:
            extensibilityMatches.length > 0
                ? `Extensibility-related concepts found: ${extensibilityMatches.join(", ")}`
                : "The design does not clearly explain how new vehicle types could be added.",
        concern:
            extensibilityScore < 7
                ? "Adding new vehicle types or extensions may require widespread code changes."
                : "",
        suggestion:
            extensibilityScore < 7
                ? "Explain how the design could support a new vehicle type without changing many existing classes."
                : "The design shows consideration for future extensions."
    });

    // 5. Edge Cases / Testability
    const edgeCaseKeywords = [
        "full",
        "available",
        "invalid",
        "error",
        "exception",
        "test",
        "edge case"
    ];

    const edgeCaseMatches = edgeCaseKeywords.filter((keyword) =>
        text.includes(keyword)
    );

    const edgeCaseScore = Math.min(
        10,
        edgeCaseMatches.length * 2
    );

    results.push({
        criterion: "Edge Cases & Testability",
        score: edgeCaseScore,
        maxScore: 10,
        evidence:
            edgeCaseMatches.length > 0
                ? `Potential edge-case/test concepts found: ${edgeCaseMatches.join(", ")}`
                : "Edge cases and testability are not clearly discussed.",
        concern:
            edgeCaseScore < 7
                ? "Error handling, invalid data, or full-state scenarios are missing."
                : "",
        suggestion:
            edgeCaseScore < 7
                ? "Discuss cases such as a full parking lot, unavailable spots, invalid vehicle data, and how the design can be tested."
                : "Good consideration of edge cases or testing."
    });

    // Total
    const totalScore = results.reduce(
        (total, item) => total + item.score,
        0
    );

    return {
        totalScore,
        maxScore: results.length * 10,
        results
    };
};
const evaluate = async (submission) => {
    return evaluateSubmission(submission);
};

module.exports = {
    evaluateSubmission,evaluate
};