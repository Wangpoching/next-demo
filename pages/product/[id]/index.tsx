import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Product as ProductType } from "../../../fake-data";
import ProductCard from "../../../components/ProductCard";
import { PageTitle, ProductContainer, BackLink } from "./index.style";

const fetcher = (url: string, id: string) => {
	return fetch(`https://fakestoreapi.com${url}/${id}`).then((res) =>
		res.json()
	);
};

const Product = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: product } = useSWR<ProductType>(
		id ? ['/products', id] : null,
		fetcher
	);

	if (!product) return <div>loading</div>;

	return (
		<>
			<PageTitle>商品詳細頁面</PageTitle>
			<BackLink>
				<Link href="/product">回產品列表</Link>
			</BackLink>
			<ProductContainer>
				<ProductCard product={product} all />
			</ProductContainer>
		</>
	);
};

export default Product;