import './App.scss';
import { NavigationBar } from './navbar/navbar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './AppRouter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

library.add(faChevronDown, faClock);

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <AppRouter />
    </div>
  );
}

export default App;
