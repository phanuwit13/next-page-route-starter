import MainLayout from '@/components/Layout/MainLayout'
import ProductItem from '@/components/Pages/ProductDetail/ProductItem/ProductItem'
import { ROLE_PERMISSION } from '@/constants/permission'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

const ProductDetail: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <div className='max-w-[1200px] w-full m-auto p-8'>
      <ProductItem productId={router.query.id?.toString()} />
    </div>
  )
}
ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>
ProductDetail.guard = 'Auth'
ProductDetail.permission = [
  ROLE_PERMISSION.PRODUCT_DETAIL_PAGE,
  ROLE_PERMISSION.PRODUCT_DETAIL_PAGE_DELETE,
  ROLE_PERMISSION.PRODUCT_DETAIL_PAGE_UPDATE,
]
export default ProductDetail
