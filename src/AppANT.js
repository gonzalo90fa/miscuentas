// import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import DatosPrincipales from './components/DatosPrincipales';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>¡Oh yhea!</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Navigation SMenu1= { ['Login 1', 'Register 1'] }></Navigation>
      <DatosPrincipales></DatosPrincipales>
    </div>
  );
}

export default App;
