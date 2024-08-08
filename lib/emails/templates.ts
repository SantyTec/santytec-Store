import { MailOptions } from 'nodemailer/lib/json-transport';

const emailSignature = `
  <br />
  <p style="font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem;">
    El equipo de <span style="color: hsl(58, 98%, 50%);">Santy Tec</span>
  </p>
  <a href="https://santytec.com.ar/" style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; outline: none; height: 2.5rem; padding: 0.5rem 1rem; background-color: hsl(58, 98%, 50%); color: hsl(0, 0%, 10%); text-decoration: none;">
    Visitanos
  </a>
`;

export function customerNotification(name: string, email: string): MailOptions {
	return {
		from: process.env.GMAIL_USER,
		to: email,
		text: '',
		subject: 'Santy Tec - Pedido recibido',
		html: `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo Santy Tec</title>
</head>
<body style="font-family: Roboto, sans-serif, system-ui; background-color: hsl(0, 0%, 10%); color: hsl(0, 0%, 80%);">
    <main style="width: calc(100% - 10rem); margin: auto;">
        <section>
          <h1 style="margin-top: 0.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; text-align: center; color: hsl(10, 95%, 70%);">Hola ${name}</h1>
          <h2 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: hsl(10, 95%, 60%);">¡Gracias por tu compra!</h2>
          <p style="color: hsl(0, 0%, 80%);">Pedido recibido y en proceso.</p>
          <p style="margin-bottom: 0.5rem; color: hsl(0, 0%, 80%);">Nos contactaremos pronto para coordinar más detalles.</p>
          ${emailSignature}
        </section>
    </main>
</body>
</html>
  `,
	};
}

export function adminNotification(
	orderId: number,
	name: string,
	email: string,
	phone: string
): MailOptions {
	return {
		from: process.env.GMAIL_USER,
		to: process.env.GMAIL_USER,
		text: '',
		subject: 'Santy Tec - Nueva orden',
		html: `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo Santy Tec</title>
</head>
<body style="font-family: Roboto, sans-serif, system-ui; background-color: hsl(0, 0%, 10%); color: hsl(0, 0%, 80%);">
    <main style="width: calc(100% - 10rem); margin: auto;">
        <section>
				<h1 style="margin-top: 0.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; text-align: center; color: hsl(10, 95%, 70%);">
					Hola administrador
				</h1>
				<h2 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: hsl(10, 95%, 60%);">
					¡Se ha realizado una nueva orden!
				</h2>
				<p style="color: hsl(0, 0%, 80%);">ID de la orden: ${orderId}</p>
				<p style="color: hsl(0, 0%, 80%);">Nombre: <b>${name}</b></p>
				<p style="color: hsl(0, 0%, 80%);">Correo: <b>${email}</b></p>
				<p style="color: hsl(0, 0%, 80%);">Teléfono: <b>${phone}</b></p>
				<a style="margin-top: 0.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; outline: none; height: 2.5rem; padding: 0.5rem 1rem; background-color: hsl(58, 98%, 50%); color: hsl(0, 0%, 10%); text-decoration: none;" href="https://santytec-admin.vercel.app/admin">
					Más Info
				</a>
			</section>
		</main>
    </body>
</html>
  `,
	};
}

export function contactEmail(
	name: string,
	email: string,
	phone: string,
	message: string
): MailOptions {
	return {
		from: email,
		to: process.env.GMAIL_USER,
		subject: 'Santy Tec - Nuevo mensaje de contacto',
		html: `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo Santy Tec</title>
</head>
<body style="font-family: Roboto, sans-serif, system-ui; background-color: hsl(0, 0%, 10%); color: hsl(0, 0%, 80%);">
    <main style="width: calc(100% - 10rem); margin: auto;">
        <section>
          <h1 style="margin-top: 0.5rem; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; text-align: center; color: hsl(10, 95%, 70%);">Nuevo mensaje de contacto</h1>
          <h2 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: hsl(10, 95%, 60%);">Detalles del mensaje:</h2>
          <p style="color: hsl(0, 0%, 80%);"><b>Nombre:</b> ${name}</p>
          <p style="color: hsl(0, 0%, 80%);"><b>Email:</b> ${email}</p>
          <p style="color: hsl(0, 0%, 80%);"><b>Teléfono:</b> ${phone}</p>
          <p style="color: hsl(0, 0%, 80%);"><b>Mensaje:</b> ${message}</p>
          ${emailSignature}
        </section>
    </main>
</body>
</html>
  `,
	};
}
