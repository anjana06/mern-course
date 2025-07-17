import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  Landing,
  Register,
  Login,
  Error,
  Stats,
  AllJob,
  EditJob,
  AddJob,
  Profile,
  Admin,
} from "./components";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as AddJobAction } from "./pages/AddJob";
import { action as EditJobAction } from "./pages/EditJob";
import { action as DeleteJobAction } from "./pages/DeleteJob";
import { action as ProfileAction } from "./pages/Profile";
import { loader as DashboardLoader } from "./pages/DashboardLayout";
import { loader as AllJobLoader } from "./pages/AllJob";
import { loader as EditJobLoader } from "./pages/EditJob";
import { loader as AdminLoader } from "./pages/Admin";
import { loader as StatsLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

// Whichever theme is set it's show in all pages
checkDefaultTheme();
// const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        loader: DashboardLoader,
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: AddJobAction,
          },
          {
            path: "alljob",
            element: <AllJob />,
            loader: AllJobLoader,
          },
          {
            path: "editjob/:id",
            element: <EditJob />,
            loader: EditJobLoader,
            action: EditJobAction,
          },
          {
            path: "deletejob/:id",
            action: DeleteJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: StatsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: ProfileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: AdminLoader,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
