import { MailOptions } from 'nodemailer/lib/json-transport';

const styles = `
<style>
  :root {
    --bg: hsl(0, 0%, 10%);
    --primary-300: hsl(10, 95%, 70%);
    --primary-400: hsl(10, 95%, 60%);
    --bg-200: hsl(0, 0%, 80%);
    --bg-300: hsl(0, 0%, 70%);
    --accent: hsl(58, 98%, 50%);
  }

  * {
    font-family: Roboto, sans-serif, system-ui;
  }

  .bg-bg {
    background-color: var(--bg);
  }

  .w-\[calc\(100\%-10rem\)\] {
    width: calc(100% - 10rem);
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .font-semibold {
    font-weight: 600;
  }

  .text-center {
    text-align: center;
  }

  .text-primary-300 {
    color: var(--primary-300);
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }

  .text-primary-400 {
    color: var(--primary-400);
  }

  .text-bg-200 {
    color: var(--bg-200);
  }

  .mb-1 {
    margin-bottom: 0.25rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-bg-300 {
    color: var(--bg-300);
  }

  .font-bold {
    font-weight: 700;
  }

  .text-accent {
    color: var(--accent);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
    height: 2.5rem;
    padding; 0.5rem 1rem;
  }

  .btn:focus-visible {
    outline: none;
    ring-offset: 0.5rem;
  }

  .bg-accent {
    background-color: var(--accent);
  }

  .btn:hover {
    background-color: hsl(var(--accent), 0.8);
  }

  .text-bg {
    color: var(--bg);
  }
</style>
`;

const emailSignature = `
  <br />
  <p class="text-sm font-bold mb-2">
    El equipo de <span class="text-accent">Santy Tec</span>
  </p>
  <a href="#" class="btn bg-accent hover:bg-accent/80 text-bg">Visitanos</a>
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
<body>
     ${styles}
      <main class="bg-bg">
        <section class="w-[calc(100%_-_10rem)] mx-auto">
          <h1 class="mt-2 mb-4 text-2xl font-semibold text-center text-primary-300">Hola ${name}</h1>
          <h2 class="mb-2 text-xl text-primary-400">¡Gracias por tu compra!</h2>
          <p class="text-bg-200">Pedido recibido y en proceso.</p>
          <p class="mb-2 text-bg-200">Nos contactaremos pronto para coordinar más detalles.</p>
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
<body>
     ${styles}
      <main class="bg-bg">
			<section class="w-[calc(100%_-_10rem)] mx-auto">
				<h1 class="mt-2 mb-4 text-2xl font-semibold text-center text-primary-300">
					Hola administrador
				</h1>
				<h2 class="mb-2 text-xl text-primary-400">
					¡Se ha realizado una nueva orden!
				</h2>
				<p class="text-bg-200">ID de la orden: ${orderId}</p>
				<p class="text-bg-200">Nombre: <b>${name}</b></p>
				<p class="text-bg-200">Correo: <b>${email}</b></p>
				<p class="text-bg-200">Teléfono: <b>${phone}</b></p>
				<a class="mt-2 btn bg-accent hover:bg-accent/80 text-bg" href="#">
					Más Info
				</a>
			</section>
		</main>
    </body>
</html>
  `,
	};
}
