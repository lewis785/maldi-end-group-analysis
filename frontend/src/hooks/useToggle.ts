import { useState } from 'react'

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [toggleState, setToggleState] = useState(initialState)

  const toggle = () => {
    setToggleState((value) => !value)
  }

  return [toggleState, toggle]
}
