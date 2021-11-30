import React, {useState, useEffect} from 'react'

export const WalkingTime = () => {
    const [pace, setPace] = useState(3.5)
    const [dist, setDist] = useState(500)

    const [vehicle, setVehicle] = useState(30)
    const [allowedTime, setAllowedTime] = useState(120)
    const [extra, setExtra] = useState(50)

    const [feet, setFeet] = useState("feet")

    let totalSeconds = ((dist*2)/pace) + vehicle + allowedTime + extra
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.round(totalSeconds - minutes*60)

    const [total, setTotal] = useState(`${minutes} minutes, ${seconds} seconds`)

    useEffect(() => {
        setTotal(`${minutes} minutes, ${seconds} seconds`)
    }, [minutes,seconds])

    const handleChangeFeet = () => {
        if (feet == "feet") {
            setFeet("meters")
            setDist(dist*0.3048)
            setPace(pace*0.3048)
        } else {
            setFeet("feet")
            setDist(dist/0.3048)
            setPace(pace/0.3048)
        }
    }

    const handleRound = () => {
        console.log(seconds)
        if (seconds > 0) {
            minutes ++
            seconds = 0
        }
        setTotal(`${minutes} minutes, ${seconds} seconds`)
    }

    return (
        <div style={{textAlign: "center"}}>
            <p>This tool calculates needed layover or schedule flexibility for restroom access from distance and other parameters you set. It is based on the estimated walking times from <a target="_blank" href="https://mutcd.fhwa.dot.gov/htm/2009/part4/part4e.htm">MUTCD Reference on Walking Speed</a>.</p>

            Pace = {Math.round(pace * 100) / 100} {feet}/second
            <br />
            <input min="1" type="number" placeholder="Change pace" onChange={(e) => setPace(e.target.value)} />

            <br /> <br />
            Distance each way = {Math.round(dist * 100) / 100} {feet}
            <br />
            <input min="1" type="number" placeholder="Change distance" onChange={(e) => setDist(e.target.value)} />

            <br />

            <button onClick={() => handleChangeFeet()}>Change to {feet == "feet" ? "meters" : "feet"}</button>

            <br /> <br />
            Time to secure vehicle = {vehicle} seconds
            <br />
            <input min="0" type="number" placeholder="Change time" onChange={(e) => setVehicle(e.target.value)} />

            <br /> <br />
            Time allowed to use bathroom = {allowedTime} seconds
            <br />
            <input min="1" type="number" placeholder="Change time" onChange={(e) => setAllowedTime(e.target.value)} />

            <br /> <br />
            Extra time = {extra} seconds
            <br />
            <input min="0" type="number" placeholder="Change time" onChange={(e) => setExtra(e.target.value)} />

            <br /> <br />
            <h3>Total walking time = {total}</h3>
            <button onClick={() => handleRound()}>Round up</button>
        </div>
    )
}
