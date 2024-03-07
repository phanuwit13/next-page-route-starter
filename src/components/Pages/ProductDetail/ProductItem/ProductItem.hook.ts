import {
  useGetCategoriesList,
  useGetProduct,
  usePostProduct,
  usePutProduct,
} from '@/services/products/products'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const schemaFormProduct = z.object({
  id: z.number(),
  title: z.string().trim().min(1, {
    message: 'please enter Password',
  }),
  description: z.string().trim().min(1, {
    message: 'please enter Password',
  }),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string().trim().min(1, {
    message: 'please enter Password',
  }),
  category: z.string().trim().min(1, {
    message: 'please enter Password',
  }),
  thumbnail: z.string().trim().min(1, {
    message: 'please enter Password',
  }),
  images: z.array(
    z.object({
      value: z.string().trim().min(1, {
        message: 'please enter Password',
      }),
    })
  ),
})

type SchemaFormProduct = z.infer<typeof schemaFormProduct>

const useProductItem = ({ id }: { id?: string }) => {
  const isCreate = id === undefined

  const { data: productsResponse } = useGetProduct({
    id: id || '',
    enabled: !isCreate,
  })
  const { data: categoryResponse } = useGetCategoriesList()
  const mutateCreateProduct = usePostProduct()
  const mutateUpdateProduct = usePutProduct()
  const router = useRouter()

  const { register, control, reset, handleSubmit } = useForm<SchemaFormProduct>(
    {
      defaultValues: {
        images: [],
      },
    }
  )

  const { fields, append, prepend, remove, move, insert } = useFieldArray({
    control: control,
    name: 'images',
  })

  useEffect(() => {
    if (productsResponse?.data) {
      reset({
        ...productsResponse.data,
        images: productsResponse.data.images.map((item) => {
          return {
            value: item,
          }
        }),
      })
    }
  }, [productsResponse?.data, reset])

  const onSubmit = (v: SchemaFormProduct) => {
    const mutate = isCreate ? mutateCreateProduct : mutateUpdateProduct
    const formData = { ...v, images: v.images.map((item) => item.value) }
    mutate.mutateAsync(formData, {
      onSuccess: () => {
        alert('save success')
        router.push('/products')
      },
      onError: (err) => {
        alert(`error : ${err.message}`)
      },
    })
  }

  const form = {
    filedTitle: register('title'),
    filedDescription: register('description'),
    filedPrice: register('price'),
    filedDiscountPercentage: register('discountPercentage'),
    filedRating: register('rating'),
    filedBrand: register('brand'),
    filedCategory: register('category'),
    filedThumbnail: register('thumbnail'),
    control,
    register,
    handleSubmit: handleSubmit(onSubmit),
    fieldImageArray: {
      fields,
      append,
      prepend,
      remove,
      move,
      insert,
    },
  }

  return { productsResponse, categoryResponse, form }
}

export { useProductItem }

