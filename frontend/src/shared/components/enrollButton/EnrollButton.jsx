import { Button } from "@mui/material";

function EnrollButton({ handleClick, disabled = false }) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className='button'
            onClick={handleClick}
        >
            {disabled ? "Ви вже записані" : "Записатись"}
        </Button>
    );
}

export default EnrollButton;
