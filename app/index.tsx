import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const Index = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  //   const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return null;
  if (sessionId) router.replace("/settings");
  if (!sessionId) router.replace("/auth/signin");
};

export default Index;
