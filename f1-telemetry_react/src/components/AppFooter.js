import '../css/HeaderFooter.css';

function AppFooter() {
  return (
    <footer className="App-footer mx-auto px-6 py-8">
        <div className="footer-content">
            © {new Date().getFullYear()} Application Name. All rights reserved.
        </div>
    </footer>
  );
}

export default AppFooter;
