import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import TimeOut from "./pages/TimeOut";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/" element={<TimeOut />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
