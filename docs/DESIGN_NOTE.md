# Design Note — Mini LLD Evaluator

## 1. Architecture

The application uses a modular monolith.

The main components are:

- React frontend
- Express backend
- MongoDB database
- Evaluator service

High-level flow:

Frontend
    ↓
REST API
    ↓
Controllers
    ↓
Domain Models / Services
    ↓
MongoDB

Submission evaluation:

Submission
    ↓
Evaluator Service
    ↓
Rule Evaluator
    ↓
Evaluation
    ↓
Feedback

---

## 2. Why a Modular Monolith?

A modular monolith was selected because the MVP does not require distributed services.

Advantages:

- Simple deployment
- Easy local development
- Low operational complexity
- Clear module boundaries
- Faster implementation

Microservices would add infrastructure and communication complexity without providing meaningful value for this MVP.

---

## 3. Main Domain Objects

### Problem

Represents an LLD problem.

Responsibilities:

- Store title
- Store problem description
- Store requirements
- Store difficulty

---

### Attempt

Represents one learner attempt at a problem.

Responsibilities:

- Reference the problem
- Store the learner's submission
- Track evaluation status
- Track timestamps

An Attempt is separate from a Problem because the same learner can attempt a problem multiple times.

---

### Evaluation

Represents the result of evaluating an Attempt.

Responsibilities:

- Store total score
- Store maximum score
- Store criterion-level results
- Store evidence
- Store concerns
- Store suggestions

---

## 4. Evaluator Design

The evaluator is separated into two layers.

### Evaluator Service

The service provides the main evaluation interface.

```text
evaluate(submission)