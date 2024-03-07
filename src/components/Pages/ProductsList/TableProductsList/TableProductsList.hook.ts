import { useGetProductsList } from "@/services/products/products"
import { useSearchParams } from "next/navigation"

const useTableProductsList = () => {
  const searchParams = useSearchParams()

  const limit = searchParams.get('limit') || '10'
  const skip = searchParams.get('skip') || '0'


  const { data: productsList, isLoading } = useGetProductsList({
    limit: Number(limit),
    skip: Number(skip),
  })

  return { productsList, isLoading, limit, skip }
}

export { useTableProductsList }

