import "./index.css";
import React from "react";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import ReactDOM from "react-dom/client";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import { AppContextProvider } from "./contexts/AppContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0 },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <p>Home Page</p>
      </Layout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router} />

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: "#f0fdf4",
                color: "#3c873b",
              },
            },
            error: {
              style: {
                background: "#fdf0f0",
                color: "#d42c1f",
              },
            },
          }}
        />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
