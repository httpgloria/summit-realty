import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Login from "./routes/login/login";
import HomePage from "./routes/home/homePage";
import Posts from "./routes/posts/posts";
import {
  messageLoader,
  messagesLoader,
  postsLoader,
  usersLoader,
} from "./lib/loaders";
import Users from "./routes/users/Users";
import Messages from "./routes/messages/Messages";
import SingleMessage from "./routes/singleMessage/SingleMessage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "/",
          element: <RequireAuth />,
          children: [
            {
              path: "/",
              element: <Posts />,
              loader: postsLoader,
            },
            {
              path: "/users",
              element: <Users />,
              loader: usersLoader,
            },
            {
              path: "/messages",
              element: <Messages />,
              loader: messagesLoader,
            },
            {
              path: "/messages/:id",
              element: <SingleMessage />,
              loader: messageLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
