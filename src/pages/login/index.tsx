import LoginLayout from '@/components/Layout/LoginLayout'
import FormLogin from '@/components/Pages/Login/FormLogin/FormLogin'
import { NextPageWithLayout } from '../_app'

interface Props {}

const LoginPage: NextPageWithLayout = (props: Props) => {
  return (
    <div className='max-w-[425px] m-auto mt-10 border p-8'>
      <FormLogin />
    </div>
  )
}

LoginPage.getLayout = (page) => <LoginLayout>{page}</LoginLayout>
LoginPage.guard = 'Guest'

export default LoginPage
