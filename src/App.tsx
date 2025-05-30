import { Routes, Route } from "react-router-dom";
import TherapistList from "@/pages/TherapistList";
import TherapistProfile from "./pages/TherapistProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TherapistList />} />
        <Route path="/therapist/:id" element={<TherapistProfile />} />
      </Routes>
    </>
  );
}

export default App;
