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
        <div className='container'>
            <h2>Hi guys,My Name is Vivek Maddeshiya,a 2022 passout student.</h2>
            <h2>I am learning new things by watching from youtube and reading from geeks for geeks.
            Thanks for reading This :)
            </h2> 
        </div>
    )
}

export default About