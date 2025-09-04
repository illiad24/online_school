
function TeacherForm({ onSubmit, register, errors, coursesList, teacher }) {
    return (
        <div className="form form--margin">
            <h1 className="form__title">Teacher Form</h1>

            <form onSubmit={onSubmit}>
                <div className="form__group">
                    <label className="form__label" htmlFor="name">Name:</label>
                    <input className="form__input" type="text" id="name" name="name" {...register("name")} minLength="3" maxLength="50" />
                    {errors?.name && <p className="form__error">{errors.name.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="email">Email:</label>
                    <input className="form__input" type="email" id="email" name="email" {...register("email")} required minLength="5" maxLength="100" />
                    {errors?.email && <p className="form__error">{errors.email.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="subject">Subject:</label>
                    <input className="form__input" type="text" id="subject" name="subject" {...register("subject")} required minLength="3" maxLength="50" />
                    {errors?.subject && <p className="form__error">{errors.subject.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="bio">Bio:</label>
                    <textarea className="form__input form__input--textarea" id="bio" name="bio" {...register("bio")} maxLength="500"></textarea>
                    {errors?.bio && <p className="form__error">{errors.bio.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="experience">Experience (years):</label>
                    <input className="form__input" type="number" id="experience" name="experience" {...register("experience")} required min="0" />
                    {errors?.experience && <p className="form__error">{errors.experience.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="age">Age:</label>
                    <input className="form__input" type="number" id="age" name="age" {...register("age")} required min="0" />
                    {errors?.age && <p className="form__error">{errors.age.message}</p>}
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="courses">Courses (IDs):</label>
                    <select
                        className="form__input"
                        id="courses"
                        name="courses"
                        {...register("courses")}
                        multiple // Додаємо атрибут multiple
                        defaultValue={teacher?.courses || []} // Default value має бути масивом
                    >
                        {coursesList?.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                    {errors?.courses && <p className="form__error">{errors.courses.message}</p>}
                </div>

                <div>
                    <button className="form__button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default TeacherForm;