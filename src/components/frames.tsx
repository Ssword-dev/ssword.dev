import React, { ReactNode } from "react";
import { default as cx } from "clsx";

type FrameProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: Record<string, boolean>;
};

const Frame: React.FC<FrameProps> = ({
  children = null,
  className = "",
  style = {},
  variant = {},
}) => {
  return (
    <div className={cx(className, variant)} style={style}>
      {children}
    </div>
  );
};

type FlexFrameProps = FrameProps;

const FlexFrame: React.FC<FlexFrameProps> = (props) => (
  <Frame {...props} className={cx("flex", props.className)} />
);

export { FlexFrame, Frame };
