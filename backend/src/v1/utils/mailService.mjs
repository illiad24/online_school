import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (toEmail, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // твій gmail
            pass: process.env.EMAIL_PASS, // App Password (а не звичайний пароль)
        },
    });

    const mailOptions = {
        from: `"Online School VT" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Ласкаво просимо на наш сайт!",
        html: `
            <h2>Вітаємо, ${name}!</h2>
            <p>Дякуємо за реєстрацію в нашій онлайн школі. 🎉</p>
            <p>Ми раді бачити вас серед наших студентів.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};



export const sendPasswordChangedEmail = async (toEmail, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Online School VT" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Ваш пароль успішно змінено",
        html: `
            <h2>Привіт, ${name}!</h2>
            <p>Ми повідомляємо, що ваш пароль у <b>Online School</b> було успішно змінено.</p>
            <p>Якщо це були не ви — негайно зв’яжіться з нами.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};


export const sendAccountDeletedEmail = async (toEmail, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Online School VT" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Ваш акаунт було видалено",
        html: `
            <h2>Привіт, ${name}!</h2>
            <p>Ми повідомляємо, що ваш акаунт у <b>Online School</b> було видалено.</p>
            <p>Якщо це були не ви — будь ласка, зв’яжіться з нашою підтримкою.</p>
            <p>Дякуємо, що були з нами.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};