# 🎓 Онлайн-школа (MERN Stack)

Простий навчальний проєкт онлайн-школи для **вивчення іноземних мов та математики**.  
Технології: **React + Node.js (Express) + MongoDB (Mongoose)**.

---

## 📌 Функціонал MVP

- Реєстрація та логін студентів.
- Профіль користувача.
- Вчителі (адмін додає).
- Курси з описом, прив’язані до вчителів.
- Уроки в межах курсів.
- Студент може записатися на курс і бачити його уроки.

---

# 🔧 1. Ініціалізація бекенду

backend/
index.js # точка входу
/config # підключення БД
/models # Mongoose-схеми
/routes # Express-роути
/middleware # middleware (auth)
/controllers # бізнес-логіка (опц.)

# 📚 Онлайн-школа — Backend (Mongoose + Express)

---

## 👥 Моделі (Mongoose)

### 👤 User (студенти)

- `email` — пошта
- `passwordHash` — хешований пароль
- `name` — ім’я
- `role` — за замовчуванням `"student"`

---

### 👩‍🏫 Teacher (вчителі)

- `name` — ім’я
- `email` — пошта
- `bio` — коротка біографія
- `courses` — список курсів _(ref Course)_

---

### 📚 Course (курси)

- `title` — назва курсу
- `description` — опис
- `price` — ціна
- `teacherId` — викладач _(ref Teacher)_
- `lessons` — уроки _(ref Lesson)_

---

### 📖 Lesson (уроки)

- `title` — назва уроку
- `content` — текст або посилання на відео
- `courseId` — курс _(ref Course)_

---

## 🌐 Роути API

### 🔑 Auth

- `POST /auth/register` → створити студента
- `POST /auth/login` → отримати токен

---

### 👤 Users

- `GET /users/me` → отримати свій профіль

---

### 👩‍🏫 Teachers

- `GET /teachers` → список усіх вчителів
- `GET /teachers/:id` → інформація про одного вчителя
- **(admin)** `POST /teachers` → додати нового вчителя

---

### 📚 Courses

- `GET /courses` → список курсів
- `GET /courses/:id` → курс з уроками
- **(admin/teacher)** `POST /courses` → створити курс
- **(student)** `POST /courses/:id/enroll` → записатися на курс

---

### 📖 Lessons

- **(teacher)** `POST /courses/:id/lessons` → додати урок
- `GET /courses/:id/lessons` → список уроків курсу

---

## 🔐 Middleware

- `authMiddleware` — перевірка JWT токена
- `roleMiddleware` — дозволяти дії тільки певним ролям

---

## 🚀 Порядок роботи з бекендом

1. Запустити **MongoDB** локально (або підключитися через Atlas).
2. Підключити Mongoose у `config/db.js`.
3. Створити моделі:
   - `models/User.js`
   - `models/Teacher.js`
   - `models/Course.js`
   - `models/Lesson.js`
4. Реалізувати `auth` роут (реєстрація та логін).
5. Додати `teachers` роут (адмін може створювати вчителів).
6. Додати `courses` роут (створення та отримання курсів).
7. Додати `lessons` роут (вчитель додає уроки, студент переглядає).
8. Протестувати API через **Postman** або **Insomnia**.
9. Додати базовий **seed-скрипт** (наприклад, створити 1 вчителя + 1 курс).

---
