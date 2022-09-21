import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import UserDetails from "./components/UserDetails";
import Todos from "./components/Todos/Todos";
import BookManager from "./components/Books/BookManager";
import CreateOrUpdate from "./components/Books/CreateOrUpdate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App/>}>
                <Route path={"/todos"} element={<Todos/>}/>
                <Route path={"users/:userId"} element={<UserDetails/>}/>

                    <Route path={"books"} element={<BookManager/>}/>
                    <Route path={"books/:bookId"} element={<CreateOrUpdate/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
