import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@radix-ui/themes/styles.css';
import H from "./Components/h";
import Drag from "./Components/Drag";
import Experiment from "./Components/experiment";
import L from "./Components/L";
import Tilt from "./Components/Tiilt";
import Mation from "./Components/mation";
import DoctorPage from "./Components/doctor";
import PatientPage from "./Components/patient";
import Input from "./Components/Input";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<H/>}/>
       <Route path="/t" element={<Tilt/>}/>
        <Route path="/m" element={<Mation />}/>
        <Route path="/doc" element={<DoctorPage/>}/>
        <Route path="/pat" element={<PatientPage />}/>
        <Route path="/vb" element={<Input />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

