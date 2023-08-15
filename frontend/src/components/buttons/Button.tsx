import styled from 'styled-components'

interface Props {
  onClickHandler: () => void
  children: React.ReactNode
  disabled?: boolean
}

const StyledButton = styled.button`
  padding: 0.5rem 2rem;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary.action};
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: #0085a2;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`

export const Button = ({
  onClickHandler,
  children,
  disabled = false,
}: Props) => {
  return (
    <StyledButton onClick={onClickHandler} disabled={disabled}>
      {children}
    </StyledButton>
  )
}
