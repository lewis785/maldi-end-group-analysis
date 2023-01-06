import { ArrowDownIcon, ArrowRightIcon } from './Icons'

interface Props {
  isOpen: boolean
}

export const OpenToggle = ({ isOpen }: Props) => {
  return (
    <>
      {isOpen && <ArrowDownIcon />}
      {!isOpen && <ArrowRightIcon />}
    </>
  )
}
