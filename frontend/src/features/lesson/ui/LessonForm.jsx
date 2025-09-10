import { useForm } from "react-hook-form";

function LessonForm({ onSubmit, register, error, errors, lessonsList = [] }) {
    return (
        <div className="form form--margin">
            <h1 className="form__title">Lesson Form</h1>
            <form onSubmit={onSubmit}>
                {/* Назва */}
                <div className="form__group">
                    <label className="form__label" htmlFor="title">Назва:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="title"
                        {...register("title", {
                            required: "Назва уроку є обов'язковою",
                            minLength: {
                                value: 3,
                                message: "Назва повинна містити щонайменше 3 символи",
                            },
                            maxLength: {
                                value: 100,
                                message: "Назва не може перевищувати 100 символів",
                            },
                        })}
                    />
                    {errors?.title && <p className="form__error">{errors.title.message}</p>}
                </div>

                {/* Зміст */}
                <div className="form__group">
                    <label className="form__label" htmlFor="content">Зміст:</label>
                    <textarea
                        className="form__input form__input--textarea"
                        id="content"
                        {...register("content", {
                            required: "Зміст уроку є обов'язковим",
                            minLength: {
                                value: 10,
                                message: "Зміст повинен містити щонайменше 10 символів",
                            },
                        })}
                    ></textarea>
                    {errors?.content && <p className="form__error">{errors.content.message}</p>}
                </div>

                {/* Тривалість */}
                <div className="form__group">
                    <label className="form__label" htmlFor="duration">Тривалість (хв):</label>
                    <input
                        className="form__input"
                        type="number"
                        id="duration"
                        {...register("duration", {
                            required: "Тривалість уроку є обов'язковою",
                            min: {
                                value: 0,
                                message: "Тривалість не може бути від'ємною",
                            },
                        })}
                    />
                    {errors?.duration && <p className="form__error">{errors.duration.message}</p>}
                </div>

                {/* Викладач */}
                <div className="form__group">
                    <label className="form__label" htmlFor="teacher">Викладач:</label>
                    <select
                        className="form__input"
                        id="teacher"
                        {...register("teacher", {
                            required: "Викладач є обов'язковим",
                        })}
                        defaultValue=""
                    >
                        <option value="" disabled>Оберіть викладача</option>
                        {lessonsList.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.title}
                            </option>
                        ))}
                    </select>
                    {errors?.teacher && <p className="form__error">{errors.teacher.message}</p>}
                </div>

                {/* Помилка з бекенду */}
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem' }}>
                        <p>{error.data?.error || 'Невідома помилка'}</p>
                    </div>
                )}

                <div>
                    <button className="form__button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default LessonForm;
