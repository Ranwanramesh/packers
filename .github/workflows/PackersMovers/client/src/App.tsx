import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Networks from "@/pages/Networks";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/networks" component={Networks} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Helmet>
          <title>Swastik Packers and Movers - Professional Moving Services</title>
          <meta name="description" content="Swastik Packers and Movers provides professional packing and moving services. Get reliable, affordable moving solutions with 24/7 customer support." />
          <meta name="keywords" content="packers movers, house relocation, office shifting, car transportation, packing unpacking services, moving company" />
          <meta property="og:title" content="Swastik Packers and Movers - Professional Moving Services" />
          <meta property="og:description" content="Reliable and affordable packing and moving services with professional team and 24/7 support." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://swastikpackersandmovers.com" />
        </Helmet>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
