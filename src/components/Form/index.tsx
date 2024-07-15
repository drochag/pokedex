import { Star, IconProps } from "@phosphor-icons/react"
import { StyledForm, InputContainer, StyledButton, StyledInput } from "./styled"
import { useList } from "../../utils/stores"
import styled from "@emotion/styled"

const StyledStar = styled(({ onlyFavorites, ...props }: IconProps & { onlyFavorites?: boolean }) => <Star {...props} />)(({ onlyFavorites }) => ({
  marginLeft: 20,
  fill: onlyFavorites ? 'gold' : 'transparent',
  stroke: onlyFavorites ? 'gold' : 'var(--solitude)',
  strokeWidth: 2,
}))

const Form = () => {
  const { onlyFavorites, setOnlyFavorites } = useList()
  return (
    <StyledForm>
      <InputContainer>
        <StyledInput variant="soft" placeholder="Name or Number" />
      </InputContainer>
      <StyledButton variant="soft" onClick={() => setOnlyFavorites && setOnlyFavorites(!onlyFavorites)}>
        Show Favorite Pokemons
        <StyledStar weight="fill" size={32} onlyFavorites={onlyFavorites} />
      </StyledButton>
    </StyledForm>
  )
}

export default Form
