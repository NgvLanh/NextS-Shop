import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationCustomProps {
  data: any;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function PaginationCustom({
  data,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationCustomProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            type='button'
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>

        {(() => {
          const totalPages = Math.ceil(data.length / pageSize);
          const items = [];

          if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
              items.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    type='button'
                    isActive={currentPage === i}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          } else {
            items.push(
              <PaginationItem key={1}>
                <PaginationLink
                  type='button'
                  isActive={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            );

            if (currentPage <= 3) {
              for (let i = 2; i <= 3; i++) {
                items.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      type='button'
                      isActive={currentPage === i}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              items.push(<PaginationEllipsis key='ellipsis-end' />);
            } else if (currentPage >= totalPages - 2) {
              items.push(<PaginationEllipsis key='ellipsis-start' />);
              for (let i = totalPages - 2; i < totalPages; i++) {
                items.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      type='button'
                      isActive={currentPage === i}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            } else {
              items.push(<PaginationEllipsis key='ellipsis-start' />);
              for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                items.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      type='button'
                      isActive={currentPage === i}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              items.push(<PaginationEllipsis key='ellipsis-end' />);
            }

            items.push(
              <PaginationItem key={totalPages}>
                <PaginationLink
                  type='button'
                  isActive={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return items;
        })()}

        <PaginationItem>
          <PaginationNext
            type='button'
            onClick={() =>
              setCurrentPage(
                Math.min(currentPage + 1, Math.ceil(data.length / pageSize))
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
