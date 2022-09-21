import { Link, Outlet } from "react-router-dom";
import ResponsiveAppBar from "./components/partials/ResponsiveAppBar";


export default function App() {



    return (
       <div>
           <ResponsiveAppBar/>
           <h1>Exercise Course 10</h1>
           <ul>
               <li>
                   <Link to={"todos"}>Todos</Link>
               </li>
               <li>
                   <Link to={"books"}>Books Manager</Link>

               </li>
           </ul>
           <Outlet/>
       </div>
    )
}