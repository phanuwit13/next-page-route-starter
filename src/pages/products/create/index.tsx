import MainLayout from '@/components/Layout/MainLayout'
import ProductItem from '@/components/Pages/ProductDetail/ProductItem/ProductItem'
import { ROLE_PERMISSION } from '@/constants/permission'
import { NextPageWithLayout } from '@/pages/_app'

const ProductCreate: NextPageWithLayout = () => {

  return (
    <div className='max-w-[1200px] w-full m-auto p-8'>
      <ProductItem />
    </div>
  )
}
ProductCreate.getLayout = (page) => <MainLayout>{page}</MainLayout>
ProductCreate.guard = 'Auth'
ProductCreate.permission = [
  ROLE_PERMISSION.PRODUCT_CREATE_PAGE
]
export default ProductCreate
