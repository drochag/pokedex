import { useQuery } from "@tanstack/react-query"
import { RootContext } from "../../routes/root"
import { useContext } from "react"
import { Grid } from "@mui/joy"
import PokemonListItem from "../PokemonListItem"
import { pokemonClient } from "../../api"
import { NamedAPIResource } from "pokenode-ts"

const List = () => {
  const { currentPage, setCurrentPage, setPages } = useContext(RootContext)
  const { data } = useQuery({
    queryKey: ['pokemon', 'list', currentPage],
    queryFn: async () => {
      const response = await pokemonClient.listPokemons(Math.max((currentPage - 1) * 20, 0))
      setPages!(response.count)
      return response
    },
  })

  return <Grid container spacing={2} my={2}>
    {data?.results.map((pokemon: NamedAPIResource) => (
      <Grid xs={6} md={4} lg={3} key={pokemon.name}><PokemonListItem pokemon={pokemon} /></Grid>
    ))}
  </Grid>
}

export default List
