'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
export async function login(formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
    console.log("Trying to login with:", data.email);

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.error("Login error:", error); 
    redirect('/error')
  }
  revalidatePath('/', 'layout')
    console.log("successfu l Login")

  redirect('/')
}
export async function signup(formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    console.error("Login error:", error);
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  console.log("successfu l singup")
  redirect('/')
}