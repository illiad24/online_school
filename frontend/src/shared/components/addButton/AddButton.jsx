
import { Link } from 'react-router';
import './AddButton.scss';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function AddButton({ text, handleClick, type = 'link' }) {
    if (type === 'link') {
        return (
            <Button
                variant="contained"
                sx={{ bgcolor: 'green' }}
                component={Link}
                to={handleClick}
                startIcon={<AddIcon />}
            >
                {text}
            </Button>

        );
    }
    if (type === 'button') {
        return (
            <Button variant="contained" sx={{ bgcolor: 'green' }} onClick={handleClick} startIcon={<AddIcon />}>
                {text}
            </Button>
        );
    }
}
export default AddButton;