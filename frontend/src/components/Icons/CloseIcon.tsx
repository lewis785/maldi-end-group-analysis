import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: rgba(23, 101, 115, 0.5);
  &:hover {
    color: rgba(23, 101, 115, 1);
  }
`

interface Props {
  onClick: () => void
}

export const CloseIcon = ({ onClick }: Props) => {
  return <StyledFontAwesomeIcon icon={faCircleXmark} onClick={onClick} />
}
