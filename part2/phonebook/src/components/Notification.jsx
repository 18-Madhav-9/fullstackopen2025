const Notification = ({message,error}) => {
  if ( message === null ) {
    return null 
  }
  else {
    return (
      <div className= {error?'error':'message'} >{message}</div>
    )
  }
}

export default Notification