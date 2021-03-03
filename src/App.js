import './App.css';
import Header from './component/Header';
import RepoList from './component/RepoList'
import AddRepo from './component/AddRepo'

import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
        <Route path="/" exact={true} component={RepoList} />
        <Route exact path="/add-repo" component={AddRepo} /> 
    </Router>
    
  );
}

export default App;
