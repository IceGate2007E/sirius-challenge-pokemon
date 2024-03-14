import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import '@fontsource/lato';

import PokedexPage from './pages/PokedexPage';
import PokemonPage from './pages/PokemonPage';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [limitPage, setLimitPage] = useState(0);

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
                limitPage,
                setLimitPage,
              }}
            />
          }
        />
        <Route path='/:id' element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
