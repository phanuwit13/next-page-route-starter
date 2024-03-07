

import PermissionButton from '@/auth/PermissionButton'
import Link from 'next/link'
import { Controller } from 'react-hook-form'
import { useProductItem } from './ProductItem.hook'

type Props = {
  productId?: string
}

const ProductItem = ({ productId }: Props) => {
  const { productsResponse, categoryResponse, form } = useProductItem({
    id: productId,
  })

  return (
    <div>
      ProductItem {productsResponse?.data.id}
      <form onSubmit={form.handleSubmit} className='mt-8'>
        <div className='grid grid-cols-10 gap-y-4'>
          <div className='col-span-2'>Title</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedTitle}
            />
          </div>
          <div className='col-span-2'>Description</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedDescription}
            />
          </div>
          <div className='col-span-2'>Price</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedPrice}
            />
          </div>
          <div className='col-span-2'>DiscountPercentage</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedDiscountPercentage}
            />
          </div>
          <div className='col-span-2'>Rating</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedRating}
            />
          </div>
          <div className='col-span-2'>Brand</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedBrand}
            />
          </div>
          <div className='col-span-2'>Category</div>
          <div className='col-span-8'>
            <Controller
              control={form.control}
              name='category'
              render={({ field }) => {
                return (
                  <select
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                    }}
                    className='border-2 py-1 px-2 w-full max-w-[235px]'
                  >
                    {categoryResponse?.data.map((item) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                )
              }}
            />
          </div>
          <div className='col-span-2'>Thumbnail</div>
          <div className='col-span-8'>
            <input
              type='text'
              className='border-2 py-1 px-2'
              {...form.filedThumbnail}
            />
          </div>
          <div className='col-span-2'>Images</div>
          <div className='col-span-8 flex gap-1 flex-col'>
            {form.fieldImageArray.fields?.map((field, index) => (
              <fieldset key={field.id} className='w-full flex gap-2'>
                <input
                  className='border-2 py-1 px-2 w-full'
                  {...form.register(`images.${index}.value`)}
                />
                <button
                  onClick={() => {
                    form.fieldImageArray.remove(index)
                  }}
                  className='py-1 px-2 bg-red-500 text-white'
                >
                  delete
                </button>
              </fieldset>
            ))}
            <button
              type='button'
              className='border border-dashed py-1'
              onClick={() => {
                form.fieldImageArray.append({
                  value: '',
                })
              }}
            >
              Add
            </button>
          </div>
        </div>
        <PermissionButton
          permission={
            productId ? 'PRODUCT_DETAIL_PAGE_DELETE' : 'PRODUCT_CREATE_PAGE'
          }
        >
          <button
            type='submit'
            className='mt-8 border py-1 bg-green-500 text-white px-4'
          >
            SAVE
          </button>
        </PermissionButton>
        <Link
          href={'/products'}
          type='button'
          className='mt-8 ml-2 border-2 py-1 text-gray-500 px-4'
        >
          BACK
        </Link>
      </form>
    </div>
  )
}

export default ProductItem
