import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "../../ui/pagination"
import { useShallow } from 'zustand/react/shallow'
import { useList } from "../../utils/stores"
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "usehooks-ts";

const Pagination = ({ isRefetching }: { isRefetching: boolean }) => {
  const theme = useTheme();
  console.log(theme.breakpoints.up('md'))
  const matches = useMediaQuery(theme.breakpoints.up('md').replace('@media ', ''))
  console.log(matches)
  const { currentPage, setCurrentPage, pages } = useList(
    useShallow(
      ({ currentPage, setCurrentPage, pages, isRefetching }) =>
        ({ currentPage, setCurrentPage, pages, isRefetching })
    )
  )

  const nextItems = pages - currentPage

  return (
    <PaginationUI disabled={isRefetching}>
      <PaginationContent>
        <PaginationItem aria-disabled={isRefetching || currentPage === 1}>
          <PaginationFirst
            onClick={() => setCurrentPage(1)}
            aria-disabled={isRefetching || currentPage === 1}
            disabled={isRefetching || currentPage === 1}
          />
        </PaginationItem>

        <PaginationItem aria-disabled={isRefetching || currentPage === 1}>
          <PaginationPrevious
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-disabled={isRefetching || currentPage === 1}
            disabled={isRefetching || currentPage === 1}
          />
        </PaginationItem>

        {currentPage > (matches ? 3 : 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {Array.from({ length: Math.min(pages, currentPage - 1, matches ? 3 : 1) }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationButton disabled={isRefetching} onClick={() => setCurrentPage(currentPage - i - 1)}>
              {currentPage - i - 1}
            </PaginationButton>
          </PaginationItem>
        )).reverse()}

        <PaginationItem>
          <PaginationButton isActive aria-disabled disabled>{currentPage}</PaginationButton>
        </PaginationItem>

        {Array.from({ length: Math.min(pages, nextItems, matches ? 3 : 1) }, (_, i) => (
          <PaginationItem key={i + currentPage}>
            <PaginationButton disabled={isRefetching} onClick={() => setCurrentPage(i + 1 + currentPage)}>
              {i + 1 + currentPage}
            </PaginationButton>
          </PaginationItem>
        ))}

        {nextItems > (matches ? 3 : 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem aria-disabled={isRefetching || nextItems === 0}>
          <PaginationNext
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-disabled={isRefetching || nextItems === 0}
            disabled={isRefetching || nextItems === 0}
          />
        </PaginationItem>
        <PaginationItem aria-disabled={isRefetching || nextItems === 0}>
          <PaginationLast
            onClick={() => setCurrentPage(pages)}
            aria-disabled={isRefetching || nextItems === 0}
            disabled={isRefetching || nextItems === 0}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  )
}

export default Pagination
