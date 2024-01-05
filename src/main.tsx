import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";

/* Step 1: Create a root route */
const rootRoute = new RootRoute({
  component: () => (
    <>
      <div style={{ display: "flex", gap: "5px" }}>
        <Link to="/">Home</Link>
        <Link to="/app">App</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </>
  ),
});

/* Step 2: Create the routes */
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return <h1>Welcome to the home page!</h1>;
  },
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: function App() {
    return <h1>This is our cool app</h1>;
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <h1>A lot of stuff about us</h1>;
  },
});

/* Step 3: Build the root tree by adding the routes to the root route */
const routeTree = rootRoute.addChildren([indexRoute, appRoute, aboutRoute]);

/* Step 4: Create a router */
const router = new Router({ routeTree, defaultPreload: "intent" });

/* Step 5: Register the router types */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/* Step 6: Render the app */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
