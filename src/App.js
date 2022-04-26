import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Dados from './Pages/Dados';
import Clientes from './Pages/Clientes';
import Gallina from './Pages/Gallina';
import Azucar from './Pages/Azucar';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ="/" element= {<Home title="Implementación de Diagramas de Flujo"/>} />
        <Route exact path ="/dados" element= {<Dados title="Problema de Lanzamiento de Dados"/>} />
        <Route exact path ="/people" element= {<Clientes title="Problema de LLegada de Clientes"/>} />
        <Route exact path ="/gallina" element= {<Gallina title="Problema de Gallina Ponedora de Huevos"/>} />
        <Route exact path ="/azucar" element= {<Azucar title="Problema de la Agencia de Azúcar" />} />

      
      </Routes>
    </Router>

  );
}

export default App;
