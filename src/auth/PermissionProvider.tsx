import ForBiddenPage from '@/components/ForbiddenPage'
import SpinnerPage from '@/components/SpinnerPage'
import { useAuth } from '@/store/auth'
import { useEffect, useState } from 'react'

const PermissionProvider = ({
  children,
  permission,
}: {
  children: React.ReactNode
  permission: string[]
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPermission, setIsPermission] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!permission.length) {
      setIsPermission(true)
      setIsLoading(false)
    } else {
      if (permission.some((pmsPage) => user?.permission.includes(pmsPage))) {
        setIsPermission(true)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setIsPermission(false)
      }
    }
  }, [permission, user])

  if (isLoading) return <SpinnerPage />

  return <div>{!isPermission ? <ForBiddenPage /> : children}</div>
}

export default PermissionProvider
