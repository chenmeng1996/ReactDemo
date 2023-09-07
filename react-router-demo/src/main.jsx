import './index.css'

import Contact, {
  loader as contactLoader
} from "./routes/contact";
import EditContact, {
  action as editAction
} from "./routes/edit";
import Root, {
  action as rootAction,
  loader as rootLoader
} from "./routes/root";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ErrorPage from "./error-page";
import Index from './routes';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { action as destroyAction } from "./routes/destroy";

/**
 * create router with path to component mapping.
 * children are nested routes.
 * errorElement is a React element to render when the loader fails
 * loader is a function to provide data for component to initial render when route is matched.
 * 
 * action is a function to set up the logic to respond to POST request. a POST usually means some data is changing.
 * So by convention, react-router will automaticlly refresh the page after the action is done like route is matched.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { 
        index: true, 
        element: <Index /> 
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
