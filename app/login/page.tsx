import { Sign } from 'crypto'
import { login } from './actions'
import { signup } from './actions'
import SignIn from '@/components/ui/sign-in'
import SignOut from '@/components/ui/sign-out'
export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
      <SignIn/>
      <SignOut/>
    </form>
  )
}