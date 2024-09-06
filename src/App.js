import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ThemeContext from "./contexts/ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);
  return (
    <ThemeContext.Provider value={darkMode}>
      <Header onChange={setDarkMode} />
      <Content />
      <Footer />
    </ThemeContext.Provider>
  );
}
export default App;
