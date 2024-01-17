import { json, type MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";

import avatar from "../images/avatar.jpeg";
import content from "../i18n/en.json";

import { HomeIcon } from "../components/home-icon";

export const meta: MetaFunction = () => {
  return [
    { title: "Graziano Statello" },
    { name: "description", content: "Personal website of Graziano Statello" },
  ];
};

export async function loader() {
  return json(content);
}

// function Links() {
//   return "";
// }

function Title() {
  return <h1 className="text-4xl font-bold sm:text-5xl">Graziano Statello</h1>;
}

function Description() {
  const content = useRouteLoaderData<typeof loader>("routes/_index");
  return (
    <p className="mt-8 mb-12 text-lg">{content?.main.personalDescription}</p>
  );
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

function HomeLink() {
  return (
    <a
      rel="noopener noreferrer"
      href="/#"
      aria-label="Back to homepage"
      className="flex items-center"
    >
      <HomeIcon />
    </a>
  );
}

function Header() {
  return (
    <div>
      <div className="mb-2">
        <HomeLink />
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2  gap-2">
        <div className="sm:justify-center md:justify-center grid mb-4">
          <Title />
        </div>
        <div className="flex justify-center mb-4">
          <Avatar />
        </div>
      </div>
      <div className="flex sm:justify-center md:justify-center mb-4">
        <Description />
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="space-y-12 dark:bg-gray-800 dark:text-gray-100">
      <div className="max-w-screen-2xl mx-auto p-5">
        <Header />
      </div>
    </div>
  );
}
