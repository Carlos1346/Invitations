import "./bootstrap";
import { createRoot } from "react-dom/client"; // Importar createRoot desde "react-dom"
import Main from "./routes/Main";
import '../css/app.css';
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("app")).render( // Utilizar createRoot para renderizar la aplicación
    <TokenProvider>
        <ThemeProvider>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </ThemeProvider>
    </TokenProvider>
);
