const Header = ({header}) => {
    return (
        <h1>{header}</h1>
    )
}

const Part = ({part}) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}
const Total = ({parts}) => {
    const total = parts.reduce( (sum , current ) => sum+current.exercises ,0 ) 
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({course} ) => {
    return (
        <div>
            <Header header={course.name} />
            { course.parts.map ( (element) => < Part key = {element.id} part={element} />  ) }
            <Total parts={course.parts} />
        </div>
    )
} 
export default Course 