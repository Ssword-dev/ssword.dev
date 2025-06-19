import { ReactElement, useEffect, useState } from "react";

interface TypewriterProps {
  text: string[];
  speed?: number; // ms per character when typing
  deleteSpeed?: number; // ms per character when deleting
  pause?: number; // ms pause after typing
  loop?: boolean;
  textCursor?: ReactElement<React.JSX.IntrinsicElements["span"], "span">; // default is |
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  deleteSpeed = 30,
  pause = 1500,
  loop = true,
  textCursor,
}) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = text[index % text.length];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, speed);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, deleteSpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (loop ? (prev + 1) % text.length : prev + 1));
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, text, speed, deleteSpeed, pause, loop]);

  return (
    <span>
      {displayed}
      {textCursor}
    </span>
  );
};

export default Typewriter;
