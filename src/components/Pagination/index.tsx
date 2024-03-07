import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
  itemsPerPage: number
  total: number
  currentPage: number
}

function Pagination({ itemsPerPage, total, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  const pageCount = Math.ceil(total / itemsPerPage)

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % total
    const query: { [key: string]: string } = {}
    params.forEach((item, key) => {
      query[key] = item
    })
    query['skip'] = String(newOffset)
    query['limit'] = String(itemsPerPage)

    const paramData = Object.keys(query)
      .map((item) => `${item}=${query[item]}`)
      .join('&')

    const path = pathname + `${paramData ? `?${paramData}` : ''}`
    router.push(path)
  }


  return (
    <>
      <ReactPaginate
        breakLabel='...'
        nextLabel={">"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          "<"
        }
        initialPage={(currentPage || 1) - 1}
        className='flex items-center'
        nextLinkClassName='rounded-r cursor-pointer relative items-center px-2 py-1.5 text-[12px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex'
        breakLinkClassName='relative items-center px-2 py-1 text-[12px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 inline-flex'
        pageLinkClassName='cursor-pointer relative items-center px-2.5 py-1 text-[12px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex'
        previousLinkClassName='rounded-l cursor-pointer relative items-center px-2 py-1.5 text-[12px] font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex'
        activeLinkClassName='cursor-pointer relative items-center px-2.5 py-1 text-[12px] font-semibold text-white bg-green-600 ring-1 ring-inset ring-green-600 hover:bg-green-800 focus:z-20 focus:outline-offset-0 inline-flex'
      />
    </>
  )
}

export default Pagination