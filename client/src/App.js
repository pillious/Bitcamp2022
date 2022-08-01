import Search from "./Components/Search/Search";
import TrackerMap from "./Components/TrackerMap/TrackerMap";
import Appbar from "./Components/UI/Appbar";
import LoadingOverlay from "./Components/UI/LoadingOverlay";
import SplashScreen from "./Components/UI/SplashScreen";

const App = () => {

    return (
        <>
            <SplashScreen />
            <LoadingOverlay />
            <Appbar />
            <Search />
            <TrackerMap />
        </>
    );
};

export default App;
