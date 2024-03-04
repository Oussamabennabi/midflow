import Stack from "expo-router/stack";

const Layout = () => {
  return <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="settings" />
    <Stack.Screen name="profile-setup" />
  </Stack>;
};

export default Layout