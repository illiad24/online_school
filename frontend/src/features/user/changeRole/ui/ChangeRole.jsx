function ChangeRole({ roles, handleChange, selectedValue }) {

    return (
        <select onChange={handleChange} className="select">
            {roles.map((role, index) => (
                <option
                    className="select__option"
                    key={index}
                    value={role}
                    selected={selectedValue === role}
                >
                    {role}
                </option>
            ))}
        </select>
    );
}

export default ChangeRole;