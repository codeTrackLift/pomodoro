import '../Styles/AppLogo.css';
import '../Styles/App.css';
import logo from '../Media/logo.svg';
import Pomodoro from './Pomodoro';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Pomodoro />
      </header>
      <Footer />
    </div>
  );
}

export default App;
