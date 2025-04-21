import logo from '../assets/logo.svg';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import '../css/HeaderFooter.css';
import '../css/App.css';

function AppHome() {
  return (
    <div>
      <AppHeader />
      <div className="App">
        <main>
          Application Dashboard!
          <img src={logo} className="App-logo" alt="logo" />
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

export default AppHome;
