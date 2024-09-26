import { Suspense, lazy, startTransition } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import { store } from "./helpers/store";
import Loader from "./components/UI/Loader";
import RoomError from "./components/UI/RoomError";

const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const GameLobby = lazy(() => import("./pages/GameLobby"));
const GameArena = lazy(() => import("./pages/GameArena"));
const MatchResults = lazy(() => import("./pages/MatchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GameLayout = lazy(() => import("./components/UI/GameLayout")); 


const App = () => {

  const router = createBrowserRouter([
    {
        errorElement: <RoomError />,
        shouldRevalidate: () => false,
        path: "/",
        loader: () => import("./pages/Home").then(module => module.loader()),
        element: (
          <Suspense fallback={startTransition(() => <Loader />)}>
            <Home />
          </Suspense>
        ),
    },
    {
        errorElement: <RoomError />,
        shouldRevalidate: () => false,
        path: "/auth",
        loader: () => import("./pages/Auth").then(module => module.loader()),
        element: (
            <Suspense fallback={startTransition(() => <Loader />)}>
                <Auth />
            </Suspense>
        ),
    },
    {
        path: "/",
        element: <GameLayout />, 
        children: [
            {
                path: "room",
                errorElement: <RoomError />,
                shouldRevalidate: () => false,
                loader: (meta) => import("./pages/GameLobby").then(module => module.loader(meta)),
                element: (
                    <Suspense fallback={startTransition(() => <Loader />)}>
                        <GameLobby />
                    </Suspense>
                ),
                handle: { name: 'Game Lobby' }
            },
            {
                errorElement: <RoomError />,
                path: "game",
                shouldRevalidate: () => false,
                loader: (meta) => import("./pages/GameArena").then(module => module.loader(meta)),
                element: (
                    <Suspense fallback={startTransition(() => <Loader />)}>
                        <GameArena />
                    </Suspense>
                ),
                handle: { name: 'Game Arena' }
            },
            {
                errorElement: <RoomError />,
                path: "results",
                shouldRevalidate: () => false,
                loader: (meta) => import("./pages/MatchResults").then(module => module.loader(meta)),
                element: (
                    <Suspense fallback={startTransition(() => <Loader />)}>
                        <MatchResults />
                    </Suspense>
                ),
                handle: { name: 'Match Resuts' }
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,  // Display your 404 page here
    }
  ]);

  return (
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
        />
    </Provider>
  );
}

export default App;