import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Avatar,
    Chip
} from '@mui/material';

export default function GenericForm({
    onSubmit,
    register,
    errors,
    fields = [],
    formTitle = "Form",
    submitLabel = "Submit",
    error,
    selectedImage,
    setSelectedImage,
    defaultValues = {},
}) {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (defaultValues?.image) {
            setImagePreview(defaultValues.image);
        }
    }, [defaultValues]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                maxWidth: 600,
                mx: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="h1" textAlign="center">
                {formTitle}
            </Typography>

            {/* Avatar / Image */}
            {fields.some(f => f.type === 'image') && (
                <Box textAlign="center">
                    <Avatar
                        src={imagePreview || defaultValues.image || ""}
                        sx={{ width: 100, height: 100, mb: 2, boxShadow: 2 }}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ mt: 1, textTransform: "none", fontWeight: 500 }}
                    >
                        Upload New Picture
                    </Button>
                </Box>
            )}



            {/* !!!! FIX селекти не підгружають значення  */}
            {/* Поля */}
            {fields.filter(f => f.type !== 'image').map(field => {
                if (field.type === 'select') {
                    return (
                        <FormControl key={field.name} fullWidth error={!!errors?.[field.name]}>
                            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                            <Select
                                labelId={`${field.name}-label`}
                                multiple={field.multiple || false}
                                defaultValue={defaultValues[field.name]?._id || (field.multiple ? [] : '')}
                                {...register(field.name, field.validation)}
                                renderValue={selected => {

                                    if (Array.isArray(selected)) {
                                        return selected
                                            .map(val => {
                                                const option = field.options.find(o => o.value === val);
                                                return option ? option.label : val;
                                            })
                                            .join(', ');
                                    }

                                    const option = field.options.find(o => o.value === selected);
                                    return option ? option.label : selected;
                                }}
                            >
                                {field.options.map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors?.[field.name] && (
                                <Typography variant="caption" color="error">
                                    {errors[field.name].message}
                                </Typography>
                            )}
                        </FormControl>
                    );
                }

                return (
                    <TextField
                        key={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        multiline={field.multiline || false}
                        rows={field.rows || 1}
                        fullWidth
                        defaultValue={defaultValues[field.name] || ''}
                        {...register(field.name, field.validation)}
                        error={!!errors?.[field.name]}
                        helperText={errors?.[field.name]?.message}
                    />
                );
            })}

            {error && <Alert severity="error">{error.data?.error || 'Невідома помилка'}</Alert>}

            <Button type="submit" variant="contained" color="primary">
                {submitLabel}
            </Button>
        </Box>
    );
}