import Input from '@mui/joy/Input';
import styled from '@emotion/styled';
import { Button } from '@mui/joy';

export const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
`

export const StyledInput = styled(Input)`
  background: var(--input);
  color: var(--input-text);
  border: none;
  padding: 0.65rem 1rem;
`;

export const StyledButton = styled(Button)`
  background: var(--valhalla);
  color: var(--black-squeeze);
  padding: 0.5rem 0.85rem;
`

export const InputContainer = styled.div`
  position: relative;
  max-width: 20rem;
`;