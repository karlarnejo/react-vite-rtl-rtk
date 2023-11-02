import { useDispatch } from "react-redux";
import { SampleComponent, SampleComponentWithProps } from "../../components";
import { useNavigate } from 'react-router-dom'
import { setFirstObject } from "../../store/SampleSlice";

export const FSample: React.FC = (): React.JSX.Element => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSampleComponentOnClick = () => {
        dispatch(setFirstObject("Updated inner object"))
        navigate('/')
    }

    return (
        <>
            <p>This is a sample feature</p>
            <SampleComponentWithProps btnOnClick={handleSampleComponentOnClick}/>
            <SampleComponent/>
        </>
    );
}