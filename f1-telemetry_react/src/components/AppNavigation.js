// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './AppHome';
import AboutPage from './Page_About';

function AppNavigation() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path='/about' element={<AboutPage />} />
         </Routes>
      </>
   );
};
 
export default AppNavigation;