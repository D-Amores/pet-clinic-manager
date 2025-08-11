import nodemailer from 'nodemailer';

const emailForgetPassword = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, name, token } = data;

    // send email
    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola: ${name}, has solicitado reestablecer tu contraseña.</p>

            <p>Sigue el siguiente enlace para generar una nueva contraseña:
            <a href="${process.env.FRONTEND_URL}/forget-password/${token}">CReestablecer Password</a></p>

            <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);
};



export default emailForgetPassword;