import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../ui/IconButton";
import { COLOR_SHADES } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import useWarmupBrowser from "@/hooks/useWarmupBrowser";
import { router } from "expo-router";
enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}
const SocialButtons = () => {
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
  // const signinWithFacebook = ()=> {

  // }
  return (
    <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
      <IconButton
        onPress={() => onSelectAuth(Strategy.Facebook)}
        icon={
          <FontAwesome
            name="facebook-f"
            size={28}
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
      <IconButton
        onPress={() => onSelectAuth(Strategy.Google)}
        icon={
          <FontAwesome
            name="google"
            size={28}
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
      
      <IconButton
        onPress={() => onSelectAuth(Strategy.Apple)}
        icon={
          <FontAwesome
            name="apple"
            size={28}
            color={COLOR_SHADES.gray.primary}
          />
        }
      />
    </View>
  );
};

export default SocialButtons;
