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

const Course = ({course} ) => {
    return (
        <div>
            <Header header={course.name} />
            { course.parts.map ( (element) => < Part key = {element.id} part={element} />  ) }
        </div>
    )
} 
export default Course 