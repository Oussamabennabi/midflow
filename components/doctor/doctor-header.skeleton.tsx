import { useTheme } from "@/providers/theme-color-provider";
import ContentLoader, {
  Rect,
  Circle,
  IContentLoaderProps,
} from "react-content-loader/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const DoctorHeaderSkeleton = (props: IContentLoaderProps) => {
  const { colors } = useTheme();

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={170}
      viewBox={`-${width / 2 - 90} 0 ${width} 170`}
      backgroundColor={colors.secondary_text}
      foregroundColor={colors.secondary_bg}
      {...props}
    >
      <Rect x="28" y="118" rx="5" ry="5" width="130" height="10" />
      <Circle cx="13" cy="143" r="8" />
      <Rect x="28" y="138" rx="5" ry="5" width="130" height="10" />
      <Circle cx="13" cy="161" r="8" />
      <Rect x="27" y="157" rx="5" ry="5" width="130" height="10" />
      <Rect x="40" y="5" rx="10" ry="10" width="100" height="100" />
    </ContentLoader>
  );
};

export default DoctorHeaderSkeleton;
