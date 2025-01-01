import { useState } from 'react';
import SearchBar from './Searchbar';
import HamburgerMenu from './HamburgerMenu';


const Home = () => {
    const [activeMenu, setActiveMenu] = useState(false);
  
  
    return (
      <>
        <SearchBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
        <HamburgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      </>
    )
}

  export default Home