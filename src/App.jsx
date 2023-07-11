import {useEffect,useState} from 'react'
import Wordle from './components/Wordle'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';

function App() {


  return (
    <div className="App">
      <h1>FindtheWord</h1>
      <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/*" element={<Wordle></Wordle> } />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </div>
  );
}

export default App

