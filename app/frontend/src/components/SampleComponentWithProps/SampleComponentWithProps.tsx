export interface ISampleComponentWithProps {
    btnOnClick:  React.MouseEventHandler<HTMLButtonElement>
}

export const SampleComponentWithProps: React.FC<ISampleComponentWithProps> = ({ btnOnClick }: ISampleComponentWithProps): React.JSX.Element => {
    return (
        <>
            <p>This is a sample component with props</p>
            <button onClick={btnOnClick}>Hard Coded Button</button>
        </>
    );
}