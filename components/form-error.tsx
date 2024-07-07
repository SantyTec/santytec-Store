interface Props {
	id: string;
	field?: string[];
}

export default function FormError({ id, field }: Props) {
	return (
		<div id={id} aria-live="polite" aria-atomic="true">
			{field &&
				field.map((error: string) => (
					<p className="mt-1 text-sm text-red-500" key={error}>
						{error}
					</p>
				))}
		</div>
	);
}
