import { cn } from '@/lib/utils';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

export function ProductSkeleton() {
	return (
		<div className="w-full my-14 lg:my-0 lg:h-full">
			<div className="h-12 min-w-[40ch] w-full bg-bg-700 rounded-md" />
			<div className="h-6 w-[10ch] bg-bg-700 rounded-md mt-3.5 mb-4" />
			<div className="flex flex-col gap-y-6">
				<div className="w-full h-6 rounded-md bg-bg-700" />
				<div className="w-full h-6 rounded-md bg-bg-700" />
			</div>
			<div className="flex items-center mt-4 gap-x-4">
				<div className="flex flex-col w-full gap-y-4">
					<div className="w-full h-6 rounded-md bg-bg-700" />
					<div className="h-12 overflow-hidden relative shimmer w-[30ch] bg-bg-700 rounded-md" />
				</div>
			</div>
			<div className="w-full h-24 mt-4 rounded-md bg-bg-700" />
		</div>
	);
}

export function ProductCardSkeleton() {
	return (
		<Card className="max-h-[400px] h-full bg-bg-800">
			<CardHeader className="h-full max-h-20">
				<div className="w-full h-10 rounded-md bg-bg-700" />
			</CardHeader>
			<CardContent>
				<div className="relative w-full overflow-hidden rounded-md aspect-square bg-bg-700 shimmer" />
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<div className="w-full h-8 rounded-md bg-bg-700" />
			</CardFooter>
		</Card>
	);
}

export function TitleSkeleton() {
	return (
		<h2 className="my-6 text-4xl font-semibold text-center uppercase font-accent text-accent-600">
			Cargando...
		</h2>
	);
}

const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('overflow-hidden bg-gray-600', className)} {...props} />
);

export function CarouselSkeleton() {
	return (
		<div className="relative w-full">
			<div className="overflow-hidden">
				<div className="flex -ml-4">
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className="min-w-0 relative overflow-hidden shrink-0 grow-0 basis-full pl-4 md:basis-1/3 lg:basis-1/4"
						>
							<ProductCardSkeleton />
						</div>
					))}
				</div>
			</div>
			<Skeleton className="overflow-hidden absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2" />
			<Skeleton className="overflow-hidden absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2" />
			<div className="py-2 text-sm text-center overflow-hidden text-muted-foreground">
				<Skeleton className="w-1/4 h-4 mx-auto" />
			</div>
		</div>
	);
}
