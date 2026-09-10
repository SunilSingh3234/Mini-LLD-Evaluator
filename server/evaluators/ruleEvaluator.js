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

    const requirementMatches = requirementKeywords.filter(
        (keyword) => text.includes(keyword)
    );

    const requirementScore = Math.min(
        10,
        requirementMatches.length * 2.5
    );

    results.push({
        criterion: "Requirement Understanding",
        score: requirementScore,
        maxScore: 10,
        evidence:
            requirementMatches.length > 0
                ? `Your design mentions: ${requirementMatches.join(", ")}.`
                : "The submission does not clearly mention the main parking lot requirements.",
        concern:
            requirementScore < 10
                ? "Some important requirements may be missing."
                : "",
        suggestion:
            requirementScore < 10
                ? "Explicitly address parking, removing vehicles, parking spots, and vehicle handling."
                : ""
    });

    // 2. Responsibilities
    const responsibilityKeywords = [
        "responsible",
        "manages",
        "handles",
        "responsibility"
    ];

    const responsibilityMatches =
        responsibilityKeywords.filter(
            (keyword) => text.includes(keyword)
        );

    const responsibilityScore = Math.min(
        10,
        responsibilityMatches.length * 2.5
    );

    results.push({
        criterion: "Responsibilities",
        score: responsibilityScore,
        maxScore: 10,
        evidence:
            responsibilityMatches.length > 0
                ? "Your design describes responsibilities for some components."
                : "Clear class responsibilities were not identified.",
        concern:
            responsibilityScore < 10
                ? "Some class responsibilities could be explained more clearly."
                : "",
        suggestion:
            responsibilityScore < 10
                ? "Explain exactly what each class is responsible for."
                : ""
    });

    // 3. Encapsulation & Interfaces
    const encapsulationKeywords = [
        "interface",
        "abstract",
        "encapsulation",
        "private",
        "method"
    ];

    const encapsulationMatches =
        encapsulationKeywords.filter(
            (keyword) => text.includes(keyword)
        );

    const encapsulationScore = Math.min(
        10,
        encapsulationMatches.length * 2
    );

    results.push({
        criterion: "Encapsulation & Interfaces",
        score: encapsulationScore,
        maxScore: 10,
        evidence:
            encapsulationMatches.length > 0
                ? `Your design mentions concepts such as ${encapsulationMatches.join(", ")}.`
                : "No clear interface or encapsulation approach was identified.",
        concern:
            encapsulationScore < 10
                ? "The design could explain object boundaries and interfaces more clearly."
                : "",
        suggestion:
            encapsulationScore < 10
                ? "Describe which data should be private and which behaviours should be exposed."
                : ""
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

    const extensibilityMatches =
        extensibilityKeywords.filter(
            (keyword) => text.includes(keyword)
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
                ? `Your design considers extensibility through: ${extensibilityMatches.join(", ")}.`
                : "The design does not clearly explain how new vehicle types could be added.",
        concern:
            extensibilityScore < 10
                ? "Future changes may require modifying existing classes."
                : "",
        suggestion:
            extensibilityScore < 10
                ? "Explain how another vehicle type could be introduced with minimal changes."
                : ""
    });

    // 5. Edge Cases & Testability
    const edgeCaseKeywords = [
        "full",
        "available",
        "invalid",
        "error",
        "exception",
        "test",
        "edge case"
    ];

    const edgeCaseMatches =
        edgeCaseKeywords.filter(
            (keyword) => text.includes(keyword)
        );

    const edgeCaseScore = Math.min(
        10,
        edgeCaseMatches.length * 1.5
    );

    results.push({
        criterion: "Edge Cases & Testability",
        score: Math.min(10, edgeCaseScore),
        maxScore: 10,
        evidence:
            edgeCaseMatches.length > 0
                ? `Your submission considers: ${edgeCaseMatches.join(", ")}.`
                : "No clear edge cases or testing strategy was identified.",
        concern:
            edgeCaseScore < 10
                ? "More edge cases and test scenarios should be considered."
                : "",
        suggestion:
            edgeCaseScore < 10
                ? "Consider a full parking lot, invalid vehicle data, unavailable spots, and removal errors."
                : ""
    });

    const totalScore = results.reduce(
        (total, result) => total + result.score,
        0
    );

    const maxScore = results.reduce(
        (total, result) => total + result.maxScore,
        0
    );

    return {
        totalScore,
        maxScore,
        results
    };
};

module.exports = {
    evaluateSubmission
};