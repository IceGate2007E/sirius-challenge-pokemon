import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import PaginationButtons from '../components/PaginationButtons';

import Spinner from '../assets/pokeball-loader.gif';
import PokedexTable from '../components/PokedexTable';
import SearchFilters from '../components/SearchFilters';
import { colors, commonStyles } from '../utils/Common';
import axios from 'axios';
import { GridView, TableChart } from '@mui/icons-material';
import PokedexGrid from '../components/PokedexGrid';

function PokedexPage({
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
}) {
  const itemPerPage = 8;
  const dataFetched = useRef();
  const [loading, setLoading] = useState(true);
  const [pokeListFragment, setPokeListFragment] = useState([]);

  const [mounted, setMounted] = useState(false);

  const fetchNextPokemon = async (filter = [], offset, setValue) => {
    let tempList = [];
    let item = null;
    while (!item && offset + tempList < pokemonCount) {
      const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon/?limit=${itemPerPage}&offset=${
          offset + tempList.length
        }`
      );
      if (!data.results) break;
      for (const pokemonItem of data.results) {
        const pokemon = (await axios(pokemonItem.url)).data;
        const species = (await axios(pokemon.species.url)).data;
        const pokemonData = getPokemonDTO(pokemon, species);
        tempList.push(pokemonData);
        if (filter.length === 0) continue;
        if (filter.every((f) => f(pokemonData))) {
          item = pokemonData;
          break;
        }
      }
      if (filter.length === 0) break;
    }
    setValue((prev) => [...prev, ...tempList]);
  };

  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;

    if (pokemonList.length === 0) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${itemPerPage}`)
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
            setPokeListFragment(pokemonData);
            setPokemonCount(data.count);
            setLoading(false);
            setMounted(true);
          });
        });
    } else {
      const filterList = pokemonList.filter((item) =>
        filters.every((f) => f(item))
      );
      setPokeListFragment(
        filterList.slice(
          itemPerPage * currentPage,
          itemPerPage * (currentPage + 1)
        )
      );
      setLoading(false);
      setMounted(true);
    }
  }, []);

  const getPokemonDTO = (pokemon, species) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      weight: pokemon.weight,
      types: pokemon.types.map((t) => t.type.name),
      special: species.is_mythical
        ? 'mythical'
        : species.is_legendary
        ? 'legendary'
        : species.is_baby
        ? 'baby'
        : '',
      color: species.color.name,
    };
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSetFilters = (value) => {
    setCurrentPage(0);
    setFilters(value);
  };

  useEffect(() => {
    let filterList = pokemonList.filter((item) =>
      filters.every((filter) => filter(item))
    );
    console.log('FRAGMENT', filterList.length);
    setPokeListFragment(
      filterList.slice(
        currentPage * itemPerPage,
        (1 + currentPage) * itemPerPage
      )
    );
  }, [filters, pokemonList, currentPage]);

  useEffect(() => {
    if (
      pokeListFragment.length < itemPerPage &&
      pokemonList.length < pokemonCount &&
      mounted
    ) {
      fetchNextPokemon(filters, pokemonList.length, setPokemonList);
    }
  }, [pokeListFragment]);

  return (
    <Box sx={styles.container}>
      <Box sx={commonStyles.title}>POKÉDEX</Box>
      <Box sx={styles.views}>
        <Box
          className={tableView ? 'selected' : ''}
          onClick={() => setTableView(true)}
        >
          <TableChart /> Table View
        </Box>
        <Box
          className={tableView ? '' : 'selected'}
          onClick={() => setTableView(false)}
        >
          <GridView /> Grid View
        </Box>
      </Box>
      <SearchFilters setFilters={handleSetFilters} />
      {loading || pokeListFragment === null ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          {tableView ? (
            <PokedexTable pokemonList={pokeListFragment} />
          ) : (
            <PokedexGrid pokemonList={pokeListFragment} />
          )}
          {pokeListFragment.length < 8 && pokemonList.length < pokemonCount && (
            <img height='32px' src={Spinner} alt='spinner' />
          )}
          {pokeListFragment.length === 0 &&
            pokemonList.length === pokemonCount && (
              <span style={commonStyles.title}>
                No pokemons found for this search.
              </span>
            )}
          <PaginationButtons
            {...{ currentPage, loading }}
            setCurrentPage={handleChangePage}
            limitPage={Math.ceil(pokemonCount / itemPerPage)}
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
  },
  views: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    overflow: 'hidden',
    font: '500 16px Lato',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    div: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 20px',
      cursor: 'pointer',
      gap: '8px',
    },
    '& .selected': {
      backgroundColor: colors.primary,
      color: 'white',
      fontWeight: '700',
    },
  },
};

export default PokedexPage;
