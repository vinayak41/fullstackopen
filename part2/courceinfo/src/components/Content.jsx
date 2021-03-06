import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const total = parts.reduce((acc, curValue) => {
    return acc + curValue.exercises;
  }, 0);
  return (
    <>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
      <Total total={total} />
    </>
  );
};

export default Content;
