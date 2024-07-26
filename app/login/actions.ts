"use server";
import { createSupabaseServerClient } from "@/lib/supabase";
export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: any;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
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
   
