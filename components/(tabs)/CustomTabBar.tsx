import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "../ui/Typography";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-color-provider";

const { width } = Dimensions.get("window");

const CustomeTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const {colors} = useTheme()
  return (
    <View style={[styles.mainContainer,{backgroundColor:colors.secondary_bg}]}>
      {state.routes.map((route, index: number) => {
        if (route.name == "PlaceholderScreen") {
          return <View key={index} style={styles.mainItemContainer}></View>;
        }

        const { options } = descriptors[route.key];
        const Icon = options.tabBarIcon;
        const iconStyles = options.tabBarIconStyle;

        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const activeColor = options.tabBarActiveTintColor;
        const inactiveColor = options.tabBarInactiveTintColor;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={styles.mainItemContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              style={{
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                {Icon && (
                  <Icon
                    color={isFocused?activeColor!:inactiveColor!}

                    focused={isFocused}
                    size={24}
                    {...{ iconStyles }}
                  />
                )}

                <Typography
                  style={{
                    color: isFocused ? activeColor! : inactiveColor!,
                  }}
                  text={label}
                  size="sm"
                />
              </View>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* settings icon */}

      <View
        style={styles.mainItemContainer}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/settings")}
          style={{
            borderRadius: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <AntDesign
              name="setting"
              size={24}
              color={colors.icon_color_sc}
            />

            <Typography 
            text={"Settings"} 
            style={{
              color: colors.icon_color_sc,
            }}
            size="sm" />
          </View>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    borderRadius: 25,
    left:7,
    width:width-14,
    justifyContent:"space-between",
    paddingHorizontal:10,
    paddingVertical:10,

  },
  mainItemContainer: {
    borderRadius: 1,
    paddingVertical: 6,
    paddingHorizontal: 1,
  },
});

export default CustomeTabBar;
