import { useTheme } from "@/providers/theme-color-provider";
import React from "react";
import ContentLoader, {
  Rect,
  IContentLoaderProps,
} from "react-content-loader/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");

const DoctorSmallCardSkeleton = (props: IContentLoaderProps) => {
  const { colors } = useTheme();

  return (
    
    <ContentLoader
    style={{
        borderRadius: 10,
        backgroundColor: colors.secondary_bg,
        flexDirection: "row",
        position: "relative",
        gap:10
      }}

      speed={2}
      width={width-20}
      height={120}
      viewBox={`0 0 ${width} 120`}
      backgroundColor={colors.secondary_text}
      foregroundColor={colors.secondary_bg}
      {...props}
    >

      <Rect x="135" y="14" rx="5" ry="5" width="170" height="18" />
      <Rect x="27" y="157" rx="5" ry="5" width="130" height="10" />
      <Rect x="15" y="5" rx="10" ry="10" width="100" height="100" />
      <Rect x="135" y="42" rx="5" ry="5" width="130" height="16" />
      <Rect x="135" y="70" rx="5" ry="5" width="34" height="15" />

    </ContentLoader>
  );
};

export default DoctorSmallCardSkeleton;
