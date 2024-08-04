import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginatorProps {
  previousAvaliable: boolean
  nextAvaliable: boolean
  handleNext: () => void
  handlePrevious: () => void
}

export function Paginator({
  handleNext,
  handlePrevious,
  nextAvaliable,
  previousAvaliable,
}: PaginatorProps) {
  return (
    <div
      data-testid="paginator"
      className="flex h-20 flex-row items-center justify-center gap-8 "
    >
      <button
        onClick={handlePrevious}
        disabled={!previousAvaliable}
        className="flex items-center text-lg text-blue-500 hover:text-blue-600 disabled:text-gray-500"
      >
        <ChevronLeft />
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={!nextAvaliable}
        className="flex items-center text-lg text-blue-500 hover:text-blue-600 disabled:text-gray-500"
      >
        Next
        <ChevronRight />
      </button>
    </div>
  )
}
