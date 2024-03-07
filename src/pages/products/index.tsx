import MainLayout from '@/components/Layout/MainLayout'
import TableProductsList from '@/components/Pages/ProductsList/TableProductsList/TableProductsList'
import { ROLE_PERMISSION } from '@/constants/permission'
import { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'

type Props = {}

const ProductsPage: NextPageWithLayout = (props: Props) => {
  return (
    <div className='p-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-[24px]'>ProductsPage</h1>
        <Link
          className='border bg-green-500 text-white px-2 py-1'
          href={`/products/create`}
        >
          Create
        </Link>
      </div>
      <div>
        <TableProductsList />
      </div>
    </div>
  )
}

ProductsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
ProductsPage.guard = 'Auth'
ProductsPage.permission = [
  ROLE_PERMISSION.PRODUCT_PAGE,
  ROLE_PERMISSION.PRODUCT_PAGE_CREATE,
  ROLE_PERMISSION.PRODUCT_PAGE_UPDATE,
  ROLE_PERMISSION.PRODUCT_PAGE_DELETE,
]

export default ProductsPage
