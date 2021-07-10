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
   <main className="h-screen flex items-center justify-center bg-gray-300">
     <form 
     onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
     >

      <h1 
        className="text-center my-4 text-2xl"
      > Faça seu login</h1>

      <input 
        type="email" 
        name="email" 
        id="email"
        placeholder="email@mail.com"
        className="border-2 border-gray-600 rounded px-4 py-2"
        {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

      <input 
        type="password"
        name="password" 
        id="password"
        className="border-2 border-gray-600 rounded px-4 py-2 my-2"
        placeholder="******"
        {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

      <button 
        type="submit"
        className="my-4 bg-gray-500 py-2 rounded text-white"
      >Entrar</button>
     </form>
   </main>
  )
}
