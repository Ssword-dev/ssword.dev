import React, { HTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const frameVariants = cva('frame', {
  variants: {
    preset: {
      video: 'preset-video',
      avatar: 'preset-avatar',
      image: 'preset-image',
      content: 'preset-content'
    },
    orientation: {
      portrait: 'portrait',
      landscape: 'landscape',
    },
  },
  defaultVariants: {
    preset: "content",
    orientation: 'landscape'
  },
});

type FrameProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement> & VariantProps<typeof frameVariants>;

function Frame({ preset, orientation, children, className, ...props }: FrameProps) {
  return (
    <div className={frameVariants({ preset, orientation, className })} {...props}>
      {children}
    </div>
  );
}

export { Frame };
