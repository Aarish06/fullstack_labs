import { Outlet, NavLink } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout() {
  return (
    <>
      <Header />

        <nav>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/organization">Organization</NavLink>
        </nav>


      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
