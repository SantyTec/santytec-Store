import ContactForm from './contact-form';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
	return (
		<section className="container min-h-screen">
			<h2 className="mb-6 text-4xl font-bold tracking-tight text-center uppercase md:text-5xl text-accent font-accent">
				Contactanos
			</h2>
			<p className="max-w-2xl mx-auto mb-3 text-lg text-center text-primary-200/80">
				¿Tenés una pregunta o necesitás asistencia? Llená el formulario de abajo
				y te contactaremos lo más pronto posible
			</p>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<ContactForm />
				<section className="space-y-8">
					<h3 className="mb-3 text-2xl font-bold text-text">
						Información de <span className="text-primary">soporte</span>
					</h3>
					<div className="flex items-start mb-1.5">
						<Phone className="mr-2 size-6 text-primary" aria-hidden="true" />
						<div className="space-y-1">
							<p className="text-lg font-semibold text-text">Teléfono</p>
							<a
								href="tel:+5492995323739"
								className="text-xl transition-colors duration-200 text-text hover:text-primary"
							>
								+54 9 299 532-3739
							</a>
						</div>
					</div>
					<div className="flex items-start">
						<Mail className="mr-2 size-6 text-primary" aria-hidden="true" />
						<div className="space-y-1">
							<p className="text-lg font-semibold text-text">
								Correo Electrónico
							</p>
							<a
								href="mailto:santytec2@gmail.com"
								className="text-xl transition-colors duration-200 text-text hover:text-primary"
							>
								santytec2@gmail.com
							</a>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
}
