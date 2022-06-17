import StartDropdown from "./StartDropdown";
import EndDropdown from "./EndDropdown";
import PlanJourneyButton from "./SearchButton";
import {useEffect, useState} from "react";


const Form = ({sortedStations, setJourneyOptions}) => {

    const [selectedStartStation, setSelectedStartStation] = useState('');
    const [selectedEndStation, setSelectedEndStation] = useState('');
    const [endStationList, setEndStationList] = useState([]);
    const [startStationList, setStartStationList] = useState([]);

    const handleStartSelect = (selection) => {
        setSelectedStartStation(selection);
        const filteredEndList = sortedStations.filter((item) => {
            return item !== selection;
        });
        setEndStationList(filteredEndList);
    }

    const handleEndSelect = (selection) => {
        setSelectedEndStation(selection);
        const filteredStartList = sortedStations.filter((item) => {
            return item !== selection;
        });
        setStartStationList(filteredStartList);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`A: ${selectedStartStation}, B: ${selectedEndStation}`);

        const url = 'http://localhost:3001/journeys'
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({selectedStartStation, selectedEndStation})
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(journeyData => {
                setJourneyOptions(journeyData);
                // console.log(journeyData);
            })
            .catch(error => console.log('Form submit error', error))
    }



    useEffect(() => {
        setStartStationList(sortedStations);
        setEndStationList(sortedStations);
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <StartDropdown startStationList={startStationList} handleStartSelect={handleStartSelect} />
            <EndDropdown endStationList={endStationList} handleEndSelect={handleEndSelect} />
            <PlanJourneyButton />
        </form>
    );
}

export default Form;
