import { Link } from 'react-router';
import './EditButton.scss'; // We will create this SCSS file next

function EditButton({ handleClick }) {
    return (
        <Link className="edit-button" to={handleClick}>
            Редагувати
        </Link>
    );
}

export default EditButton;