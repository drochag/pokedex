import { Star, IconProps } from "@phosphor-icons/react"
import { StyledForm, InputContainer, StyledButton, StyledInput } from "./styled"
import { useList } from "../../utils/stores"
import styled from "@emotion/styled"
import { useState } from "react"
import { useDebouncedEffect } from "../../utils/hooks"
import { getPokemon } from "../../api"
import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const StyledStar = styled(({ onlyFavorites, ...props }: IconProps & { onlyFavorites?: boolean }) => <Star {...props} />)(({ onlyFavorites }) => ({
  marginLeft: 20,
  fill: onlyFavorites ? 'gold' : 'transparent',
  stroke: onlyFavorites ? 'gold' : 'var(--solitude)',
  strokeWidth: 2,
}))

const Form = () => {
  const { onlyFavorites, setOnlyFavorites } = useList()
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useDebouncedEffect(async () => {
    if (!value) return
    try {
      const result = await getPokemon({ name: value, id: value as unknown as number })
      queryClient.setQueryData(['pokemon', value], result)
      navigate(`/pokemon/${result.id}`)
    } catch (e) {
      console.error(e)
      setHasError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value], 2000)

  return (
    <StyledForm>
      <Modal open={hasError} onClose={() => setHasError(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography level="body-lg" fontWeight={800}>Not Found</Typography>
          <span>There's no Pokémon named <b style={{ display: 'inline' }}>{value}</b> or with the number <b style={{ display: 'inline' }}>{value}</b>. Try again with another name or number.</span>
        </ModalDialog>
      </Modal>

      <InputContainer>
        <StyledInput variant="soft" placeholder="Name or Number" value={value} onChange={(e) => setValue(e.target.value.toLocaleLowerCase())} />
      </InputContainer>
      <StyledButton variant="soft" onClick={() => setOnlyFavorites && setOnlyFavorites(!onlyFavorites)}>
        Show Favorite Pokemons
        <StyledStar weight="fill" size={32} onlyFavorites={onlyFavorites} />
      </StyledButton>
    </StyledForm>
  )
}

export default Form
