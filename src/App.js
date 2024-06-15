import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate,
  Outlet,
  RouterProvider
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Login }  from './components/Login';
import { Home }  from './components/Home';
// import addUser from './migration/users'

const emptyUser = {};

function App() {
  // const [user, setUser] = React.useState(emptyUser);

  return <RouterProvider router={router} />;
}

const Root = () =>  {
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      Component={Root}
      errorElement={<div>Error</div>}
    >
      <Route errorElement={<div>Error</div>}>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route exact path="/login" Component={Login} />
        <Route path="/home" Component={Home} />
      </Route>
    </Route>
  )
);

export default App;
