import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function Wrapper({ children, className }: Props) {
	return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>;
}
