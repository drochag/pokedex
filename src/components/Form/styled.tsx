import Input from '@mui/joy/Input';
import styled from '@emotion/styled';
import { Button } from '@mui/joy';
import { Theme } from "@mui/system";
import { Star, IconProps } from "@phosphor-icons/react"

export const StyledForm = styled('form')<{ theme?: Theme }>(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  ...{
    [theme?.breakpoints.down('md') || '']: {
      flexDirection: 'column',
    },
  }
}))

export const StyledStar = styled(({ onlyFavorites, ...props }: IconProps & { onlyFavorites?: boolean }) => <Star {...props} />)(({ onlyFavorites }) => ({
  marginLeft: 20,
  fill: onlyFavorites ? 'gold' : 'transparent',
  stroke: onlyFavorites ? 'gold' : 'var(--solitude)',
  strokeWidth: 2,
}))

export const StyledInput = styled(Input)<{ theme?: Theme }>(({ theme }) => ({
  background: 'var(--input)',
  color: 'var(--input-text)',
  border: 'none',
  padding: '0.65rem 1rem',
  ...{
    [theme?.breakpoints.down('md') || '']: {
      width: '100%',
    },
  }
}));

export const StyledButton = styled(Button)`
  background: var(--valhalla);
  color: var(--black-squeeze);
  padding: 0.5rem 0.85rem;
`

export const InputContainer = styled.div`
  position: relative;
  max-width: 20rem;
  display: flex;
  gap: 1rem;

`;