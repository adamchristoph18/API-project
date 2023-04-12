import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotShow from "./components/SpotShow/SpotShow";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import CreateNewSpotForm from "./components/CreateNewSpotForm/CreateNewSpotForm";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
          <Route exact path="/"><AllSpots /></Route>
          <Route path="/spots/new"><CreateNewSpotForm /></Route>
          <Route path="/spots/current"><ManageSpots /></Route>
          <Route path="/spots/:spotId"><SpotShow /></Route>
          <p>Page Not Found</p>
        </Switch>}
    </>
  );
}

export default App;
