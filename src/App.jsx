import { RouterProvider, createBrowserRouter } from "react-router-dom";

import StaticLayout from "./components/layout/staticlayout/StaticLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PersistLogin from "./components/PersistLogin";
import AuthContext, { AuthProvider } from "./context/AuthProvider";
import AppNavbar from "./components/layout/applayout/AppNavbar";
import AppLayout from "./components/layout/applayout/AppLayout";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import RequireAuth from "./components/RequireAuth";
import MyLeagues from "./pages/MyLeagues/MyLeagues";
import Dashboard from "./pages/Dashboard/Dashboard";
import MatchUpload from "./pages/Statistician/MatchUpload";
import HighlightUpload from "./pages/Statistician/HighlightUpload";
import LeagueSchedule from "./pages/Statistician/LeagueSchedule";
import League from "./pages/League/League";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import CreateTeam from "./pages/CreateTeam/CreateTeam"
import MyTeam from "./pages/MyTeam/MyTeam";
import Help from "./pages/Help/Help";
import Teams from "./pages/Teams/Teams";
import Employees from "./pages/Employees/Employees";
import Users from "./pages/Users/Users";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ForgotPasswordEmail from "./pages/ForgotPassword/ForgotPasswordEmail";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import CreateLeague from "./pages/CreateLeague/CreateLeague";
import TeamCreationConfetti from "./pages/SuccessConfetti/teamCreationConfetti";
import LeagueConfetti from "./pages/SuccessConfetti/leagueOnboardConfetti";
import Transactions from "./pages/Transactions/Transactions";
import Step1Confetti from "./pages/SuccessConfetti/leagueOwnerOnboardingStep1"
import FailureOnboarding from './pages/FailurePages/FailureOnboarding'
import MatchSchedule from './pages/Schedule/matchSchedule'
import MatchStatiscian from './pages/Statistician/MatchStatiscian'


function App() {
const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <StaticLayout />,
        children: [
          {
            index:true,
            element: <Home />,
          },
          {
            path: "/about-us",
            element: <About />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <VerifyEmail/>,
      },
      {
        path: "/register/:token",
        element: <Register />,
      },
      {
        path:"/confirm-email",
        element:<ConfirmEmail/>
      },
      {
        path:"/forgot",
        element: <ForgotPasswordEmail/>
      },
      {
        path:"/reset/:token",
        element:<ResetPassword/>
      },
      {
        path: "/success-team-creation",
        element: <TeamCreationConfetti/>,
      },
      {
        path: "/success-onboard",
        element: <LeagueConfetti/>,
      },
      {
        path: "/success-onboard-step1",
        element: <Step1Confetti/>,
      },
      {
        path: "/fail-onboarding",
        element: <FailureOnboarding/>
      },
      {
        children:[
          {
            path:"/app",
            element:<AppLayout/>,
            children: [
              {
                index:true,
                element:<Help/>
              },
              {
                path: "leagues", 
                element: <MyLeagues />,
              },
              {
                path : "create-league",
                element: <CreateLeague/>
              },
              {
                path:"teams",
                element:<Teams/>
              },
              {
                path:"employees",
                element:<Employees/>
              },
              {
                path:"users",
                element:<Users/>
              },
              {
                path:"dashboard",
                element: <Dashboard/>
              },
              {
                path: "match-upload/:matchId/:team",
                element:<MatchUpload/>
              },
              {
                path:"leagues/:id",
                element:<League/>
              },
              {
                path:"hightlight-upload",
                element:<HighlightUpload/>
              },
              {
                path:"leagues/:id/create-team",
                element:<CreateTeam/>
             },
             {
               path:"myteam",
               element:<MyTeam/>
             },
             {
              path:"league-schedule",
              element:<LeagueSchedule/>
              },
              {
                path:"transactions",
                element: <Transactions/>
              },
              {
                path:"match-schedule",
                element: <MatchSchedule/>
              },
              {
                path:"match-statiscian/:matchId",
                element: <MatchStatiscian/>
              }
            ],
          }
        ]
      },
    ],
  },    {
    path: "*", 
    element: <ErrorPage />,
  },
]);
return(
    <>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;