import { Metadata } from 'next';

import ListItem from '@/components/list-item';

export const metadata: Metadata = {
	title: 'Políticas de Privacidad - Santy Tec',
	description:
		'Lee nuestras políticas de privacidad en Santy Tec. Descubre cómo protegemos tu información personal y tus datos en nuestra tienda online.',
};

export default function CookiePolicyPage() {
	return (
		<main className="flex flex-col pb-10">
			<div className="mx-auto mt-5 mb-4 text-center">
				<h1 className="text-3xl font-bold ">
					Política de Privacidad de Santy Tec
				</h1>
				<p className="text-gray-100">Actualizado por última vez: 08/07/2024</p>
			</div>
			<div className="mx-auto w-[80ch]">
				<p className="w-full mb-5 text-pretty">
					Bienvenido a Santy Tec. Nosotros valoramos y respetamos tu privacidad.
					Esta Política de Privacidad describe cómo recopilamos, utilizamos y
					protegemos la información personal que nos proporcionas en nuestro
					sitio web. Al utilizar nuestro sitio, aceptas las prácticas descritas
					en esta política.
				</p>
				<h2 className="text-xl text-gray-100">Información que recopilamos:</h2>
				<dl className="w-full mb-4 text-gray-100 divide-y divide-gray-700">
					<ListItem
						title="Datos de compra:"
						description="Cuando realizas una compra en nuestro sitio web, recopilamos tu nombre, apellido, número de teléfono y dirección de correo electrónico para procesar y completar tu pedido."
					/>
					<ListItem
						title="Datos de Contacto:"
						description="Si decides ponerte en contacto con nosotros a través del formulario de contacto, recopilamos tu nombre, apellido, número de teléfono y dirección de correo electrónico para responder a tus consultas."
					/>
					<ListItem
						title="Cookies:"
						description="Utilizamos cookies necesarias para el funcionamiento del sitio, como se detalla en nuestra Política de Cookies."
					/>
				</dl>
				<h2 className="text-xl text-gray-100">Cómo usamos la información:</h2>
				<dl className="w-full mb-4 text-gray-100 divide-y divide-gray-700">
					<ListItem
						title="Uso de la Información:"
						description="Utilizamos la información recopilada durante la compra para procesar tus pedidos y proporcionarte los productos o servicios solicitados.
            La información obtenida a través del formulario de contacto se utiliza para responder a tus consultas y brindarte asistencia."
					/>
					<ListItem
						title="Almacenamiento de Datos:"
						description="La información personal recopilada se almacena de forma segura en nuestra base de datos.
            Mantenemos tu información durante el tiempo que consideremos necesario y apropiado para cumplir con nuestros propósitos comerciales y legales."
					/>
					<ListItem
						title="Seguridad:"
						description="Utilizamos tecnologías de seguridad, como SSL y reCAPTCHA, para proteger tu información contra accesos no autorizados.
            Nos comprometemos a salvaguardar la confidencialidad de tus datos personales y tomar medidas para evitar pérdidas, mal uso o acceso no autorizado."
					/>
					<ListItem
						title="No compartimos tu Información:"
						description="No compartimos tu información personal con terceros sin tu consentimiento expreso."
					/>
				</dl>
				<h2 className="text-xl text-gray-100">Derechos del Usuario:</h2>
				<dl className="w-full mb-4 text-gray-100 divide-y divide-gray-700">
					<ListItem
						title="Tus derechos:"
						description="Tienes el derecho de acceder, corregir, modificar o eliminar tus datos personales. Si deseas ejercer estos derechos, por favor contáctanos."
					/>
				</dl>
				<h2 className="text-xl text-gray-100">Cambios a esta Política:</h2>
				<dl className="w-full mb-4 text-gray-100 divide-y divide-gray-700">
					<ListItem
						title="Nuestros derechos:"
						description="Nos reservamos el derecho de realizar cambios en esta Política de Privacidad. Cualquier modificación será publicada en nuestro sitio web y entrará en vigencia inmediatamente."
					/>
					<ListItem
						title="Contacto:"
						description="Si tienes preguntas sobre nuestra Política de Privacidad, puedes ponerte en contacto con nosotros a través del correo: @gmail.com"
					/>
				</dl>
				<p className="w-full text-gray-100 text-pretty">
					Al utilizar nuestro sitio web, aceptas los términos y condiciones
					establecidos en esta Política de Privacidad.
				</p>
				<p className="text-xl font-semibold text-accent text-pretty">
					Gracias por confiar en Santy Tec.
				</p>
			</div>
		</main>
	);
}
