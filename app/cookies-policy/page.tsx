import ListItem from '@/components/list-item';

export default function CookiePolicyPage() {
	return (
		<main className="flex flex-col pb-10">
			<div className="mx-auto mt-5 mb-4 text-center">
				<h1 className="text-3xl font-bold ">Política de Cookies</h1>
				<p className="text-gray-100">Actualizado por última vez: 08/07/2024</p>
			</div>
			<div className="mx-auto w-[80ch]">
				<p className="w-full mb-5 text-pretty">
					A fin de brindarle la mejor experiencia posible, en ocasiones se
					almacenan o se recuperan datos de su teléfono, tableta, o el disco
					duro de su computadora. Esto se logra mediante el uso de{' '}
					<i>cookies</i>. Las <i>cookies</i> son esenciales para el correcto
					funcionamiento de nuestro sitio, Al utilizar nuestro sitio web, usted
					acepta el uso de cookies según se describe en esta política.
				</p>
				<dl className="w-full text-gray-100 divide-y divide-gray-700">
					<ListItem
						title="¿Qué son las cookies"
						description="Las cookies son pequeños archivos de texto
			almacenados en su dispositivo por su navegador cuando visita un sitio web.
			Tienen diversos propósitos, como mejorar su experiencia de navegación,
			recordar sus preferencias y analizar el tráfico del sitio."
					/>
					<ListItem
						title="Tipos de cookies"
						description="Nuestro sitio web utiliza solo cookies necesarias para la funcionalidad básica. Estas cookies son esenciales para el correcto funcionamiento del sitio y no recopilan información personal."
					/>
					<ListItem
						title="Cookies necesarias"
						description="Las cookies necesarias son cruciales para las funciones básicas del sitio web. Permiten funcionalidades fundamentales como la navegación por las páginas y el acceso a áreas seguras. El sitio web no puede funcionar correctamente sin estas cookies."
					/>
					<ListItem
						title="Uso de Google ReCAPTCHA"
						description="Para mejorar la seguridad y prevenir abusos, utilizamos Google ReCAPTCHA en nuestro sitio web. Este servicio utiliza cookies, tanto propias como de terceros, para sus operaciones. Las cookies de Google ReCAPTCHA son esenciales para garantizar la seguridad del sitio."
					/>
					<ListItem
						title="Aceptación de los términos"
						description="Al continuar utilizando nuestro sitio web, usted reconoce que ha leído y comprendido esta Política de Cookies. Su uso continuado del sitio implica su consentimiento para el uso de cookies necesarias, así como para las cookies asociadas a Google ReCAPTCHA según se describe aquí."
					/>
					<ListItem
						title="Gestión de Cookies"
						description="La mayoría de los navegadores web permiten controlar y bloquear cookies a través de sus configuraciones. Sin embargo, tenga en cuenta que bloquear cookies necesarias puede afectar la funcionalidad del sitio web."
					/>
					<ListItem
						title="Cambios en esta política"
						description="Nos reservamos el derecho de actualizar esta Política de Cookies para reflejar cambios en la tecnología o requisitos legales. Cualquier actualización se publicará en esta página con la fecha de última modificación."
					/>
					<ListItem
						title="Contactenos"
						description="Si tiene alguna pregunta o inquietud sobre esta Política de Cookies, contáctenos en santytecno0@gmail.com."
					/>
				</dl>
			</div>
		</main>
	);
}
