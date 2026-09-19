import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServicePage } from "./pages/ServicePage";
import { WorkPage } from "./pages/WorkPage";
import { ProjectPage } from "./pages/ProjectPage";
import { AboutPage } from "./pages/AboutPage";
import { TechnologiesPage } from "./pages/TechnologiesPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { LocationPage } from "./pages/LocationPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminDashboard, AdminLogin } from "./pages/AdminPages";
export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="technologies" element={<TechnologiesPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="start-a-project" element={<ContactPage />} />
        <Route
          path="web-development-company-:city"
          element={<LocationPage />}
        />
        <Route path="privacy-policy" element={<LegalPage kind="privacy" />} />
        <Route path="terms" element={<LegalPage kind="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
