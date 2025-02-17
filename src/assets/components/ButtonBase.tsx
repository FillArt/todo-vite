import Button from "@mui/material/Button"
import { ReactNode } from "react"

type ButtonBaseProps = {
  title?: string
  onClick: () => void
  className?: string
  children?: ReactNode
  style?: "contained" | "outlined" | "text"
  color?: "primary" | "secondary" | "error"
}

export const ButtonBase = ({ title, onClick, children, style = "contained", color = "primary" }: ButtonBaseProps) => {
  return (
    <Button color={color} variant={style} onClick={onClick} size={"small"}>
      {title ? title : null}
      {children ? children : null}
    </Button>
  )
}
