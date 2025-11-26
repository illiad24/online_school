import { Box } from "@mui/material";

function EnrollButton({ handleClick, disabled = false }) {
    return (
        <Box
            className='button'
            onClick={handleClick}
        >
            {disabled ? "Ви вже записані" : "Записатись"}
        </Box>
    );
}

export default EnrollButton;
