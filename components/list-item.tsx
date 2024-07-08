export default function ListItem({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col pb-3">
			<dt className="mb-1 text-lg font-semibold text-balance">{title}</dt>
			<dd className="text-gray-400 text-pretty">{description}</dd>
		</div>
	);
}
