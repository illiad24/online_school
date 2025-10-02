import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
function DeleteButton({ handleSubmit, title = "Видалити" }) {
    return (
        <Button variant="contained" sx={{ bgcolor: 'red', paddingRight: '16px', paddingLeft: '16px', flex: '0 0 auto' }} onClick={handleSubmit} startIcon={<DeleteIcon />}>
            {title}
        </Button>

    );
}

export default DeleteButton;