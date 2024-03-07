import { useAuth } from '@/store/auth'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const LoginLayout = ({ children }: Props) => {
  const { logout } = useAuth()

  return (
    <div>
      <nav className='flex justify-between items-center p-4 border-b'>
        LOGIN NAV
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default LoginLayout
