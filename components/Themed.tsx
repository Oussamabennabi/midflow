import {
  View as DefaultView,
  ScrollView as DefaultScrollView,
} from "react-native";

import { useTheme } from "@/providers/theme-color-provider";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];



export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const {colors} = useTheme()

  return <DefaultView style={[{backgroundColor:colors.primary_bg },style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, ...otherProps } = props;
  const {colors} = useTheme()

  return (
      <DefaultScrollView 
      style={[{backgroundColor:colors.primary_bg }, style]} {...otherProps} 
      />
  );
}
