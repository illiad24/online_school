import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
function DeleteButton({ handleSubmit }) {
    return (
        <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={handleSubmit} startIcon={<DeleteIcon />}>
            Видалити
        </Button>

    );
}

export default DeleteButton;