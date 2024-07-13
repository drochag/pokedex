import { SlidersHorizontal } from "@phosphor-icons/react"
import { StyledForm, InputContainer, StyledButton, StyledInput } from "./styled"

const Form = () => {
  return (
    <StyledForm>
      <InputContainer>
        <StyledInput variant="soft" placeholder="Name or Number" />
      </InputContainer>
      <StyledButton variant="soft" color="primary">
        <SlidersHorizontal size={32} />
      </StyledButton>
    </StyledForm>
  )
}

export default Form
