'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signIn() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOAuth({provider: 'google'})

  if (error) {
    console.error("sign in error:", error); 
    redirect('/error')
  }
  revalidatePath('/', 'layout')
}

