import React from "react";

const concepts = [
  {
    title: "Components",
    description:
      "Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.",
    example: `<function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  {
    title: "JSX",
    description:
      "JSX is a syntax extension for JavaScript. It looks like HTML, but is used to describe UI in React.",
    example: `<h1>Hello, world!</h1>`,
  },
  {
    title: "Props",
    description:
      "Props are inputs to components. They are passed as attributes and allow data to flow from parent to child components.",
    example: `<Welcome name="Sara" />`,
  },
  {
    title: "State",
    description:
      "State is a built-in object that stores property values that belong to a component. When state changes, the component re-renders.",
    example: `const [count, setCount] = useState(0);`,
  },
  {
    title: "Lifecycle",
    description:
      "React components have lifecycle methods (or hooks in functional components) that let you run code at specific points in a component's life.",
    example: `useEffect(() => {
  // runs after render
}, []);`,
  },
];

export default function BasicConceptsOfReact() {
  return (
    <main className="prose mx-auto p-6">
      <h1>Basic Concepts of React</h1>
      <p>
        React is a popular JavaScript library for building user interfaces. Here
        are some of its core concepts:
      </p>
      <ul>
        {concepts.map((concept) => (
          <li key={concept.title} className="mb-6">
            <h2>{concept.title}</h2>
            <p>{concept.description}</p>
            <pre>
              <code>{concept.example}</code>
            </pre>
          </li>
        ))}
      </ul>
    </main>
  );
}
