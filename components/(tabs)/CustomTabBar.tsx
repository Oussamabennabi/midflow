import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLOR_SHADES } from "@/constants/Colors";
import Typography from "../ui/Typography";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CustomeTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.mainContainer}>
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

        const color = options.tabBarActiveTintColor;
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
                    color={isFocused ? color! : COLOR_SHADES.gray.shade6}
                    focused={isFocused}
                    size={24}
                    {...{ iconStyles }}
                  />
                )}

                <Typography
                  style={{
                    color: isFocused ? color! : COLOR_SHADES.gray.shade6,
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
              color={COLOR_SHADES.gray.shade6}
            />

            <Typography text={"Settings"} size="sm" />
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
    backgroundColor: COLOR_SHADES.gray.shade15,
    borderRadius: 25,
    left:10,
    width:width-20,
    justifyContent:"space-between",
    paddingHorizontal:10
  },
  mainItemContainer: {
    borderRadius: 1,
    paddingVertical: 6,
    paddingHorizontal: 1,
  },
});

export default CustomeTabBar;
