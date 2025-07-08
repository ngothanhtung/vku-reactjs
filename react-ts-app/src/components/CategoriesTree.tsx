import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ICategory {
    id: number;
    name: string;
    slug: string
}
const CategoriesTree = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const url = 'https://api.escuelajs.co/api/v1/categories';
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data: ICategory[] = await response.json();
                setCategories(data);
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
        fetchCategories();
    }, []);
  const [searchParams] = useSearchParams();
  const activeCatId = searchParams.get("cat_id");

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      {isLoading ? (
        <ul className="space-y-2 mb-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li key={idx}>
              <Skeleton height={20} width={120} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          <li>
            <Link
              className={`font-medium hover:font-bold px-2 py-1  ${!activeCatId ? 'bg-blue-500 rounded text-white' : 'text-blue-600'}`}
              to={`/products`}
            >
              Tất cả
            </Link>
          </li>
          {categories.map((cat) => {
            const isActive = activeCatId === String(cat.id);
            return (
              <li key={cat.id}>
                <Link
                  className={`font-medium hover:font-bold px-2 py-1  ${isActive ? 'bg-blue-500 rounded text-white border-blue-500' : 'text-blue-600'}`}
                  to={`/products?cat_id=${cat.id}`}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default CategoriesTree