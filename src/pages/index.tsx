import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
 
  function onSubmit(data) {  
    const {email, password} = data;

    if(email && password) {
      router.push('/admin')
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
