import ProductClient from './ProductClient';

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductClient slug={params.slug} />;
}
