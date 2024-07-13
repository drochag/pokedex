import styled from "@emotion/styled"
import { capitalize } from "../../utils"

const StyledTypeBullet = styled.div<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: capitalize;
  color: var(--solitude);
  background: var(--type-${props => props.type});
`

interface TypeBulletProps {
  type: string
}

const TypeBullet = ({ type }: TypeBulletProps) => {
  return (
    <StyledTypeBullet type={type}>
      {capitalize(type)}
    </StyledTypeBullet>
  )
}

export default TypeBullet
