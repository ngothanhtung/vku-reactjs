import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { id: number; name: string };
}

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/?slug=${slug}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();
        // API trả về mảng, lấy phần tử đầu tiên
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      {isLoading ? (
        <div className="flex gap-6">
          <Skeleton height={240} width={240} />
          <div className="flex-1 space-y-4">
            <Skeleton height={32} width={200} />
            <Skeleton height={24} width={100} />
            <Skeleton count={3} />
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : product ? (
        <div className="flex gap-6">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-60 h-60 object-cover rounded border"
            onError={e => (e.currentTarget.src = 'https://via.placeholder.com/240')}
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="text-blue-600 font-bold text-xl mb-2">${product.price}</div>
            <div className="mb-2 text-gray-700">{product.description}</div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">Danh mục: </span>
              <Link className="text-blue-600 hover:underline" to={`/products?cat_id=${product.category.id}`}>{product.category.name}</Link>
            </div>
            <Link to="/products" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Quay lại danh sách</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsPage;