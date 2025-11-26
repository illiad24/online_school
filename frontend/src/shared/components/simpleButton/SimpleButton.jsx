
import { Button } from '@mui/material';
import { Link } from 'react-router';

function SimpleButton({ text, handleClick, type = 'link' }) {
    if (type === 'link') {
        return (
            <Link
                to={handleClick}
                className='button'
            >
                {text}
            </Link>

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