
import PermissionButton from '@/auth/PermissionButton'
import Pagination from '@/components/Pagination'
import TableLoading from '@/components/TableLoading'
import { Product } from '@/services/products/products.type'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import DeleteProductButton from '../DeleteProductButton'
import { useTableProductsList } from './TableProductsList.hook'

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('id', {
    id: 'vmNo',
    cell: (info) => info.getValue(),
    header: () => <span>Product ID</span>,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('brand', {
    header: () => <span>Band</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: () => <span>category</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => <span>price</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('stock', {
    header: () => <span>stock</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('thumbnail', {
    header: () => <span>Image</span>,
    cell: (info) => (
      <div className='text-right'>
        <Image
          src={info.getValue()}
          alt=''
          width={500}
          height={500}
          className='w-12 h-12 object-cover'
        />
      </div>
    ),
  }),
  columnHelper.display({
    id: 'action',
    header: () => <div className='w-full min-w-[60px] text-center'>Action</div>,
    cell: (props) => (
      <div className='flex gap-2'>
        <PermissionButton permission='PRODUCT_PAGE_UPDATE'>
          <Link
            className='border py-1 px-2'
            href={`/products/${props.row.original.id}`}
          >
            Edit
          </Link>
        </PermissionButton>
        <PermissionButton permission='PRODUCT_PAGE_DELETE'>
          <DeleteProductButton productId={String(props.row.original.id)}>
            Delete
          </DeleteProductButton>
        </PermissionButton>
      </div>
    ),
  }),
]

const TableProductsList = () => {
  const { productsList, isLoading, limit, skip } = useTableProductsList()

  const table = useReactTable({
    data: productsList?.data.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return <TableLoading />
  }

  return (
    <div className='p-2 px-1 min-h-[398px] '>
      {productsList?.data.products.length ? (
        <div className='w-full overflow-x-auto px-2'>
          <table className='w-full'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className='text-gray-400 text-[12px] font-semibold text-start py-4 uppercase px-2'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='border-b border-dashed'>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='py-3 px-2 text-[14px]'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='min-h-[300px] flex justify-center items-center font-semibold text-gray-200'>
          Data Not found
        </div>
      )}

      {productsList?.data?.total && Number(limit) && (
        <div className='flex justify-end mt-4'>
          <Pagination
            currentPage={(Number(skip) + Number(limit)) / Number(limit)}
            itemsPerPage={Number(limit) || 5}
            total={productsList.data.total}
          />
        </div>
      )}
    </div>
  )
}

export default TableProductsList
