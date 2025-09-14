import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/signup";
import SignIn from "./component/signin";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/user/Home";
import Dashboard from "./Pages/organizer/Dashboard";
import Profile from "./Pages/user/Profile";
import MyTicketsPage from "./Pages/user/Ticket";
import PrivateRoute from "./routes/PrivateRoute";
import EventCheckoutPage from "./Pages/user/Checkout";
import EventDetails from "./Pages/user/EventDetails";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <PrivateRoute requiredRole="attendee">
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute requiredRole="attendee">
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <PrivateRoute requiredRole="attendee">
              <MyTicketsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/event/:eventId"
          element={
            <PrivateRoute requiredRole="attendee">
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/event/:eventId/checkout"
          element={
            <PrivateRoute requiredRole="attendee">
              <EventCheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/dashboard"
          element={
            <PrivateRoute requiredRole="organizer">
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;