import { login } from '@/lib/actions/auth.actions';
 
export function LoginForm() {
    
  return (
    <form action={login}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}