import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import '../css/HeaderFooter.css';
import '../css/App.css';

function AboutPage() {
  return (
    <div>
      <AppHeader />
      <div className="App">
        <main>
          Application About Application!
        </main>
      </div>
      <AppFooter />
    </div>
  );
}

export default AboutPage;
