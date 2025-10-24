import Wrapper from '@/components/wrapper';
import ContactForm from './contact-form';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
	return (
		<Wrapper className="mx-24 min-h-screen">
			<h2 className="mb-6 text-4xl font-semibold uppercase text-accent-600 text-center font-accent">
				Contactános
			</h2>
			<p className="text-lg text-bg-100 mx-auto mb-3">
				¿Tenés una pregunta o necesitás asistencia? Llená el formulario de abajo
				y te contactaremos lo más pronto posible
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ContactForm />
				<section>
					<h3 className="text-2xl mb-3 font-bold text-accent-600">
						Información de contacto
					</h3>
					<div className="flex mb-1.5">
						<Phone className="size-6 mr-2 text-primary" />
						<p>
							<b className="text-primary-100">Teléfono:</b> +54 9 299 532-3739
						</p>
					</div>
					<div className="flex">
						<Mail className="size-6 mr-2 text-primary" />
						<p>
							<b className="text-primary-100">Correo electrónico:</b> santytec2@gmail.com
						</p>
					</div>
				</section>
			</div>
		</Wrapper>
	);
}
