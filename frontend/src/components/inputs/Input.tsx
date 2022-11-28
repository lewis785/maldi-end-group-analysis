import styled from 'styled-components'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 5pt 0.5pt rgb(211, 211, 211);
  background: rgb(255, 255, 255);

  &.error {
    outline: 1px solid red;
  }
`

export const Input = (props: Props) => {
  return <InputField {...props} />
}
