import { Star } from "@phosphor-icons/react"
import { StyledForm, InputContainer, StyledButton, StyledInput } from "./styled"
import { RootContext } from "../../routes/root"
import { useContext } from "react"

const Form = () => {
  const { onlyFavorites, setOnlyFavorites } = useContext(RootContext)
  return (
    <StyledForm>
      <InputContainer>
        <StyledInput variant="soft" placeholder="Name or Number" />
      </InputContainer>
      <StyledButton variant="soft" onClick={() => setOnlyFavorites && setOnlyFavorites(!onlyFavorites)}>
        Show Favorite Pokemons
        <Star weight="fill" size={32} style={{ marginLeft: 20, fill: onlyFavorites ? 'gold' : '' }} />
      </StyledButton>
    </StyledForm>
  )
}

export default Form
