import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
// import { fetchUpdateSpot } from './store/Spots/spotsThunk';
import SpotPanels from './components/HomepagePanels/spotPanels';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  // const handleClick = () => {
  //   const spotId = '1'
  //   const updatedSpotData = {
  //     price: 150
  //   }
  //   dispatch(fetchUpdateSpot(spotId, updatedSpotData));
  // }  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      {/* <button onClick={handleClick}>Test spots</button> */}
      <SpotPanels />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1></h1>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
