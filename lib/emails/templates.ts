import { MailOptions } from 'nodemailer/lib/json-transport';

const emailSignature = `
  <br />
  <p style="font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem;">
    El equipo de <span style="color: hsl(58, 98%, 50%);">Santy Tec</span>
  </p>
  <a href="https://santytec.com.ar/" style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; outline-solid: none; height: 2.5rem; padding: 0.5rem 1rem; background-color: hsl(58, 98%, 50%); color: hsl(0, 0%, 10%); text-decoration: none;">
    Visitanos
  </a>
`;

export function verificationEmail(
	name: string,
	email: string,
	token: string
): MailOptions {
	return {
		from: process.env.GMAIL_USER,
		to: email,
		text: '',
		subject: '¡Bienvenido a Santy Tec! Activa tu Cuenta y Completa tu Registro',
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
    <div
      style="
        background-color: #262626;
        color: #e0e0e0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        padding: 40px 20px;
        min-height: 100vh;
      "
    >
      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          background-color: #262626;
        "
      >
        <div style="text-align: center; margin-bottom: 40px;">
          <div
            style="
              font-size: 36px;
              font-weight: bold;
              color: #fdf51c;
              margin-bottom: 20px;
              letter-spacing: 2px;
            "
          >
            SANTY TEC
          </div>
          <div
            style="
              height: 2px;
              background: linear-gradient(90deg, transparent, #dddbff, transparent);
              margin: 0 auto;
              width: 60%;
              opacity: 0.5;
            "
          ></div>
        </div>

        <h1
          style="
            font-size: 28px;
            font-weight: 700;
            color: #e0e0e0;
            margin-bottom: 32px;
            line-height: 1.3;
            text-align: center;
            letter-spacing: -0.5px;
          "
        >
          Activa tu Cuenta
        </h1>

        <div style="margin-bottom: 40px;">
          <p
            style="
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 20px;
              color: #e0e0e0;
            "
          >
            Hola ${name},
          </p>

          <p
            style="
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 20px;
              color: #e0e0e0;
            "
          >
            Nuestro equipo administrativo ha creado una cuenta para ti en Santy Tec. Esta cuenta te permitirá consolidar
            todos tus pedidos, realizar un seguimiento más eficiente de tus compras y acceder a un historial completo de
            transacciones.
          </p>

          <p
            style="
              font-size: 16px;
              line-height: 1.8;
              margin-bottom: 20px;
              color: #e0e0e0;
            "
          >
            Para garantizar tu privacidad y seguridad,
            <span style="color: #fc9783; font-weight: 600;">serás tú quien establezca tu propia contraseña</span>.
            De esta manera, solo tú tendrás acceso a tu cuenta y a tu información.
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 40px;">
          <a
            href="${
							process.env.FRONTEND_STORE_URL || ''
						}/auth/verify-email?token=${token}"
            style="
              display: inline-block;
              background: linear-gradient(135deg, #fc9783 0%, #dddbff 100%);
              color: #1a1a1a;
              font-size: 16px;
              font-weight: 700;
              padding: 18px 40px;
              text-decoration: none;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(252, 151, 131, 0.3);
              letter-spacing: 0.5px;
            "
          >
            Activar mi Cuenta
          </a>
        </div>

        <div
          style="
            background-color: rgba(252, 151, 131, 0.08);
            border: 1px solid rgba(252, 151, 131, 0.3);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 40px;
          "
        >
          <p
            style="
              font-size: 15px;
              line-height: 1.7;
              margin-bottom: 12px;
              color: #e0e0e0;
            "
          >
            <span style="color: #fdf51c; font-weight: 700;">⚠️ Importante:</span> Este enlace de activación
            <strong style="color: #fdf51c">caducará en 24 horas</strong> por motivos de seguridad.
          </p>

          <p
            style="
              font-size: 14px;
              line-height: 1.7;
              margin: 0;
              color: #e0e0e0;
              opacity: 0.85;
            "
          >
            Si no reconoces esta acción o no deseas crear una cuenta en este momento, simplemente ignora este correo.
            Tus datos previos siguen protegidos.
          </p>
        </div>

        <div
          style="
            border-top: 1px solid rgba(221, 219, 255, 0.2);
            padding-top: 32px;
          "
        >
          <p
            style="
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 16px;
              color: #e0e0e0;
              text-align: center;
            "
          >
            Gracias por confiar en Santy Tec.
          </p>

          <p
            style="
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 24px;
              color: #e0e0e0;
              text-align: center;
            "
          >
            ¿Necesitas ayuda? Contáctanos en
            <a
              href="mailto:santytec2@gmail.com"
              style="
                color: #fc9783;
                text-decoration: none;
                font-weight: 600;
              "
            >
              santytec2@gmail.com
            </a>
          </p>

          <p
            style="
              font-size: 12px;
              color: #e0e0e0;
              opacity: 0.6;
              text-align: center;
              margin: 0;
            "
          >
            <a
              href="#"
              style="
                color: #dddbff;
                text-decoration: none;
                margin-right: 16px;
              "
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              style="
                color: #dddbff;
                text-decoration: none;
              "
            >
              Términos y Condiciones
            </a>
          </p>

          <p
            style="
              font-size: 11px;
              color: #e0e0e0;
              opacity: 0.5;
              text-align: center;
              margin-top: 20px;
            "
          >
            Este es un correo automático, por favor no respondas a este mensaje.
          </p>
        </div>
      </div>
    </div>
</body>
</html>
  `,
	};
}

export function customerNotification(
	name: string,
	email: string,
	orderSummary: string
): MailOptions {
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
          <h2 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: hsl(10, 95%, 60%);">Resumen de compra</h2>
          ${orderSummary}
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
	phone: string,
	orderSummary: string
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
         <h2 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: hsl(10, 95%, 60%);">Resumen de orden</h2>
          ${orderSummary}
				<a style="margin-top: 0.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; outline-solid: none; height: 2.5rem; padding: 0.5rem 1rem; background-color: hsl(58, 98%, 50%); color: hsl(0, 0%, 10%); text-decoration: none;" href="https://santytec-admin.vercel.app/admin">
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
