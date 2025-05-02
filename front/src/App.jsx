import { BrowserRouter as Router, Routes, Route } from "react-router";
import Insert from "./pages/crud/insert/Insert";
import Show from "./pages/crud/get/Show";
import Update from "./pages/crud/update/Update";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/insert" element={<Insert />}></Route>
          <Route path="/show" element={<Show />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
