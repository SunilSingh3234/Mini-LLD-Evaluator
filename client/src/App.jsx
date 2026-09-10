import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problems from "./pages/Problem";
import ProblemDetails from "./pages/ProblemDetails";
import Attempt from "./pages/Attempt";
import Evaluation from "./pages/Evaluation";
import History from "./pages/History";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/problems"
          element={<Problems />}
        />
        <Route
          path="/problems/:id"
          element={<ProblemDetails />}
        />
        <Route
          path="/attempts/:id"
          element={<Attempt />}
        />
        <Route
          path="/evaluations/attempt/:id"
          element={<Evaluation />}
        />
        <Route
    path="/history"
    element={<History />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;