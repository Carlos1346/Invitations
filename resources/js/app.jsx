import './bootstrap';
import ReactDOM from 'react-dom/client';
import Main from './routes/Main'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    
    <BrowserRouter>
    <Main />
    </BrowserRouter>
);
