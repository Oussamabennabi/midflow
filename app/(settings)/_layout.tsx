import Stack from "expo-router/stack";

const Layout = () => {
  return <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="settings1" />
    <Stack.Screen name="profile-setup" />
  </Stack>;
};

export default Layout