import type { MetaFunction } from "@remix-run/node";
import avatar from "../images/avatar.jpeg";

export const meta: MetaFunction = () => {
  return [
    { title: "Graziano Statello" },
    { name: "description", content: "Personal website of Graziano Statello" },
  ];
};

function Links() {
  return "";
}

function Title() {
  return <h1>Graziano Statello</h1>;
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
      <div className="flex justify-center">
        <Title />
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
