import {useState} from "react";

type Props = {
    value: string
}

export const EditableSpan = ({value}: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const turnOnEditMode = () => {setIsEditMode(true)}
    const turnOffEditMode = () => {setIsEditMode(false)}

    return (
            <>
                {isEditMode ? (
                    <input type="text" value={value} autoFocus onBlur={turnOffEditMode} />
                ) : (
                    <span onDoubleClick={turnOnEditMode}>{value}</span>
                )}
            </>
        );
};