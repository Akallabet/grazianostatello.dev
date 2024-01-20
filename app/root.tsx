import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import {
  UserPreferencesProvider,
  useUserPreferences,
} from "./components/user-preferences/user-preferences";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

function Main() {
  const { colourscheme } = useUserPreferences();

  return (
    <html lang="en" className={colourscheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-800 dark:text-gray-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <UserPreferencesProvider>
      <Main />
    </UserPreferencesProvider>
  );
}
