import { useQuery } from "@tanstack/react-query"
import { RootContext } from "../../routes/root"
import { useContext } from "react"
import { Grid } from "@mui/joy"
import PokemonListItem from "../PokemonListItem"
import { pokemonClient } from "../../api"
import { NamedAPIResource } from "pokenode-ts"
import { useFavoritePokemon } from "../../utils"

const List = () => {
  const { currentPage, setCurrentPage, setPages, onlyFavorites } = useContext(RootContext)
  const { favoritePokemon } = useFavoritePokemon()
  const { data } = useQuery({
    queryKey: ['pokemon', 'list', currentPage],
    queryFn: async () => {
      const response = await pokemonClient.listPokemons(Math.max((currentPage - 1) * 20, 0))
      setPages!(response.count)
      return response
    },
  })

  return <Grid container spacing={2} my={2}>
    {!onlyFavorites && data?.results.map((pokemon: NamedAPIResource) => (
      <Grid xs={6} md={4} lg={3} key={pokemon.name}><PokemonListItem pokemon={pokemon} /></Grid>
    ))}
    {onlyFavorites && !favoritePokemon.length && <p>There are no favorite Pokémon</p>}
    {onlyFavorites && favoritePokemon.map((pokemon: string) => (
      <Grid xs={6} md={4} lg={3} key={pokemon}><PokemonListItem pokemon={{ name: pokemon }} /></Grid>
    ))}
  </Grid>
}

export default List
