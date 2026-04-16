import { Outlet, NavLink } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

export function Layout() {
  return (
    <>
      <Header />

        <nav>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/organization">Organization</NavLink>
        <div className="auth-buttons">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
        </nav>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
