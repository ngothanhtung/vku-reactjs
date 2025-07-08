import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  slug: string;
}


const ProductGrid = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [searchParams] = useSearchParams();
  const pageSize = 4;
  const pageParam = searchParams.get("page");
  const catIdParam = searchParams.get("cat_id");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const catId = catIdParam ? parseInt(catIdParam, 10) : 0;
  const offset = (page - 1) * pageSize;
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${pageSize}`;
  if(catId > 0){
    url = `https://api.escuelajs.co/api/v1/categories/${catId}/products?offset=${offset}&limit=${pageSize}`;
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: IProduct[] = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [url]);

  return (
    <div className="p-4 bg-white rounded shadow-md w-full  mx-auto">
      <h2 className="text-xl font-bold mb-4">Products</h2>
     
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: pageSize }).map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded p-4 flex flex-col items-center">
              <Skeleton height={120} width={120} className="mb-2" />
              <Skeleton width={100} height={20} className="mb-1" />
              <Skeleton width={60} height={16} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/products/${product.slug}`} key={product.id} className="bg-gray-100 rounded p-4 flex flex-col items-center hover:bg-blue-100 transition">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto object-cover rounded mb-2 border"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/96')}
              />
              <div className="font-medium text-center">{product.title}</div>
              <div className="text-blue-600 font-bold mt-1">${product.price}</div>
            </Link>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default ProductGrid;