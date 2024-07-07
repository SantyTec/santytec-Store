'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

interface Props {
	title: string;
	className?: string;
	disabled?: boolean;
}

export default function SubmitButton({ title, className, disabled }: Props) {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="accent"
			className={className}
			disabled={pending || disabled}
			type="submit"
		>
			{title}
		</Button>
	);
}
