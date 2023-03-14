import styled from 'styled-components'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = styled.input`
  padding: 0.5rem;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: rgb(255, 255, 255);
  min-width: 0;

  &.error {
    outline: 1px solid red;
  }
`

export const Input = (props: Props) => {
  return <InputField {...props} />
}
