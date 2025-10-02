import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDeleteUserMutation } from "@/entities/user/api/userApi";
import { Card, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";

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
        <Card sx={{ mx: "auto", mt: 5, p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "#fafafa" }}>
            <Button variant="contained" color="error" onClick={handleOpen}>
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
        </Card>
    );
}

export default ProfileDelete;
