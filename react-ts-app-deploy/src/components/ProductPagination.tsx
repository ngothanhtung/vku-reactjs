import { useSearchParams } from "react-router";

interface ProductPaginationProps {
  total: number;
  pageSize?: number;
}

const ProductPagination = ({ total, pageSize = 4 }: ProductPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const totalPages = Math.ceil(total / pageSize);

  const goToPage = (p: number) => {
    searchParams.set("page", p.toString());
    setSearchParams(searchParams);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        className="px-3 py-1 rounded border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 disabled:opacity-50"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded border border-blue-500 ${p === page ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white hover:bg-blue-50'}`}
          onClick={() => goToPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 disabled:opacity-50"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ProductPagination;
