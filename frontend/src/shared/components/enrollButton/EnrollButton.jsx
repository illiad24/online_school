import { Button } from "@mui/material";

function EnrollButton({ handleClick }) {
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
            Enroll
        </Button>
    );
}

export default EnrollButton;
