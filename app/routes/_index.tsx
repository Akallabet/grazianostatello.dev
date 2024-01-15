import { json, type MetaFunction } from "@remix-run/node";
import avatar from "../images/avatar.jpeg";
import content from "../i18n/en.json";
import { useRouteLoaderData } from "@remix-run/react";

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
  return <h1>Graziano Statello</h1>;
}

function Description() {
  const content = useRouteLoaderData<typeof loader>("routes/_index");
  return <p>{content?.main.personalDescription}</p>;
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

function Header() {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 ">
      <div className="justify-center grid">
        <Title />
        <Description />
      </div>
      <div className="flex justify-center">
        <Avatar />
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="max-w-screen-2xl mx-auto">
        <Header />
      </div>
    </div>
  );
}
