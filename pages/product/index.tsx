import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { Product } from "../../fake-data";
import ProductCard from "../../components/ProductCard";
import { PageTitle, ProductGallery } from "./index.style";

interface HomeProps {
	products: Product[];
}

const Home = ({ products }: HomeProps) => {
	return (
		<>
			<PageTitle>商品列表</PageTitle>
			<ProductGallery>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</ProductGallery>
		</>
	);
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const session = await getSession({ req: ctx.req });

	const res = await fetch(`http://localhost:8000/products`, {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});

	const products = await res.json();

	return {
		props: {
			products,
			session,
		},
	};
}

export default Home;