import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import PaginationButtons from '../components/PaginationButtons';

import Spinner from '../assets/pokeball-loader.gif';
import PokedexTable from '../components/PokedexTable';

function PokedexPage({
  pokemonList,
  setPokemonList,
  currentPage,
  setCurrentPage,
  limitPage,
  setLimitPage,
}) {
  const perPage = 20;
  const dataFetched = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;

    if (pokemonList.length === 0) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${perPage}`)
        .then((res) => res.json())
        .then((data) => {
          Promise.all(
            data.results.map((item) =>
              fetch(item.url)
                .then((res) => res.json())
                .then((pokemon) =>
                  fetch(pokemon.species.url)
                    .then((res) => res.json())
                    .then((species) => getPokemonDTO(pokemon, species))
                )
            )
          ).then((pokemonData) => {
            setPokemonList(pokemonData);
            setLimitPage(Math.ceil(data.count / perPage));
            setLoading(false);
          });
        });
    } else setLoading(false);
  }, [pokemonList, setPokemonList, setLimitPage]);

  const getPokemonDTO = (pokemon, species) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      //height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t) => t.type.name),
      //cries: pokemon.cries.legacy,
      isBaby: species.is_baby,
      color: species.color.name,
      //evolutionChain...
    };
  };

  return (
    <Box sx={styles.container}>
      <h1>Pokédex</h1>
      {loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <PokedexTable pokemonList={pokemonList} />
          <PaginationButtons
            {...{ currentPage, setCurrentPage, limitPage, loading }}
          />
        </>
      )}
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    margin: '32px',
    h1: {
      font: '700 64px Lato',
      margin: 0,
    },
  },
};

export default PokedexPage;
