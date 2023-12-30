import React,{useEffect,useState} from 'react'

function App(){

  const [backendData, setBackEndData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackEndData(data)
      }
    )
  }, []) 

  return (
    <div>
      {(typeof backendData.users == 'undefined')}
    </div>
  )
}

export default App