import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import AssistanceRequestForm from "./pages/AssistanceRequestForm";
import DonorForm from "./pages/DonorForm";
import FeedbackForm from "./pages/FeedbackForm";
import FoodListings from "./pages/FoodListings";
import Home from "./pages/Home";
import NGORegistrationForm from "./pages/NGORegistrationForm";
import VolunteerForm from "./pages/VolunteerForm";

const rootRoute = createRootRoute({
  component: () => (
    <BackgroundWrapper>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </BackgroundWrapper>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: DonorForm,
});

const requestHelpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/request-help",
  component: AssistanceRequestForm,
});

const volunteerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volunteer",
  component: VolunteerForm,
});

const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings",
  component: FoodListings,
});

const ngoRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ngo-register",
  component: NGORegistrationForm,
});

const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feedback",
  component: FeedbackForm,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  donateRoute,
  requestHelpRoute,
  volunteerRoute,
  listingsRoute,
  ngoRegisterRoute,
  feedbackRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
