import "./bootstrap";
import ReactDOM from "react-dom/client";
import Main from "./routes/Main";
import '../css/app.css';
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext";
import { ThemeProvider } from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById("app")).render(
    <TokenProvider>
        <ThemeProvider>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </ThemeProvider>
    </TokenProvider>
);
