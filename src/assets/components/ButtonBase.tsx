
type ButtonBaseProps = {
    title: string,
    onClick: () => void
    className?: string
}

export const ButtonBase = ({ title, onClick, className }: ButtonBaseProps) => {
    return <button className={className} onClick={onClick}>{title}</button>;
};
