import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import 'atropos/css';
import '@fontsource/lato';

import PokedexPage from './pages/PokedexPage';
import PokemonPage from './pages/PokemonPage';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [filters, setFilters] = useState([]);
  const [tableView, setTableView] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PokedexPage
              {...{
                pokemonList,
                setPokemonList,
                currentPage,
                setCurrentPage,
                pokemonCount,
                setPokemonCount,
                filters,
                setFilters,
                tableView,
                setTableView,
              }}
            />
          }
        />
        <Route path='/pokemon/:id' element={<PokemonPage />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
