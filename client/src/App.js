import { useLayoutEffect, useState } from "react";
import Search from "./Components/Search/Search";
import TrackerMap from "./Components/TrackerMap/TrackerMap";
import Appbar from "./Components/UI/Appbar";
import SplashScreen from "./Components/UI/SplashScreen";

const App = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const closeSplashScreen = () => setShowSplashScreen(false);

    useLayoutEffect(() => {
        if (showSplashScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showSplashScreen]);

    return (
        <>
            <SplashScreen onClose={closeSplashScreen} show={showSplashScreen}/>
            <Appbar />
            <Search />
            <TrackerMap />
        </>
    );
};

export default App;
