import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../ui/IconButton";
import { useOAuth } from "@clerk/clerk-expo";
import useWarmupBrowser from "@/hooks/useWarmupBrowser";
import { useTheme } from "@/providers/theme-color-provider";
enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}
const SocialButtons = () => {
  const { colors } = useTheme();

  useWarmupBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        // router.back();
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
      <IconButton
        onPress={() => onSelectAuth(Strategy.Facebook)}
        icon={
          <FontAwesome
            name="facebook-f"
            size={28}
            color={colors.icon_color_pr}
          />
        }
      />
      <IconButton
        onPress={() => onSelectAuth(Strategy.Google)}
        icon={
          <FontAwesome name="google" size={28} color={colors.icon_color_pr} />
        }
      />

      <IconButton
        onPress={() => onSelectAuth(Strategy.Apple)}
        icon={
          <FontAwesome name="apple" size={28} color={colors.icon_color_pr} />
        }
      />
    </View>
  );
};

export default SocialButtons;
