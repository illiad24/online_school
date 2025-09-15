import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function ChangeRole({ roles, handleChange, selectedValue }) {
    return (
        <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="role-select-label">Роль</InputLabel>
            <Select
                labelId="role-select-label"
                value={selectedValue}
                onChange={handleChange}
                label="Роль"
            >
                {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ChangeRole
