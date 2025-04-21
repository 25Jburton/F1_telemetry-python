import logo from '../assets/logo.svg';
import '../css/HeaderFooter.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppHeader() {
  return (
    <header className='App-header'>
      <div className='nav-wrapper'>
        <img className='logo-img' alt='logo' src={logo} />
        <div className='nav-title'>
          Application Name
        </div>
        <div className='nav-btns'>
          <a 
            href='/home'>
              <button
                type='button'
                className='btn btn-primary btn-lg'
              >
                Home
              </button>
          </a>
          <a 
            href='/about'>
              <button
                type='button'
                className='btn btn-primary btn-lg'
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
