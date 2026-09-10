# Mini LLD Evaluator

A small practice platform for Low-Level Design (LLD) interview preparation.

The platform allows a learner to:

1. Choose an LLD problem
2. Read the requirements
3. Create an attempt
4. Submit a design explanation
5. Receive structured evaluation
6. Review feedback
7. View previous attempts
8. Try the problem again

## Demo Problem

The current MVP contains:

**Design a Parking Lot**

The problem focuses on:

* Vehicle types
* Parking spots
* Parking and removal
* Responsibilities
* Interfaces and encapsulation
* Extensibility
* Edge cases
* Testability

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB

### Testing

* Jest
* Supertest

## Architecture

The project uses a modular monolith architecture.

```text
React Frontend
      ↓
Express REST API
      ↓
Controllers
      ↓
Services
      ↓
Evaluators
      ↓
MongoDB
```

Evaluation flow:

```text
Submission
    ↓
Evaluator Service
    ↓
Rule Evaluator
    ↓
Evaluation
    ↓
Feedback
```

The evaluator is intentionally separated from the controller so that AI-based or human evaluation can be added later.

## Project Structure

```text
mini-lld-evaluator/
│
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Problems.jsx
│       │   ├── ProblemDetails.jsx
│       │   ├── Attempt.jsx
│       │   ├── Evaluation.jsx
│       │   └── History.jsx
│       └── services/
│           └── api.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── evaluators/
│   │   ├── ruleEvaluator.js
│   │   └── ruleEvaluator.test.js
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── evaluatorService.js
│   │   └── evaluatorService.test.js
│   ├── seed.js
│   └── server.js
│
├── docs/
│   ├── RESEARCH_NOTE.md
│   └── DESIGN_NOTE.md
│
├── README.md
└── AI_USAGE.md
```

## Main Domain Objects

### Problem

Stores the LLD problem and its requirements.

### Attempt

Represents one learner attempt.

An attempt contains:

* Problem reference
* Submission
* Status
* Timestamps

### Evaluation

Stores the result of evaluating an attempt.

Each evaluation contains:

* Total score
* Maximum score
* Criterion-level results
* Evidence
* Concern
* Suggestion

## Evaluation Rubric

The current evaluator checks five areas:

1. Requirement Understanding
2. Responsibilities
3. Encapsulation & Interfaces
4. Extensibility
5. Edge Cases & Testability

The feedback is structured instead of returning only a numeric score.

```text
Criterion
    ↓
Score
    ↓
Evidence
    ↓
Concern
    ↓
Suggestion
```

## Attempt States

```text
Started
   ↓
Submitted
   ↓
Evaluating
   ↓
Completed
```

A future asynchronous evaluator can also transition an attempt to:

```text
Failed
```

## API Endpoints

### Problems

```text
GET /api/problems
GET /api/problems/:id
```

### Attempts

```text
GET  /api/attempts
POST /api/attempts
GET  /api/attempts/:id
POST /api/attempts/:id/submit
```

### Evaluations

```text
GET /api/evaluations/attempt/:attemptId
```

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd mini-lld-evaluator
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_lld_evaluator
```

Make sure MongoDB is running.

Seed the initial problem:

```bash
node seed.js
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Testing

Run backend tests:

```bash
cd server
npm test
```

The tests cover the evaluator behavior and evaluator service.

## Design Decisions

### Why a modular monolith?

The MVP is small and does not need distributed services. A modular monolith keeps deployment and development simple while maintaining clear boundaries.

### Why deterministic evaluation?

The first evaluator is predictable, explainable, and easy to test.

### Why text submission?

Text is the smallest sufficient submission format for demonstrating LLD reasoning without building a complex diagram editor or code execution system.

### Why separate attempts?

Every retry is stored as a separate attempt. This preserves history and allows learners to improve through repeated practice.

## Future Improvements

Possible future extensions include:

* More LLD problems
* Class diagram submissions
* Code submissions
* AI-powered evaluation
* Human review
* Comparison between attempts
* Asynchronous evaluation
* Authentication
* Learner progress tracking

The core domain model and evaluator boundary are designed to support these extensions without requiring a complete rewrite.

## Documentation

Additional design information is available in:

* `docs/RESEARCH_NOTE.md`
* `docs/DESIGN_NOTE.md`
