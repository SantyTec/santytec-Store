import { notFound } from 'next/navigation';

import { getImagesByProductId } from '@/lib/model/images';

 import GalleryClient from '@/components/products/gallery-client';

interface Props {
	id: string;
}

export default async function Gallery({ id }: Props) {
	const images = await getImagesByProductId(id);

	if (!images) notFound();

	return <GalleryClient images={images} />;
}
