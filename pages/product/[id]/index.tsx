import useSWR from 'swr';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Product as ProductType } from "../../../fake-data";
import ProductCard from "../../../components/ProductCard";
import { PageTitle, ProductContainer, BackLink } from "./index.style";

type Params = {
	id: string,
	accessToken: string;
};

const fetcher = (url: string, { id,  accessToken }: Params) => {
	return fetch(`http://localhost:8000${url}/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then((res) =>
		res.json()
	);
};

const Product = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: session, status } = useSession()
	const params = useMemo(
		() => ({ id, accessToken: session?.accessToken }),
		[id, session]
	);

	const { data: product, error } = useSWR<ProductType>(
		id && status === 'authenticated' ? ['/products', params] : null,
		fetcher
	);

	if (!product || error) return <div>loading</div>;

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