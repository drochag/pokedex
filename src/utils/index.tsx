import { PokemonSprites } from "pokenode-ts";
import { useEffect, useState } from "react";

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getImageFromSprites = (sprites: PokemonSprites): string => sprites.other?.dream_world.front_default ??
  sprites.other?.['official-artwork'].front_default ?? sprites.front_default!;

const getFavoritePokemon = (): string[] => {
  const favoritePokemon = localStorage.getItem('favoritePokemon')
  return favoritePokemon ? JSON.parse(favoritePokemon) : []
}

export const useFavoritePokemon = () => {
  const [favoritePokemon, setFavoritePokemon] = useState(getFavoritePokemon())

  useEffect(() => {
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon))
  }, [favoritePokemon])

  return { favoritePokemon, setFavoritePokemon }
}