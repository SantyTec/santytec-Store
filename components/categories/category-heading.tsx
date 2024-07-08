import { notFound } from 'next/navigation';

import { getCategoryName } from '@/lib/model/categories';

export default async function CategoryHeading({ id }: { id: string }) {
	const { data: name, error } = await getCategoryName(id);

	if (error) notFound();

	return (
		<h2 className="my-6 text-4xl font-semibold text-center uppercase font-accent text-accent-600">
			{name}
		</h2>
	);
}
