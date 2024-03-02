import { supabase } from "@/lib/supabase-client";

export const signUpWithEmailAndPassword = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    return { data, error }
}
export const signInWithEmailAndPassword = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    return { data, error }
}