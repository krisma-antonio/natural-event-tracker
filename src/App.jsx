import { Routes, Route } from 'react-router-dom';
import DonationPage from './components/DonationPage';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import DisplayChart from './components/DisplayChart';

function App() {

  return (
    <>
      <Routes>
            <Route path="*" element={<NotFoundPage />} /> 
            <Route index element={<Home />} />
            <Route exact path="/donate" element={<DonationPage />} /> 
            <Route exact path="/chart" element={<DisplayChart />} /> 
      </Routes>

    </>
  )
}

export default App
