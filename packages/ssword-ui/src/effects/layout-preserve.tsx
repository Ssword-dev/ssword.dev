import { ReactElement } from "react";

interface LayoutPreservationProps {
  height: number;
  width: number;
  children: ReactElement;
}

// for those wondering why i dont import FC,
// its cuz it makes more sense with the React namespace
const LayoutPreservation: React.FC<LayoutPreservationProps> = ({
  height,
  width,
  children,
}) => {
  return (
    <div
      style={{
        minHeight: height,
        minWidth: width,
      }}
      className="h-fit w-fit"
      data-ui-role="layout-preservation"
      aria-hidden
    >
      {children}
    </div>
  );
};

LayoutPreservation.displayName = "layout-preserve";

export default LayoutPreservation;
