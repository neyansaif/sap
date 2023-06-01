import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Dashboard from "./Dashboard";
import Footer from "./components/Footer";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NotFound from "./NotFound";

function App() {
   const token = localStorage.getItem("token");
   return (
      <Router>
         <Nav />
         <Routes>
            <Route path="/" element={<SignIn />} />
            {!token ? (
               <Route path="/login" element={<SignIn />} />
            ) : (
               <Route path="/dashboard" element={<Dashboard />} />
            )}
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
         <Footer />
      </Router>
   );
}

export default App;
