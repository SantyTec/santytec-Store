import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getPasswordStrength = (pwd: string) => {
	if (!pwd) return { score: 0, label: '', color: '' };

	let score = 0;
	if (pwd.length >= 8) score += 25;
	if (pwd.length >= 10) score += 25;
	if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
	if (/\d/.test(pwd)) score += 12.5;
	if (/[^a-zA-Z\d]/.test(pwd)) score += 12.5;

	if (score <= 25) return { score, label: 'Débil', color: 'bg-destructive' };
	if (score <= 50) return { score, label: 'Regular', color: 'bg-yellow-500' };
	if (score <= 75) return { score, label: 'Buena', color: 'bg-blue-500' };
	return { score, label: 'Excelente', color: 'bg-green-500' };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, '...', totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [
			1,
			'...',
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			totalPages,
		];
	}

	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};
