import React, { useEffect, useState } from 'react'

export default function WeatherApp() {

    const [search, setSearch] = useState("Hyderabad");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    let componentMounted = true;

    const tick = () => {
        return setInterval(() => {
            setTime(() => new Date().toLocaleTimeString())
        }, 1000)
    }

    useEffect(() => {

        const fetchWeather = async () => {
            const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e08624c38ca47ce582c3075c2785fdfc`)
            if (componentMounted) {
                setData(await respone.json());

            } return () => {
                componentMounted = false;

            }
        }
        fetchWeather();
        const id = tick()
        return () => clearTimeout(id)

    },
        [search])

    let emoji = null;
    let ride =null;
    let info =null;
    let picinfo =null; 
    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud";
            ride = "fa-bicycle";
            picinfo = "cycling"
            info = "It is cloudy outside best time for cycling. "
        } else if (data.weather[0].main == "Thunderstrom") {
            emoji = "fa-bolt"
            ride = "fa-cloud-bolt";
            picinfo = "thounderstrom"
            info = "It is raining heavly outside be safe in home. "
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
            ride = "fa-umbrella";
            picinfo = "umbrella"
            info = "It might reain please carry your umbrella "
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-haevy"
            ride = "fa-cloud-bolt";
            picinfo = "rain"
            info = "It is raining heavly outside be safe in home. "
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snow-flake"
            ride = "fa-temperature-snow";
            picinfo = "show"
            info = "It is show outside please be warm. "
        } else {
            emoji = "fa-smog"
            ride = "fa-person-walking";
            picinfo = "walking"
            info = "It is clear outside best for walking. "
        }
    } else { return (<div> loading.. </div>) }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);


    //date 
    // let d = new Date();
    // let date = d.getDate();
    // // let month = d.toLocaleString("default",{month:'long'})
    // let day = d.toLocaleString("default",{day:'long'})
    // let month = d.getMonth() + 1;
    // // let day = d.getDay();
    // let year = d.getFullYear();

    //date stackoverflow
    var d = new Date();
    var setDate = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    let gotDate = d.toLocaleString("en", setDate);


    //time
    // let time = new Date().toLocaleTimeString(); 


    // let time = d.toLocaleTimeString();
    //     [], {
    //     // hour: '2-digit',
    //     // minute: '2-digit',
    //     // second: '2-digit'
    // })









    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }
    console.log(data.weather[0].main);

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                <div className="col-xl-4 p-0">
                        <div className="card text-white b-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].description}`} className="card-img" alt="..." />

                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-5 w-75  mx-auto">
                                        {/* <div> <input
                                            type="search"
                                            className='form-contorl p-1'
                                            placeholder='search City'
                                            aria-label='search city'
                                            aria-describedby='basic-addon2'
                                            name='search'
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required />
                                        <button type='submit' className='input-group-text' id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button> </div> */}
                                        <div className="input-group">
                                            <div className="form-outline">
                                                <input
                                                    type="search"
                                                    placeholder='search City'
                                                    id="form1"
                                                    aria-describedby='basic-addon2'
                                                    aria-label='search city'
                                                    className="form-control"
                                                    name='search'
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    required />
                                            </div>
                                            <button
                                                type='submit'
                                                className='input-group-text bg-success'
                                                id="basic-addon2">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>

                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-5 p-5">

                                    <h2 className="card-title">{data.name}</h2>
                                    <p className="card-text lead">
                                        {/* {day}, {month} {date}, {year} */}
                                        {gotDate}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder md-5'>
                                        {temp}&deg;C
                                    </h1>
                                    <p className="lead">{temp_min}&deg;C| {temp_max}&deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 p-0">
                        <div className="card text-white b-0 ">
                            <img src={`https://source.unsplash.com/600x900/?${picinfo}`} className="card-img" alt="..." />

                            <div className="card-img-overlay">
                               
                                <div className="bg-dark bg-opacity-50 py-5 p-5 " style={{marginTop : "5.5rem"}}>
                                <i className={`fa ${ride}  fa-10x`}></i>  
                                <h1 className='text-center '>{info}</h1>                          
                               </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

