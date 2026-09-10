# AI Usage

AI tools were used as development and reasoning assistants during the implementation of this assignment.

The final architecture and implementation decisions were reviewed and adapted based on the requirements of the assignment.

## 1. Evaluator Architecture

### AI suggestion

Use a separate evaluator service so the controller does not directly depend on a specific evaluation implementation.

### Decision

Accepted.

### Why

This creates a clear boundary between submission handling and evaluation logic.

The current implementation uses:

```text
Attempt Controller
       ↓
Evaluator Service
       ↓
Rule Evaluator
```

This also allows a future AI evaluator to be introduced without changing the submission controller.

---

## 2. Deterministic Evaluation First

### AI suggestion

Start with a deterministic rule-based evaluator instead of making AI responsible for the complete score.

### Decision

Accepted.

### Why

A deterministic evaluator is:

* Predictable
* Explainable
* Easy to test
* Easy to debug

It also gives the MVP a working evaluation flow without depending on an external AI API.

A future AI evaluator can provide deeper qualitative feedback.

---

## 3. Structured Feedback

### AI suggestion

Do not return only an overall score. Store criterion-level evidence and improvement suggestions.

### Decision

Accepted.

### Why

An unexplained score is not very useful to a learner.

The evaluation therefore stores:

```text
Criterion
Score
Evidence
Concern
Suggestion
```

This makes the feedback actionable and explainable.

---

## 4. Separate Attempt from Evaluation

### AI suggestion

Model an Attempt and Evaluation as separate domain objects.

### Decision

Accepted.

### Why

An Attempt represents the learner's work, while an Evaluation represents the result of analyzing that work.

This separation also allows:

* Re-evaluation
* Multiple evaluator implementations
* Future human review
* Evaluation history

without changing the meaning of an Attempt.

---

## 5. Explicit Evaluation States

### AI suggestion

Use explicit states for the evaluation lifecycle:

```text
Started
Submitted
Evaluating
Completed
Failed
```

### Decision

Accepted.

### Why

Although the current evaluator is synchronous, evaluation may become slow if an AI model or external service is introduced.

Explicit states make it possible to move evaluation to an asynchronous workflow later.

The submission can be persisted before evaluation starts, reducing the risk of losing learner work.

---

## AI Decisions That Were Rejected

### Microservices

A more complex distributed architecture could have been used.

Rejected because the assignment's MVP does not require multiple independently deployed services. A modular monolith is simpler and sufficient.

### Large AI Feature Set

An AI chatbot or fully AI-generated evaluation system could have been added.

Rejected because it would increase implementation complexity without improving the core practice loop enough for the two-day assignment.

### Complex Diagram Editor

A graphical UML/class-diagram editor was considered as a possible submission format.

Rejected for the MVP because text submission is sufficient to demonstrate LLD reasoning and keeps the scope focused.

### Excessive Design Patterns

Adding Factory, Strategy, Repository, Observer, and other patterns everywhere was avoided.

Rejected because patterns should solve real design problems rather than being added only to demonstrate pattern knowledge.

## Final Principle

AI was used primarily to accelerate reasoning, explore implementation options, and review design choices.

The goal was not to maximize AI-generated functionality.

The final implementation prioritizes:

* Simple architecture
* Clear domain boundaries
* Explainable evaluation
* Useful feedback
* Testability
* Extensibility
* A complete end-to-end learner flow
