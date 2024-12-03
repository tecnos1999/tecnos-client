'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import ProductService from "@/shared/products/service/ProductService";
import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { determinePath } from "@/utils/utils";
import { useRouter } from "next/navigation";

const ProductsContent: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const partnerName = decodeURIComponent(searchParams.get("partner") || "");
    const router = useRouter();
    const productsService = useMemo(() => new ProductService(), []);

    useEffect(() => {
        if (!partnerName) {
            setError("No partner specified in the URL.");
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await productsService.getProductsByPartner(
                    partnerName
                );
                setProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                const errorMessage =
                    typeof err === "string"
                        ? err
                        : err instanceof Error
                            ? err.message
                            : "Failed to fetch products";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [partnerName, productsService]);

    const redirectToProductDetails = (sku: string) => {
        const queryParams = new URLSearchParams({
            sku: encodeURIComponent(sku),
        });
        router.push(determinePath(`product?${queryParams.toString()}`));
    };

    if (loading) {
        return (
            <div className="text-center text-xl">Loading products...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-xl text-red-500">{error}</div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center text-xl">No products found for the partner.</div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <motion.div
                    key={product.sku}
                    className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
                    style={{ width: "270px" }}
                >
                    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                        <Image
                            src={product.images?.[0]?.url || "/fallback-image-url.jpg"}
                            alt={product.name || "Product Image"}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            unoptimized
                        />
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                            Nou
                        </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between h-[calc(100%-256px)]">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                            {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => redirectToProductDetails(product.sku)}
                                className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                            >
                                Vezi detalii
                            </button>

                            <motion.div
                                className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.2, rotate: 15 }}
                            >
                                <FontAwesomeIcon icon={faHeart} size="lg" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ProductsContent;
