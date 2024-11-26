import ProductContainerPage from "@/components/ProductContainerPage";

export default function ProductPage({ params }: { params: { sku: string } }) {
  const { sku } = params; 

  return <ProductContainerPage sku={sku} />;
}
