import Stack from "expo-router/stack";

const Layout = () => {
  return <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="signin" />
    <Stack.Screen name="signup" />
    <Stack.Screen name="verify-email" options={{presentation:"modal"}} />
  </Stack>;
};

export default Layout