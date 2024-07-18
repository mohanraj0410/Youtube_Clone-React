import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import VideoPlayer from './pages/VideoPlayer/VideoPlayer';
import { useState } from 'react';
import SearchVideo from './pages/SearchVideo/SearchVideo';

function App() {
  const [sideBarToggle, setSideBarToggle] = useState(true)
  return (
    <div>
      <Navbar setSideBarToggle={setSideBarToggle} />
      <Routes>
        <Route path='/' element={<Home sideBarToggle={sideBarToggle} />}></Route>
        <Route path='/video/:categoryId/:videoId' element={<VideoPlayer />}></Route>
        <Route path='/video/:searchVideoId' element={<SearchVideo />}></Route>
      </Routes>
    </div>
  );
}

export default App;
