'use client';

import { FileDown } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';

export function DownloadCatalogButton({ className }: { className?: string }) {
	const [isLoading, setIsLoading] = useState(false);

	const handleDownload = async () => {
		setIsLoading(true);

		try {
			const response = await fetch('/api/pdf');
			if (!response.ok) {
				toast.error('Error al descargar catálogo');
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'catalogo-santytec.pdf';
			a.click();
			window.URL.revokeObjectURL(url);

			toast.success('Descarga exitosa');
		} catch (error) {
			toast.error('Error al descargar catálogo');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={isLoading}
			onClick={handleDownload}
			className={`flex items-center gap-2 disabled:cursor-wait ${className}`}
		>
			<FileDown size={20} />
			{isLoading ? 'Generando PDF...' : 'Descargar Catálogo'}
		</Button>
	);
}
