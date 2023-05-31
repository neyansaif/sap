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
            <Route path="/signin" element={<SignIn />} />
            {!token ? (
               <Route path="/" element={<SignIn />} />
            ) : (
               <Route path="/" element={<Dashboard />} />
            )}
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
         <Footer />
      </Router>
   );
}

export default App;
