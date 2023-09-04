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
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.button.text};
  font-size: ${({ theme }) => theme.font.size.rg};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.button.hover};
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
