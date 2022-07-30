import Navbar from "./components/Navbar";
import TootPage from "./pages/TootPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom"
import UserPage from "./pages/UserPage";

const App = () => {

  return (
      <Router>
          <div className="App">
              <Navbar />
              <Routes>
                      <Route path="/" element={<TootPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/users/:id" element={<UserPage />} />
                      <Route path="/*" element={<TootPage />} />
              </Routes>
              <Footer />
          </div>
      </Router>

  );
}

export default App;
