const Header = ({header}) => {
    return (
        <h1>{header}</h1>
    )
}

const CourseDetail = ({course}) => {
    return (
        <div> 
            <h2>{course.name}</h2>
            { course.parts.map( (element) => <Part key={element.id} part={element} /> ) }
            <Total  parts={course.parts} />
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
const Total = ({parts}) => {
    const total = parts.reduce( (sum , current ) => sum+current.exercises ,0 ) 
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({courses} ) => {
    return (
        <div>
            <Header header = "Web development curriculum" />
            { courses.map( (course) => <CourseDetail key={course.id} course={course} /> ) }
        </div>
    )
} 
export default Course 