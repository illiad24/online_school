function DeleteButton({ handleSubmit }) {
    return (
        <button
            className="delete-button" // Додано клас для стилізації
            onClick={handleSubmit}
        >
            Видалити
        </button>
    );
}

export default DeleteButton;