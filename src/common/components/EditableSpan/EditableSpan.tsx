import { useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }
  const turnOffEditMode = () => {
    onChange(title)
    setIsEditMode(false)
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          label="Outlined"
          value={title}
          size={"small"}
          onChange={(e) => setTitle(e.currentTarget.value)}
          autoFocus
          onBlur={turnOffEditMode}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
