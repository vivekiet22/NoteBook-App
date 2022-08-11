import React from 'react'
import { useContext ,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
    // For understanding useContext
    // const a = useContext(
    //     noteContext
    // )
    // useEffect(() => {
    //   a.update()
    // //eslint-disable-next-line
    //  }, [])

 
    
    return (
        <div>
            This is About  
        </div>
    )
}

export default About