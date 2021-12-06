const Header = ({ course }) => {
  return <h1>{course}</h1>;
};
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};
const Parts = ({ parts }) => {
  return (
    <>
      {parts.map(({ id, part, exercises }) => (
        <Part key={id} part={part} exercises={exercises} />
      ))}
    </>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      id: 1,
      part: "Fundamentals of React",
      exercises: 10,
    },
    {
      id: 2,
      part: "Using props to pass data",
      exercises: 10,
    },
    {
      id: 3,
      part: "State of a component",
      exercises: 10,
    },
  ];

  const total = parts.reduce((acc, curValue) => {
    return acc + curValue.exercises;
  }, 0);

  return (
    <div>
      <Header course={course} />
      <Parts parts={parts} />
      <Total total={total} />
    </div>
  );
};

export default App;
