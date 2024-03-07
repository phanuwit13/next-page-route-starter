import { useFormLogin } from '@/components/Pages/Login/FormLogin/FormLogin.hook'

interface Props {}

const FormLogin = (props: Props) => {
  const { form, handleSubmit } = useFormLogin()

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <fieldset>
        <input
          type='text'
          placeholder='Username'
          className='border px-2 py-1 w-full'
          {...form.fieldUsername}
        />
        {form.errors.username && (
          <p className='text-[12px] text-red-500'>
            {form.errors.username.message}
          </p>
        )}
      </fieldset>
      <fieldset>
        <input
          type='password'
          placeholder='Password'
          className='border px-2 py-1 w-full'
          {...form.fieldPassword}
        />
        {form.errors.password && (
          <p className='text-[12px] text-red-500'>
            {form.errors.password.message}
          </p>
        )}
      </fieldset>
      <button type='submit' className='border py-1 bg-green-500 text-white'>
        Login
      </button>
    </form>
  )
}

export default FormLogin
