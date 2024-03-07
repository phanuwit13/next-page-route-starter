import { useAuth } from '@/store/auth'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  const { logout } = useAuth()

  return (
    <div>
      <nav className='flex justify-between items-center p-4 border-b'>
        <div>NEXT.JS APP ROUTE</div>
        <button onClick={() => logout()} className='border px-2 py-1'>
          Logout
        </button>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
