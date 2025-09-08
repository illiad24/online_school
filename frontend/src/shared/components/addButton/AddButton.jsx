
import { Link } from 'react-router';
import './AddButton.scss';

function AddButton({ text, handleClick }) {
    return (
        <Link className="add-button" to={handleClick}>
            {text}
        </Link>
    );
}

export default AddButton;