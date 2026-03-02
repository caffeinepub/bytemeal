import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Navigation from './components/Navigation';
import BackgroundWrapper from './components/BackgroundWrapper';
import Footer from './components/Footer';
import Home from './pages/Home';
import DonorForm from './pages/DonorForm';
import AssistanceRequestForm from './pages/AssistanceRequestForm';
import VolunteerForm from './pages/VolunteerForm';
import Dashboard from './pages/Dashboard';
import FoodListings from './pages/FoodListings';

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
  path: '/',
  component: Home,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donate',
  component: DonorForm,
});

const requestHelpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/request-help',
  component: AssistanceRequestForm,
});

const volunteerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/volunteer',
  component: VolunteerForm,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings',
  component: FoodListings,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  donateRoute,
  requestHelpRoute,
  volunteerRoute,
  dashboardRoute,
  listingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
