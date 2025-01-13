import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
	Document,
	Image,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from '@react-pdf/renderer';
import { chunk } from 'typedash';

import { FullProduct, ProductsByCategory } from '@/lib/types';

const styles = StyleSheet.create({
	page: {
		padding: 30,
		flexDirection: 'column',
	},
	grid: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
		justifyContent: 'flex-start',
	},
	card: {
		width: '30%',
		height: 200,
		border: '1 solid #ccc',
		padding: 10,
		marginBottom: 10,
	},
	image: {
		width: '100%',
		height: 150,
		objectFit: 'contain',
	},
	productName: {
		fontSize: 12,
		fontWeight: 600,
	},
	price: {
		color: '#666300',
		fontSize: 16,
		fontWeight: 700,
		marginTop: 5,
	},
	pageNumber: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		fontSize: 12,
		color: '#666',
	},
	brand: {
		position: 'absolute',
		bottom: 30,
		left: 30,
		fontSize: 12,
		color: 'hsl(58, 100%, 30%)',
	},
	coverPage: {
		padding: 0,
		margin: 0,
		position: 'relative',
		width: '100%',
		height: '100%',
	},
	coverContainer: {
		position: 'relative',
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	coverImage: {
		width: '100%',
		height: 'auto',
		maxHeight: '100%',
	},
	dateText: {
		color: '#DDDBFF',
		fontSize: 18,
		position: 'absolute',
		bottom: 30,
		right: 30,
	},
	link: {
		fontSize: 20,
		textDecoration: 'none',
		color: 'hsl(58, 100%, 50%)',
	},
	categoryHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#333',
		textTransform: 'uppercase',
		borderBottom: '2 solid #ccc',
		paddingBottom: 10,
	},
});

const ITEMS_PER_PAGE = 9;

const ProductCard = ({
	product,
}: {
	product: FullProduct & { optimizedImageUrl: string };
}) => (
	<View style={styles.card}>
		<Text style={styles.productName}>{product.name}</Text>
		<Image style={styles.image} src={product.optimizedImageUrl} />
		<Text style={styles.price}>${product.price}</Text>
	</View>
);

const CoverPageImage = ({
	optimizedCoverUrl,
}: {
	optimizedCoverUrl: string;
}) => {
	const currentDate = format(new Date(), 'dd MMMM yyyy', { locale: es });
	const formattedDate =
		currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

	return (
		<Page size="A4" style={styles.coverPage}>
			<View style={styles.coverContainer}>
				<Image src={optimizedCoverUrl} style={styles.coverImage} />
				<Text
					style={{
						fontSize: 20,
						fontWeight: 800,
						position: 'absolute',
						bottom: 110,
						left: 14,
					}}
				>
					<Link src="https://santytec.com.ar" style={styles.link}>
						santytec.com.ar
					</Link>
				</Text>
				<Text style={styles.dateText}>{formattedDate}</Text>
			</View>
		</Page>
	);
};

const CategoryPages = ({ category }: { category: ProductsByCategory }) => {
	const productPages = chunk(category.products, ITEMS_PER_PAGE);
	return (
		<>
			{productPages.map((pageProducts, pageIndex) => (
				<Page
					key={`${category.category}-${pageIndex}`}
					size="A4"
					style={styles.page}
				>
					{pageIndex === 0 && (
						<Text style={styles.categoryHeader}>{category.category}</Text>
					)}
					<View style={styles.grid}>
						{pageProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</View>
					<Text style={styles.brand}>SantyTec</Text>
					<Text
						style={styles.pageNumber}
						render={({ pageNumber, totalPages }) =>
							`${pageNumber} / ${totalPages}`
						}
					/>
				</Page>
			))}
		</>
	);
};

export const CatalogDocument = ({
	products,
	optimizedCoverUrl,
}: {
	products: ProductsByCategory[];
	optimizedCoverUrl: string;
}) => {
	return (
		<Document>
			<CoverPageImage optimizedCoverUrl={optimizedCoverUrl} />
			{products.map((category, index) => (
				<CategoryPages
					key={`${category.category}-${index}`}
					category={category}
				/>
			))}
		</Document>
	);
};
