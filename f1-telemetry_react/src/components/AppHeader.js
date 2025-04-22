import logo from '../assets/logo.png';
import '../css/HeaderFooter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppHeader() {
  return (
    <header className='App-header'>
      <div className='nav-wrapper'>
        <img className='logo-img' alt='logo' src={logo} />
        <div className='nav-title'>
          Formula 1 Telemetry
        </div>
        <div className='nav-btns '>
          <a 
            href='/home'>
              <button
                type='button'
                className='btn btn-secondary btn-lg'
              >
                Home
              </button>
          </a>
          <a 
            href='/about'>
              <button
                type='button'
                className='btn btn-secondary btn-lg'
              >
                About
              </button>
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
