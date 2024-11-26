import ProductContainerPage from "@/components/ProductContainerPage";

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const {sku} = await params;
  return <ProductContainerPage sku={sku} />;
}
