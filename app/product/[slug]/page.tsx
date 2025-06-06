import ProductClient from './ProductClient';

// export default async function Page({ params }: { params: { slug: string } }) {
//   return <ProductClient slug={params.slug} />;
// }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProductClient slug={resolvedParams.slug} />;
}

