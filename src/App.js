import './App.scss';
import { NavigationBar } from './navbar/navbar.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './AppRouter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronLeft, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClock, faTrashCan } from '@fortawesome/free-regular-svg-icons';


function App() {

  return (
    <div className="App">
      <NavigationBar />
      <AppRouter />
    </div>
  );
}

export default App;

library.add(
  faChevronDown, 
  faClock, 
  faMagnifyingGlass,
  faPlus,
  faChevronLeft,
  faTrashCan
);
