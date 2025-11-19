import { useState, useEffect } from "react"
import axios from "axios"

function CourseProgressPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    // Тестовий userId
    const userId = "69137a8af89c0238fea3b559"
    // const courseId = "69162d1127b923462f63b18e"
    const courseId = "6916d9c3c2e3c95320a35412"
    // const lessonId = "6912f651bdced8ca460936fb"
    const lessonId = "6912fda1bdced8ca46093797"

    // Отримати всі курси користувача
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/enrollments/user/${userId}`)
            setCourses(res.data)
        } catch (err) {
            console.error(err)
            setMessage("Помилка при завантаженні курсів")
        } finally {
            setLoading(false)
        }
    }
    const updateStatus = async () => {
        try {
            const res = await axios.patch(`http://localhost:3000/enrollments/${userId}/${courseId}/status`, {
                status: 'completed'
            })
            setMessage(`Статис оновлено:completed`)
        } catch (err) {
            console.error(err)
            setMessage("Помилка при завантаженні курсів")
        } finally {
            setLoading(false)
        }
    }
    // const fetchCourse = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:3000/enrollments/user/${userId}/course/${courseId}`)
    //         setCourses(res.data)
    //     } catch (err) {
    //         console.error(err)
    //         setMessage("Помилка при завантаженні курсів")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // Тестова відправка – позначити урок пройденим
    const completeLesson = async () => {
        try {
            const res = await axios.post("http://localhost:3000/enrollments/complete-lesson", {
                userId,
                courseId,
                lessonId
            })
            setMessage(`Прогрес оновлено: ${res.data.progress}%`)
            fetchCourses() // оновлюємо список курсів після оновлення прогресу
        } catch (err) {
            console.error(err)
            setMessage("Помилка при проходженні уроку")
        }
    }

    const enrollCourse = async () => {
        try {
            const res = await axios.post("http://localhost:3000/enrollments", {
                userId,
                courseId
            })
            setMessage(`Курс записано`)
            fetchCourses() // оновлюємо список курсів після оновлення прогресу
        } catch (err) {
            console.error(err)
            setMessage("Помилка при проходженні уроку")
        }
    }


    useEffect(() => {
        fetchCourses()
        // fetchCourse()
    }, [])

    if (loading) return <div>Завантаження...</div>

    return (
        <div>
            <h2>CourseProgressPage.jsx</h2>
            {message && <p>{message}</p>}

            <button onClick={completeLesson} className="button">Позначити урок як пройдений</button>
            <button onClick={updateStatus} className="button">Змінити статус</button>
            <button onClick={enrollCourse} className="button">Записатись на курс</button>

            <div>
                <h3>Мої курси</h3>
                {courses.length === 0 && <p>Немає курсів</p>}
                <ul>
                    {courses?.map(c => (
                        <li key={c.course._id}>
                            {c.course.title} — Прогрес: {c.progress}%
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CourseProgressPage
