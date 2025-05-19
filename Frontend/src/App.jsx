// App.jsx
import { useState } from 'react';
import HeaderBar from './Components/HeaderBar.jsx';
import FooterBar from './Components/FooterBar.jsx';
import Home from './Pages/Home';
import Novedades from './Pages/Novedades';
import Consolas from './Pages/Consolas';
import PcGaming from './Pages/PcGaming';
import Perifericos from './Pages/Perifericos';
import Merchandising from './Pages/Merchandising';
import Coleccionables from './Pages/Coleccionables';
import Accesorios from './Pages/Accesorios';

function App() {
  // Estado para controlar qué página está activa
  const [activePage, setActivePage] = useState('home');

  // Función para renderizar la página activa
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'novedades':
        return <Novedades />;
      case 'consolas':
        return <Consolas />;
      case 'pcgaming':
        return <PcGaming />;
      case 'perifericos':
        return <Perifericos />;
      case 'merchandising':
        return <Merchandising />;
      case 'coleccionables':
        return <Coleccionables />;
      case 'accesorios':
        return <Accesorios />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <HeaderBar onPageChange={setActivePage} activePage={activePage} />
      <div className="min-h-screen">
        {renderActivePage()}
      </div>
      <FooterBar onPageChange={setActivePage} activePage={activePage} />
    </div>
  );
}

export default App;