import { useState, useEffect } from "react";

export default function ProgressBar({timer}){
    const [remainingTime, setRemainingTime] = useState(timer)
    useEffect(()=>{
        const progress = setInterval(()=>{
            // console.log('interval');
            setRemainingTime((prevTime)=> prevTime - 10)
        },10);
    
        return () =>{
            clearInterval(progress)
        }
    }, [])

    return <progress value={remainingTime} max={timer}/>

}