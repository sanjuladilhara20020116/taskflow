export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <p>
        Page {currentPage} of {totalPages}
        <span>{totalItems} tasks found</span>
      </p>

      <div className="pagination-actions">
        <button
          type="button"
          className="secondary-button"
          disabled={currentPage <= 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
        >
          Previous
        </button>

        <button
          type="button"
          className="secondary-button"
          disabled={currentPage >= totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}