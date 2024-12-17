import { createBrowserRouter } from "react-router-dom";
import { Root } from "./root";
import { NewLog } from "./NewLog";
import { Dashboard } from "./Dashboard";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/test_new_log",
                element: <NewLog />
            },
        ],
    }
])

