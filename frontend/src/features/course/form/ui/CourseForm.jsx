
function CourseForm({ onSubmit, register, errors, teachersList, lessonsList, course, error }) {
    return (
        <div className="form form--margin">
            <h1 className="form__title">Course Form</h1>
            <form onSubmit={onSubmit}>
                <div className="form__group">
                    <label className="form__label" htmlFor="title">Назва:</label>
                    <input className="form__input" type="text" id="title" name="title" {...register("title")} />
                    {errors?.title && <p className="form__error">{errors.title.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="description">Опис:</label>
                    <textarea className="form__input form__input--textarea" id="description" name="description" {...register("description")}></textarea>
                    {errors?.description && <p className="form__error">{errors.description.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="teacher">Вчитель:</label>
                    <select
                        className="form__input"
                        id="teacher"
                        name="teacher"
                        {...register("teacher")}
                        defaultValue={course?.teacher || ""}
                    >
                        <option value="" disabled>Оберіть вчителя</option>
                        {teachersList?.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    {errors?.teacher && <p className="form__error">{errors.teacher.message}</p>}
                </div>

                {/* <div className="form__group">
                    <label className="form__label" htmlFor="lessons">Уроки:</label>
                    <select
                        className="form__input"
                        id="lessons"
                        name="lessons"
                        {...register("lessons")}
                        multiple
                        defaultValue={course?.lessons || []}
                    >
                        {lessonsList?.map((lesson) => (
                            <option key={lesson._id} value={lesson._id}>
                                {lesson.title}
                            </option>
                        ))}
                    </select>
                    {errors?.lessons && <p className="form__error">{errors.lessons.message}</p>}
                </div> */}

                <div className="form__group">
                    <label className="form__label" htmlFor="price">Ціна:</label>
                    <input className="form__input" type="number" id="price" name="price" {...register("price")} />
                    {errors?.price && <p className="form__error">{errors.price.message}</p>}
                </div>

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


export default CourseForm;