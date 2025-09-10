
import { Link } from 'react-router';
import './AddButton.scss';

function AddButton({ text, handleClick, type = 'link' }) {
    if (type === 'link') {
        return (
            <Link className="add-button" to={handleClick}>
                {text}
            </Link>

        );
    }

    if (type === 'button') {
        return (
            <button className="add-button" onClick={handleClick}>
                {text}
            </button>
        );
    }

}

export default AddButton;