import './App.css';
import CreateNewRepo from './components/createNewRepo';
import Profile from './components/profile';
import Repository from './components/repository';


function App() {
  return (
    <div className="container">
      <Profile />
      <CreateNewRepo />
      <Repository />
    </div>
  );
}

export default App;
