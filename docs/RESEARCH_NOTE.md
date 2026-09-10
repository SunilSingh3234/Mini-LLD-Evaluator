# Research Note — Mini LLD Evaluator

## 1. Problem Understanding

Low-Level Design (LLD) is easier to understand by practicing complete design problems rather than only reading theoretical explanations.

A learner may understand concepts such as:

- Classes
- Objects
- Interfaces
- Encapsulation
- SOLID principles
- Design patterns

but still struggle to determine:

- What classes should exist?
- What responsibility belongs to each class?
- How should classes communicate?
- Where should abstractions be introduced?
- How can the design handle future changes?
- What edge cases should be considered?

The main problem identified for this MVP is therefore:

> A learner needs a simple way to practice an LLD problem, submit a design, receive structured feedback, and try again.

---

## 2. Target Learner

The initial target learner is someone who:

- Is preparing for software engineering interviews.
- Knows basic object-oriented programming.
- Wants to practice LLD problems.
- Needs feedback on design decisions.
- Wants to improve through repeated attempts.

The MVP intentionally focuses on one learner workflow instead of building a large learning platform.

---

## 3. Learner Loop

The core learning loop is:

Choose Problem
→ Think / Design
→ Submit
→ Feedback
→ Review
→ Try Again

The product was designed around this loop because feedback is useful only if the learner can use it to improve the next attempt.

---

## 4. MVP Scope

The MVP includes:

1. Problem selection
2. Problem requirements
3. Design submission
4. Structured evaluation
5. Criterion-level feedback
6. Attempt history
7. Re-attempt flow

The first MVP contains one LLD problem:

> Design a Parking Lot

The goal is not to build many problems but to demonstrate the complete learning experience end-to-end.

---

## 5. Submission Format

The MVP uses text-based submissions.

A learner explains:

- Classes
- Responsibilities
- Relationships
- Interfaces
- Extensibility
- Edge cases
- Testing considerations

Text was selected because it is the smallest format that can demonstrate the learner's reasoning without requiring a complex diagram editor or code execution environment.

A future version could support:

- Class diagrams
- Code submissions
- Combined text + diagram submissions

without changing the core Attempt and Evaluation concepts significantly.

---

## 6. Evaluation Approach

The first implementation uses deterministic rule-based evaluation.

The evaluator checks whether the submission discusses important design concepts such as:

- Requirement understanding
- Responsibilities
- Encapsulation and interfaces
- Extensibility
- Edge cases and testability

Each criterion produces:

- Score
- Evidence
- Concern
- Suggestion

This provides predictable and explainable feedback.

---

## 7. AI Consideration

AI can provide deeper reasoning about:

- Class responsibilities
- Coupling and cohesion
- SOLID principles
- Design trade-offs
- Alternative designs
- Improvement suggestions

However, AI is not required for the basic MVP evaluation flow.

The architecture keeps the evaluator behind an evaluator service so an AI evaluator can be added later without rewriting the submission flow.

---

## 8. Key Product Decisions

### Decision 1 — Start with one problem

Instead of creating many LLD problems, the MVP uses one complete problem.

Reason:

A complete practice → evaluation → retry experience provides more learning value than a large list of incomplete features.

### Decision 2 — Text submission

Reason:

It is simple to implement and allows the learner to explain design decisions.

### Decision 3 — Structured feedback

Reason:

A single overall score does not tell the learner what to improve.

Criterion-level evidence and suggestions make the feedback actionable.

### Decision 4 — Store attempts separately

Each retry creates a new Attempt.

Reason:

This allows the learner to compare previous attempts and observe improvement.

### Decision 5 — Deterministic evaluation first

Reason:

Rule-based evaluation is predictable, easy to test, and explainable.

AI can be introduced later for deeper qualitative evaluation.

---

## 9. Research Conclusion

The MVP focuses on a narrow but complete learning experience:

> Practice → Submit → Receive Explainable Feedback → Review → Try Again

The architecture is intentionally simple so that more problems, submission formats, evaluators, and review mechanisms can be added later.