import { Button } from '@/components/ui/button';
import { signOutAction } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';

export function SignOut({ className }: { className?: string }) {
	return (
		<form action={signOutAction} className='w-full'>
			<Button
				type="submit"
				variant="destructive"
				className={cn('w-full', className)}
				size="sm"
			>
				<LogOut className="mr-2 size-4" /> Cerrar Sesión
			</Button>
		</form>
	);
}
