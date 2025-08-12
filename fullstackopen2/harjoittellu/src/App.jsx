const App = () => {
  const Course = ({ course }) => {
    const all = course.parts.reduce((s, part) => s + part.exercises, 0);
    return (
      <div>
        <h1>{course.name}</h1>
        <Content parts={course.parts} />
        <strong>total of exercises {all}</strong>
      </div>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    );
  };

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

export default App;
