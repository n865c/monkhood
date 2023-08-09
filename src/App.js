import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home';
import ViewFirebase from './components/ViewFirebase';
import ViewLocalStorage from './components/ViewLocalStorage';
import Editform from './components/Editform';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view2" element={<ViewFirebase />} />
        <Route path="/update/:id" element={<Home />} />
        <Route path="/view1" element={<ViewLocalStorage />} />
        <Route path='/updatefromLocal/:index' element={<Editform/>} />

      </Routes>
    </>
  );
}

export default App;
