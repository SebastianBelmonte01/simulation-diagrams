import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Dados from './Pages/Dados';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ="/" element= {<Home title="Implementación de Diagramas de Flujo"/>} />
        <Route exact path ="/dados" element= {<Dados />} />
      
      </Routes>
    </Router>

  );
}

export default App;
