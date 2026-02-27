import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./navigation/Navbar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar will stay fixed to the top */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Dynamic Page Content */}
      <main className="grow">
          <Outlet />   
      </main>

      <Footer />
    </div>
  );
}