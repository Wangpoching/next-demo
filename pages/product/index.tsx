import { Product } from "../../fake-data";
import ProductCard from "../../components/ProductCard";
import { PageTitle, ProductGallery } from "./index.style";
import useSWR from 'swr'; 

const fetcher = (url: string) =>
		fetch(`https://fakestoreapi.com${url}`).then((res) => res.json());

const Home = () => {
	const { data: products } = useSWR<Product[]>('/products', fetcher);
	
	if (!products) return <div>loading</div>;

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

export default Home;