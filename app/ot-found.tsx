import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import Typography from "@/components/ui/Typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Typography text="This screen doesn't exist." />
        <Link href="/home">
          <Typography text="Go to home screen!" />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
