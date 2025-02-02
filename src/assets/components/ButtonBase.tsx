
type ButtonBaseProps = {
    title: string,
    onClick: () => void
}

export const ButtonBase = ({ title, onClick }: ButtonBaseProps) => {
    return <button onClick={onClick}>{title}</button>;
};
