import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./pages/Router";
import "./App.scss";
import { chakraTheme } from "./config/ChakraTheme";

function App() {
  {
    /*  */
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ChakraProvider theme={chakraTheme}>
          <Router />
        </ChakraProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
