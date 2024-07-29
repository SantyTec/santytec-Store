import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Términos y Condiciones - Santy Tec',
	description:
		'Conoce los términos y condiciones de Santy Tec. Información sobre las políticas de uso, pedidos, envíos y devoluciones de nuestra tienda online.',
};

export default function TermsAndConditionsPage() {
	return (
		<main className="flex flex-col pb-10">
			<div className="mx-auto mt-5 mb-4 text-center">
				<h1 className="text-3xl font-bold ">
					Términos y Condiciones de Santy Tec
				</h1>
				<p className="text-gray-400">Actualizado por última vez: 08/07/2024</p>
			</div>
			<div className="mx-auto w-[80ch]">
				<dl className="w-full mb-4 text-gray-100 divide-y divide-gray-700">
					<div className="flex flex-col pb-3">
						<dt className="mb-1 text-lg font-semibold text-balance">
							Introducción
						</dt>
						<dd className="text-gray-400 text-pretty">
							Estos términos y condiciones (de ahora en más: {'"Términos"'}),
							regulan la relación entre Santy Tec y las personas que usan sus
							servicios al visitar este sitio web y todos sus subdominios (de
							ahora en más: {'"Usuarios"'}).
						</dd>
						<dd className="text-gray-400 text-pretty">
							Para poder operar dentro de Santy Tec todos los Usuarios deben
							aceptar los Términos y la{' '}
							<Link
								href="/privacy-policy"
								className="text-secondary-300 hover:underline"
							>
								Política de Privacidad
							</Link>
							.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							1. Información general
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec es un emprendimiento argentino con sede en Plottier,
							dedicado a la venta de distintos accesorios de tecnología.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Nuestro número de teléfono es: +54 9 299 590-5983
						</dd>
						<dd className="text-gray-400 text-pretty">
							Nuestro correo electrónico es:
							<a href="mailto:" className="text-secondary-300 hover:underline">
								santytec2@gmail.com
							</a>
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							2. Contacto y Uso del Sitio Web
						</dt>
						<dd className="text-gray-400 text-pretty">
							Usted puede contactarnos a través del formulario de contacto
							disponible en nuestro sitio web o los datos mencionados en el
							punto 1.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Utilizamos cookies para Google reCAPTCHA con el fin de proteger
							nuestro sitio web del spam y los ataques automatizados. El uso de
							estas tecnologías se detalla en nuestra{' '}
							<Link
								href="/privacy-policy"
								className="text-secondary-300 hover:underline"
							>
								Política de Cookies
							</Link>
							.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Nuestro sitio web utiliza SSL para garantizar la seguridad de sus
							datos personales.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							3. Capacidad
						</dt>
						<dd className="text-gray-400 text-pretty">
							Podrán usar nuestros servicios las personas mayores de edad que
							tengan capacidad legal para contratar.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Los menores de edad de 13 a 18 años solo podrán utilizar nuestros
							servicios con autorización de su representante legal (padre, madre
							o tutor). El representante legal será responsable de todas las
							acciones y obligaciones derivadas del uso del sitio y velará por
							el uso responsable y adecuado del mismo, teniendo en cuenta la
							madurez del menor.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							4. Proceso de Pedidos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Para realizar un pedido, el Usuario debe agregar los productos que
							desea a su carrito.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Dirigirse a la página de carrito para ver información detallada
							sobre su pedido.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Para finalizar su pedido, el Usuario deberá completar un
							formulario con su nombre y número de teléfono.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Una vez completado el formulario, el Usuario recibirá un correo
							electrónico automático con los detalles de su pedido y su
							información. Del mismo modo, este correo detallado se enviará a
							nuestros servidores para que nos encarguemos de procesar su pedido
							y dentro de las 72hs hábiles el administrador se contactará
							personalmente con el Usuario para informarle el estado de su
							pedido.
						</dd>
						<dd className="text-gray-400 text-pretty">
							<strong>Importante:</strong> El sitio web Santy Tec no maneja
							pagos ni envíos de productos. Tras recibir el correo electrónico,
							nuestro administrador se pondrá en contacto con el Usuario para
							finalizar los detalles del pedido, como la dirección de envío, la
							forma de pago y los costos adicionales (si los hubiera).
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							5. Modificación de Precios y Cancelación de Pedidos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec se reserva el derecho de modificar los precios de sus
							productos cuando así lo decida y sin previo aviso.
						</dd>
						<dd className="text-gray-400 text-pretty">
							El administrador de Santy Tec puede cancelar o editar pedidos en
							cualquier momento. Ante la cancelación o modificación de un pedido
							se contactará con el Usuario mediante los datos que este mismo
							haya otorgado para notificarle.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Un pedido puede ser modificado o cancelado por razones
							justificadas por el administrador, como la falta de stock de un
							producto, un error en el precio o cualquier otra razón de peso.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							6. Imágenes de Productos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Las imágenes de los productos son sólo para fines ilustrativos y
							pueden no reflejar con exactitud el tamaño, color o forma real del
							producto.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Le recomendamos que lea atentamente la descripción de cada
							producto antes de realizar el pedido.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							7. Responsabilidad por el Uso de los Productos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec no se hace responsable del uso indebido de los productos
							por parte del Usuario ni de las consecuencias derivadas de dicho
							uso.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Santy Tec proporcionará al Usuario, en la descripción del producto
							en la página web, cualquier información sobre posibles riesgos
							asociados al uso del producto.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Es responsabilidad del Usuario leer atentamente las instrucciones
							de uso de cada producto antes de usarlo. Santy Tec no se hace
							responsable de los daños que causen los productos, incluso cuando
							estos incluyan advertencias en sus instrucciones o en la
							descripción del sitio web.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							8. Propiedad Intelectual
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec es titular de todos los derechos de propiedad
							intelectual sobre el contenido de su sitio web, incluyendo, a
							título enunciativo, los textos, imágenes, vídeos, software, código
							fuente, marcas, logotipos, diseños, etc.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Queda expresamente prohibido cualquier uso, reproducción,
							distribución, comunicación pública, transformación, modificación o
							cualquier otra forma de explotación de todo o parte del contenido
							de la página web sin la autorización previa y expresa de Santy
							Tec.
						</dd>
						<dd className="text-gray-400 text-pretty">
							El Usuario que infrinja los derechos de propiedad intelectual de
							Santy Tec podrá ser responsable de los daños y perjuicios que se
							causen.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							9. Actualización de los Términos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec se reserva el derecho de modificar estos Términos en
							cualquier momento, sin previo aviso.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Los cambios entrarán en vigencia inmediatamente después de su
							publicación en nuestro sitio web.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							10. Aceptación de los Términos
						</dt>
						<dd className="text-gray-400 text-pretty">
							Al acceder a nuestro sitio web y realizar un pedido, usted acepta
							estar sujeto a estos Términos.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Si no está de acuerdo con estos Términos, no debe utilizar nuestro
							sitio web ni realizar ningún pedido.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							11. Protección de Datos Personales
						</dt>
						<dd className="text-gray-400 text-pretty">
							Santy Tec se compromete a proteger la privacidad de sus Usuarios.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Santy Tec no compartirá los datos personales de sus Usuarios con
							terceros sin su consentimiento.
						</dd>
						<dd className="text-gray-400 text-pretty">
							El Usuario puede ejercer en cualquier momento sus derechos de
							acceso, rectificación, cancelación y oposición sobre sus datos
							personales. Para hacer esto, deberá comunicarse enviando un mail
							mediante la sección de Contacto o por algún medio que crea
							conveniente. Santy Tec se compromete a responder su solicitud con
							la mayor prontitud posible.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Para obtener más información sobre cómo tratamos sus datos
							personales, consulte nuestra{' '}
							<Link
								href="/privacy-policy"
								className="text-secondary-300 hover:underline"
							>
								Política de Cookies
							</Link>
							.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							12. Denuncias en Defensa del Consumidor
						</dt>
						<dd className="text-gray-400 text-pretty">
							Cualquier Usuario que tenga un problema con los servicios
							ofrecidos por Santy Tec podrá iniciar un reclamo y contactar con
							nosotros. Puede hacerlo libremente mediante los datos
							proporcionados en el punto 1 de los Términos o llenando el
							formulario de contacto disponible en la página de inicio del
							sitio.
						</dd>
						<dd className="text-gray-400 text-pretty">
							Además, siempre podrá iniciar un reclamo en el{' '}
							<a
								href="https://www.argentina.gob.ar/economia/comercio/defensadelconsumidor"
								className="text-secondary-300 hover:underline"
							>
								Portal Nacional de Defensa de las y los Consumidores
							</a>{' '}
							o el{' '}
							<a
								href="https://w2.neuquen.gov.ar/proteccion-al-consumidor"
								className="text-secondary-300 hover:underline"
							>
								Dirección de la provincia de Neuquén de Protección al Consumidor
							</a>
							. Ante cualquier duda, siempre podrá consultar la{' '}
							<a
								href="https://www.argentina.gob.ar/justicia/derechofacil/leysimple/defensa-del-consumidor"
								className="text-secondary-300 hover:underline"
							>
								ley de Defensa de las y los Consumidores
							</a>
							.
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							13. Derechos del Usuario
						</dt>
						<dd className="text-gray-400 text-pretty">
							Según lo establecido en la ley de Defensa de las y los
							consumidores ley nacional N° 24240, el Usuario posee los
							siguientes derechos:
						</dd>
						<dd className="text-gray-400 text-pretty">
							<ul className="pl-5 list-disc">
								<li>
									Derecho a recibir de forma cierta, clara y detallada
									información respecto a las características de los bienes y
									servicios que se proveen y las condiciones en que se
									comercializan.
								</li>
								<li>
									Derecho a que los proveedores garanticen buenas condiciones de
									atención, trato digno, equitativo y no discriminatorio.
								</li>
								<li>
									Derecho a elegir libremente entre diferentes productos y
									servicios aquel que más le convenga.
								</li>
							</ul>
						</dd>
					</div>
					<div className="flex flex-col pb-3 mt-5">
						<dt className="mb-1 text-lg font-semibold text-balance">
							14. Leyes Aplicables y Jurisdicción
						</dt>
						<dd className="text-gray-400 text-pretty">
							Estos Términos rigen por la ley argentina. Toda controversia
							derivada de su aplicación, interpretación, ejecución o validez se
							resolverá por los tribunales competentes de la ciudad, salvo
							disposición específica de normas de orden público.
						</dd>
					</div>
				</dl>
				<p className="text-xl font-semibold text-accent text-pretty">
					Gracias por confiar en Santy Tec.
				</p>
			</div>
		</main>
	);
}
