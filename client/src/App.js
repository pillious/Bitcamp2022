// import classes from './App.module.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Search from "./Components/Search/Search";
import TrackerMap from "./Components/TrackerMap/TrackerMap";
import { fetchMarkers } from "./store/map-actions";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMarkers());
    }, [dispatch])

    return (
        <div>
            <Search />
            <TrackerMap />
        </div>
    );
};

export default App;
