import { Route, Routes, BrowserRouter } from "react-router-dom";
import Base from "./components/Base";
import { Homepage } from "./pages";
// import { Service } from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Base />}>

          <Route index element={<Homepage />} />
          {/* <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="services" element={<Service />} /> */}

          {/* <Route path="*" element={<NotFound />} /> */}

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;