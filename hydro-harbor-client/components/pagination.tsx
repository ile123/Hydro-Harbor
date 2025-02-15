import { PaginationProps } from "@/types/props/PaginationProps";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          disabled={i === currentPage}
          className={`p-2 mx-1 rounded ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-dark dark:bg-[#393E46] dark:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="p-2 mx-1 bg-gray-200 text-dark dark:bg-[#393E46] dark:text-white rounded"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="p-2 mx-1 bg-gray-200 text-dark dark:bg-[#393E46] dark:text-white rounded"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
