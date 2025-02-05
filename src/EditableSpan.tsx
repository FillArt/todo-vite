import {useState} from "react";

type Props = {
    value: string
}

export const EditableSpan = ({value}: Props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const turnOnEditMode = () => {setIsEditMode(true)}

    return (
            <>
                {isEditMode ? (
                    <input type="text" value={value} autoFocus />
                ) : (
                    <span onDoubleClick={turnOnEditMode}>{value}</span>
                )}
            </>
        );
};