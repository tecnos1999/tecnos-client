import { Metadata } from "next";
import ProductService from "@/shared/products/service/ProductService";
import ProductSidebar from "@/core/products/components/ProductSidebar";
import ProductDetails from "@/core/products/components/ProductDetails";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;

  return {
    title: `Product - ${slug}`,
    description: `Details for product ${slug}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } =  params;
  const productService = new ProductService();

  try {
    const product = await productService.getProductBySku(slug);

    if (!product) {
      return <div className="mt-[104px] md:mt-[188px] text-center text-red-500">Product not found</div>;
    }
    
    return (
      <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
          <ProductSidebar images={product.images || null} name={product.name} />
          <ProductDetails product={product} />
        </div>
      </section>
    );
  } catch (error) {
    return <div className="mt-[104px] md:mt-[188px] text-center text-red-500">Failed to load product</div>;
  }
}
