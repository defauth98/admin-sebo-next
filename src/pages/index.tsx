import { useRouter } from 'next/router'
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { authContext } from '../context/authContext';

export default function Home() {
  const router = useRouter();
  const { login, isAuthenticated } = useContext(authContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  async function onSubmit(data) {  
    const {email, password} = data;

    if(email && password) {
      login(email, password)

      if(isAuthenticated) {
        router.push('/admin');
      }
    }
  }

  return (
   <main>
     <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="email" 
        name="email" 
        id="email"
        {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

      <input 
        type="password"
        name="password" 
        id="password"
        {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

      <button type="submit">Entrar</button>
     </form>
   </main>
  )
}
