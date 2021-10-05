import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  //connected user
  const [googleUser, loading] = useAuthState(auth);

  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/courses" component={Courses} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
