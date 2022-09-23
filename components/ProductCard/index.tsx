import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { Product as ProductType } from "../fake-data";
import {
	Product,
	ImageWrapper,
	ProductDetail,
	ProductTitle,
	ProductDescription,
	ProductPrice,
	Parallel,
} from "./index.style";

interface ProductCardProps {
	product: ProductType;
	all?: boolean;
}

const ProductCard = ({ product, all }: ProductCardProps) => {
	const { id, image, title, description, price } = product;
	const markRef = useRef();
	const handleScroll = () => {
		if (markRef.current.getBoundingClientRect().y < 500) {
			markRef.current.style.setProperty('--width', '100%')
			console.log(markRef.current.getBoundingClientRect().y)
		}
    }
	useEffect(() => {
	    window.addEventListener('scroll', handleScroll);
	    return () => {
	      window.removeEventListener('scroll', handleScroll);
	    };
	}, [])
	return (
		<Product key={id}>
			<ImageWrapper>
				<Image src={image} alt="product" layout="fill" objectFit="cover" />
			</ImageWrapper>
			<ProductDetail>
				<Link href={`/product/${id}`} passHref>
					<ProductTitle ref={markRef}>{title}</ProductTitle>
				</Link>
				<ProductDescription $all={all}>
					{description}
				</ProductDescription>
				<ProductPrice>${price}</ProductPrice>
			</ProductDetail>
		</Product>
	)
}

export default ProductCard;