import {
  useDeleteProduct,
  useGetProductsList
} from '@/services/products/products'
import { useSearchParams } from 'next/navigation'

interface Props {
  children: React.ReactNode
  productId: string
}

const DeleteProductButton = ({ children, productId }: Props) => {
  const searchParams = useSearchParams()

  const limit = searchParams.get('limit') || '10'
  const skip = searchParams.get('skip') || '0'

  const mutate = useDeleteProduct()

  const { refetch } = useGetProductsList({
    limit: Number(limit),
    skip: Number(skip),
    enabled: false,
  })

  const onDelete = () => {
    mutate.mutateAsync(
      { id: productId },
      {
        onSuccess: () => {
          alert('success')
          refetch()
        },
        onError: (err) => {
          alert(`error : ${err.message}`)
        },
      }
    )
  }

  return (
    <button onClick={onDelete} type='button' className='border py-1 px-2'>
      {children}
    </button>
  )
}

export default DeleteProductButton
