import ShowDetail from "./ShowDetail"

const Persons = ({personToShow,deletehandler}) => {
  return (
    <div>
      { personToShow.map(person => <ShowDetail key={person.id} person={person} deletePerson={deletehandler} />)}
    </div>
  )
}

export default Persons