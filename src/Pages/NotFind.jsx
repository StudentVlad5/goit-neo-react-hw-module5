import cantFind from '../Images/cantFind.jpg';
import {BackLink} from '../components/BackLink/BackLink';

const NotFound = () => {return (
<div className='notFind'>
        <h1>SORRY, Nothing find here</h1>
    <div className='notFind'>
        <img src={cantFind} alt="Nothing find" />
    </div>
        <BackLink to={"/"}>Back to Home</BackLink>
</div>
)}
export default NotFound