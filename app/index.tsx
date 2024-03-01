import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase-client";

export default function IndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/two");
        console.log("redirected");
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/two");
        console.log("redirected");
      } else {
        router.replace("/(auth)/signin");
      }
    });
  }, []);
}
