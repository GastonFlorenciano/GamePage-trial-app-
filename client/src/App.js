import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import CreateGame from './Components/CreateGame';
import Detail from './Components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/create' component={CreateGame}/>
      <Route exact path='/videogame/:id' render={({ match }) => <Detail id={match.params.id} />}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
