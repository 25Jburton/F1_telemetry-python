import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import SelectDropdowns from './SelectDropdowns'
import '../css/HeaderFooter.css';
import '../css/App.css';

function AppHome() {
  return (
    <div>
      <AppHeader />
      <div className="App">
        <main className='pb-5 mb-5'>
          <SelectDropdowns />
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

export default AppHome;
