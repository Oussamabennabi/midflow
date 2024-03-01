import { supabase } from "@/lib/supabase-client";
import { router } from "expo-router";
import { useEffect } from "react";

export const useSupabaseAuth = () => {
    useEffect(() => {
        const main = async () => {
            await supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    router.replace("/(tabs)/two");
                    console.log('redirected')
                } else {
                    console.log("no user");
                }
            });

            supabase.auth.onAuthStateChange((_event, session) => {
                if (session) {
                    router.replace("/(tabs)/two");
                    console.log('redirected')

                } else {
                    console.log("no user");
                    // router.replace("/(auth)/login");
                }
            });

        }
        main()
    }, []);
}