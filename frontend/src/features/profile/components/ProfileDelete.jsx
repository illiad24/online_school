import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDeleteUserMutation } from "@/entities/user/api/userApi";
import { Card, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box } from "@mui/material";

function ProfileDelete({ userEmail }) {
    const { id } = useParams();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmailInput("");
        setError("");
    }

    const handleDelete = async () => {
        if (emailInput !== userEmail) {
            setError("Пошта введена неправильно");
            return;
        }

        try {
            await deleteUser(id).unwrap();
            handleClose();
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err);
        }
    }

    return (
        <Box >
            <Button variant="contained" color="#05070a" onClick={handleOpen}>
                Видалити акаунт
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Підтвердження видалення акаунту</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2 }}>
                        Ви точно хочете видалити акаунт? Введіть свою пошту для підтвердження:
                    </Typography>
                    <TextField
                        label="Введіть пошту"
                        fullWidth
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Відмінити</Button>
                    <Button color="error" onClick={handleDelete}>Видалити</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ProfileDelete;
