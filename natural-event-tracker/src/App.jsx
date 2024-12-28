import { useRef, useState } from 'react';
import Map from './components/Map';
import SearchBar from './components/Searchbar';
import HamburgerMenu from './components/HamburgerMenu';
import { Routes, Route } from 'react-router-dom';
import DonationPage from './components/DonationPage';


function App() {
  const [activeMenu, setActiveMenu] = useState(false);


  return (
    <>
      <SearchBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      <HamburgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      <Routes>
            <Route path="/" element={<><SearchBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                                       <HamburgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/></>} />
            {/* FIX: Not showing donation page */}
            <Route path="/donate" element={<DonationPage />} /> 
      </Routes>

    </>
  )
}

export default App
