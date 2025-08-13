const Course = ({ course }) => {
  const Content = ({ parts }) => {
    const Part = ({ part }) => {
      return (
        <div>
          <p>{part.name} {part.exercises}</p>
        </div>
      );
    };

    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts} />
      <strong>total of exercises {total}</strong>
    </div>
  );
};

export default Course;
