import { apiClient } from '@/lib/api'
import {
  GetProductsListParams,
  Product,
  ProductsListResponse,
} from '@/services/products/products.type'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetProductsList = ({
  limit,
  skip,
  enabled = true,
}: GetProductsListParams) => {
  return useQuery({
    queryKey: ['get-product-list', limit, skip],
    queryFn: () =>
      apiClient.get<ProductsListResponse>(
        `/products?limit=${limit}&skip=${skip}`
      ),
    retry: 0,
    enabled,
  })
}

export const useGetProduct = ({
  id,
  enabled,
}: {
  id: string
  enabled: boolean
}) => {
  return useQuery({
    queryKey: ['get-product', id],
    queryFn: () => apiClient.get<Product>(`/products/${id}`),
    retry: 0,
    enabled: enabled,
  })
}

export const useGetCategoriesList = () => {
  return useQuery({
    queryKey: ['get-categories-list'],
    queryFn: () => apiClient.get<string[]>(`/products/categories`),
    retry: 0,
  })
}

export const usePostProduct = () => {
  return useMutation({
    mutationKey: ['create-products'],
    mutationFn: (data: Product) =>
      apiClient.post<Product>(`/products/add`, data),
    retry: 0,
  })
}

export const usePutProduct = () => {
  return useMutation({
    mutationKey: ['update-products'],
    mutationFn: (data: Product) => {
      const param: any = { ...data }
      delete param.id
      return apiClient.put<Product>(`/products/${data.id}`, param)
    },
    retry: 0,
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ['delete-products'],
    mutationFn: ({ id }: { id: string }) => {
      return apiClient.delete<Product>(`/products/${id}`)
    },
    retry: 0,
  })
}
