import { json, type MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";

import avatar from "../images/avatar.jpeg";
import content from "../i18n/en.json";

import {
  Home as HomeIcon,
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
} from "../components/icons";
import { useUserPreferences } from "../components/user-preferences/user-preferences";

export const meta: MetaFunction = () => {
  return [
    { title: "Graziano Statello" },
    { name: "description", content: "Personal website of Graziano Statello" },
  ];
};

export async function loader() {
  return json(content);
}

function Title() {
  return <h1 className="text-4xl font-bold sm:text-5xl">Graziano Statello</h1>;
}

function Description() {
  const content = useRouteLoaderData<typeof loader>("routes/_index");
  return <p className="text-lg">{content?.main.personalDescription}</p>;
}

function Avatar() {
  return (
    <img
      src={avatar}
      alt="Graziano Statello"
      className="rounded-full max-w-xs"
    />
  );
}

function ThemeSwitcher() {
  const { colourscheme, toggleColourScheme } = useUserPreferences();

  return (
    (colourscheme === "light" && (
      <button type="button" onClick={toggleColourScheme}>
        <SunIcon />
      </button>
    )) ||
    (colourscheme === "dark" && (
      <button type="button" onClick={toggleColourScheme}>
        <MoonIcon />
      </button>
    ))
  );
}

function Links() {
  return (
    <nav className="flex flex-row">
      <a
        rel="noopener noreferrer"
        href="/#"
        aria-label="Back to homepage"
        className="flex items-center"
      >
        <HomeIcon />
      </a>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/akallabet"
        className="ml-4"
      >
        <GithubIcon />
      </a>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://linkedin.com/in/graziano-statello-88708858/"
        className="ml-4"
      >
        <LinkedinIcon />
      </a>
      <div className="ml-4">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

function NearformDescription() {
  const content = useRouteLoaderData<typeof loader>("routes/_index");
  return (
    <article className="sm:max-w-full hover:no-underline focus:no-underline bg-white dark:bg-gray-900 border-black border p-5 rounded-md">
      <p>{content.main.nearformDescription}</p>
      <p>
        <a
          href="https://nearform.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          About it.
        </a>
      </p>
    </article>
  );
}

function Header() {
  return (
    <>
      <div className="flex items-center flex-col lg:flex-row lg:justify-between mb-16">
        <div className="mb-16 lg:mb-0">
          <Title />
        </div>
        <Avatar />
      </div>
      <div className="flex items-center flex-col lg:flex-row lg:justify-between">
        <Description />
        <NearformDescription />
      </div>
    </>
  );
}

export default function Index() {
  return (
    <>
      <div className="mb-2 absolute top-10 right-10">
        <Links />
      </div>
      <div className="max-w-screen-lg mx-auto mt-16 px-10 py-16">
        <Header />
      </div>
    </>
  );
}
