import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import { memo } from "react";
const SvgComponent = (props: SvgProps) => (
  <Svg width={72} height={72} fill="none" {...props}>
    <G clipPath="url(#a)">
      {/* <Path
        fill="#0F67FE"
        d="M58.5 0h-45C6.044 0 0 6.044 0 13.5v45C0 65.956 6.044 72 13.5 72h45C65.956 72 72 65.956 72 58.5v-45C72 6.044 65.956 0 58.5 0Z"
      /> */}
      <Path
        stroke="#fff"
        strokeWidth={4.5}
        d="M18 36h11.25A6.75 6.75 0 0 1 36 42.75V54M54 36H42.75A6.75 6.75 0 0 1 36 29.25V18"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h72v72H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const LogoSvg = memo(SvgComponent);
export default LogoSvg;
