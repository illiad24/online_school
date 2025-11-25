import { Link } from 'react-router';
import './EditButton.scss'; // We will create this SCSS file next
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
function EditButton({ handleClick }) {
    return (
        <Button variant="contained" component={Link} className='button' to={handleClick} startIcon={<EditIcon />}>
            Редагувати
        </Button>
    );
}

export default EditButton;