import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <div onClick={() => navigate('/')}>Hi, pokemon chosen: {id}</div>;
}

export default PokemonPage;
