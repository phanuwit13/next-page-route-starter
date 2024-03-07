import { ROLE_PERMISSION } from '@/constants/permission'
import { useAuth } from '@/store/auth'
import { useEffect, useState } from 'react'

const PermissionButton = ({
  children,
  permission,
}: {
  children: React.ReactNode
  permission: keyof typeof ROLE_PERMISSION
}) => {
  const [isPermission, setIsPermission] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!permission) {
      setIsPermission(true)
    } else {
      if (user?.permission.includes(permission)) {
        setIsPermission(true)
      } else {
        setIsPermission(false)
      }
    }
  }, [permission, user])

  return <>{isPermission && children}</>
}

export default PermissionButton
