
import { Link } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function SimpleButton({ text, handleClick, type = 'link', bgColor = 'green' }) {
    if (type === 'link') {
        return (
            <Button
                variant="contained"
                component={Link}
                to={handleClick}
                sx={{ background: bgColor }}
            >
                {text}
            </Button>

        );
    }
    if (type === 'button') {
        return (
            <Button variant="contained" sx={{ background: bgColor }} onClick={handleClick} >
                {text}
            </Button>
        );
    }
}
export default SimpleButton;