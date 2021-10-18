import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "dotenv";
import Banner from "./components/Banner";
import ExercicePresentSimple from "./components/exercices/ExercicePresentSimple";

config();

function App() {
  //connected user
  const [googleUser] = useAuthState(auth);

  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Navbar user={googleUser} />
        <Banner />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/courses" component={Courses} />
          {googleUser && <Route path="/profile" component={Profile} />}
          {googleUser && (
            <Route path="/exercise1" component={ExercicePresentSimple} />
          )}
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
  );
}

export default App;
