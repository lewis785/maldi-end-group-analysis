import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  height: 1rem;
  width: 1rem;
`

export const ArrowDownIcon = () => {
  return <StyledFontAwesomeIcon icon={faChevronDown} />
}
