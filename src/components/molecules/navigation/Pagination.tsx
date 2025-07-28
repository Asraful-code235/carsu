'use client';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ 
  currentPage = 1, 
  totalPages = 10,
  onPageChange 
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-start gap-[5px] w-full lg:w-auto">
      {/* Desktop pagination */}
      <div className="hidden lg:flex items-start gap-[5px]">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-[33px] h-[35px] rounded-md flex items-center justify-center font-dm-sans text-base leading-normal transition-colors ${
              page === currentPage
                ? 'bg-[#1D6EE7] text-white'
                : 'bg-white border border-[#E7E7F1] text-[#585D68] hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button 
            onClick={handleNextClick}
            className="flex items-center justify-center w-[100px] py-2 px-[33px] hover:bg-gray-50 rounded-md transition-colors"
          >
            <span className="text-[#1D6EE7] font-dm-sans text-base leading-normal">
              Next
            </span>
          </button>
        )}
      </div>

      {/* Mobile pagination */}
      <div className="flex lg:hidden items-start gap-[5px] w-full">
        {pages.slice(0, 5).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`flex-1 h-[35px] rounded-md flex items-center justify-center transition-colors ${
              page === currentPage
                ? 'bg-[#1D6EE7]'
                : 'bg-white border border-[#E7E7F1] hover:bg-gray-50'
            }`}
          >
            <span className={`font-dm-sans text-base leading-normal ${
              page === currentPage ? 'text-white' : 'text-[#585D68]'
            }`}>
              {page}
            </span>
          </button>
        ))}
        {currentPage < totalPages && (
          <button 
            onClick={handleNextClick}
            className="flex-1 h-[35px] rounded-md flex items-center justify-center px-2 hover:bg-gray-50 transition-colors"
          >
            <span className="text-[#1D6EE7] font-dm-sans text-base leading-normal">
              Next
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
