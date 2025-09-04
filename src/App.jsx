import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MonthlyPlanner from "./components/MonthlyPlanner";
import DailyPlanner from "./components/DailyPlanner";
import { CommonContext, CommonProvider } from "./context/CommonContext";
import { useContext } from "react";

// Create a separate component for the app content
function AppContent() {
  const { selectedDate } = useContext(CommonContext);
  console.log(selectedDate);

  return (
    <BrowserRouter>
      {/* Simple Navigation */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<MonthlyPlanner />} />
        <Route path="/:date" element={<DailyPlanner />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CommonProvider>
      <AppContent />
    </CommonProvider>
  );
}

export default App;
