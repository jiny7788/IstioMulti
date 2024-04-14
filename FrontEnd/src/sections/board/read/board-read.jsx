import {useParams} from 'react-router-dom';

export default function BoardRead() {
    const { no } = useParams();
    return (
        <>
        {no}
        </>
    );
}