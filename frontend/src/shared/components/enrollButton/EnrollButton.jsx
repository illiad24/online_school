import { Button } from "@mui/material";

function EnrollButton({ handleClick, disabled = false }) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
                py: 1.2,
            }}
            onClick={handleClick}
        >
            {disabled ? "Ви вже записані" : "Записатись"}
        </Button>
    );
}

export default EnrollButton;
