import Link from 'next/link';
import { Instagram } from 'lucide-react';

import { FooterHeader, FooterLink } from '@/components/footer-links';

const Footer = () => {
	return (
		<footer className="relative bg-secondary">
			<div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<Link
							className="text-4xl font-semibold text-accent-800 font-accent"
							href="/"
						>
							Santy Tec
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						<div>
							<FooterHeader title="Tienda" className="mb-4" />
							<nav className="flex flex-col gap-y-2">
								<FooterLink href="/products" title="Catálogo" />
								<FooterLink href="/cart" title="Mi carrito" />
							</nav>
						</div>
						<div>
							<FooterHeader title="Contacto" className="mb-4" />
							<nav className="flex flex-col gap-y-2">
								<FooterLink href="#" title="WhatsApp" />
								<FooterLink href="#" title="Instagram" />
								<FooterLink href="#" title="Correo" />
							</nav>
						</div>
						<div>
							<FooterHeader title="Más Info" className="mb-4" />
							<nav className="flex flex-col gap-y-2">
								<FooterLink
									href="/terms-and-conditions"
									title="Términos y condiciones"
								/>
								<FooterLink
									href="/privacy-policy"
									title="Política de Privacidad"
								/>
								<FooterLink
									href="/cookies-policy"
									title="Política de Cookies"
								/>
							</nav>
						</div>
					</div>
				</div>
				<hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm text-gray-600 hover:text-accent-800 sm:text-center">
						{new Date().getFullYear()} <Link href="/">Santy Tec</Link>
					</span>
					<div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
						<a href="#" className="text-gray-300 hover:text-accent-800">
							<Instagram className="size-5" />
							<span className="sr-only">Página de Instagram</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
