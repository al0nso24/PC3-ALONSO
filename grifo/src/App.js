import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App1 from './App1';
import App2 from './App2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App1></App1>}></Route>
        <Route path='/venta/:denei' element={<App2></App2>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
