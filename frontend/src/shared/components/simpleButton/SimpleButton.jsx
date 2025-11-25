
import { Link } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function SimpleButton({ text, handleClick, type = 'link' }) {
    if (type === 'link') {
        return (
            <Button
                variant="contained"
                component={Link}
                to={handleClick}
                className='button'
            >
                {text}
            </Button>

        );
    }
    if (type === 'button') {
        return (
            <Button variant="contained" className='button' onClick={handleClick} >
                {text}
            </Button>
        );
    }
}
export default SimpleButton;