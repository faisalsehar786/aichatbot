"use server";
import { createSupabaseServerClient } from "@/lib/supabase";
export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo}:any){
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
      data: {
        full_name:data.full_name,
        display_name:data.full_name,
        role: 'user',
      },
    },
  });

  return JSON.stringify(result)
}

export async function signInWithEmailAndPassword(data: any) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result)
}
   
