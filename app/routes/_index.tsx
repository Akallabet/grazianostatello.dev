import { json, type MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";

import avatar from "../images/avatar.jpeg";
import content from "../i18n/en/copy.json";
import jobs from "../i18n/en/jobs.json";

import {
  Home as HomeIcon,
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
} from "../components/icons";
import { useUserPreferences } from "../components/user-preferences/user-preferences";
import { useMemo } from "react";
import { micromark } from "micromark";

export const meta: MetaFunction = () => {
  return [
    { title: "Graziano Statello" },
    { name: "description", content: "Personal website of Graziano Statello" },
  ];
};

async function getContent() {
  // const request = await fetch(
  //   "https://raw.githubusercontent.com/Akallabet/grazianostatello.dev/main/app/i18n/en/copy.json"
  // );
  // return request.json();
  return content;
}

async function getJobs() {
  // const request = await fetch(
  //   "https://raw.githubusercontent.com/Akallabet/grazianostatello.dev/main/app/i18n/en/jobs.json"
  // );
  // return request.json();
  return jobs;
}

export async function loader() {
  const content = await getContent();
  const jobs = await getJobs();

  console.log(content, jobs);

  return json({ content, jobs });
}

function Title() {
  return <h1 className="text-4xl font-bold sm:text-5xl">Graziano Statello</h1>;
}

function Description() {
  const { content } = useRouteLoaderData<typeof loader>("routes/_index");
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
  const { content } = useRouteLoaderData<typeof loader>("routes/_index");
  return (
    <article className="sm:max-w-lg hover:no-underline focus:no-underline bg-white dark:bg-gray-900 border-gray-300 border p-5 rounded-md">
      <p>{content.main.nearformDescription}</p>
      <p>
        <a
          href="https://nearform.com"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
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
        <div className="mb-16 lg:mb-0">
          <Description />
        </div>
        <NearformDescription />
      </div>
    </>
  );
}

interface Company {
  name: string;
  url?: string;
}

interface Job {
  id: string;
  position: string;
  company: Company;
  period: {
    from: string;
    to?: string;
  };
  description: string;
}

interface TimelineProps {
  jobs: Array<Job>;
}

function Company({ name, url }: Company) {
  return url ? (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="underline"
    >
      {name}
    </a>
  ) : (
    <>{name}</>
  );
}

function Job({ job }: { job: Job }) {
  const {
    content: { experience },
  } = useRouteLoaderData<typeof loader>("routes/_index");
  const description = useMemo(() => {
    return micromark(job.description);
  }, [job.description]);

  return (
    <div
      key={job.id}
      className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-600"
    >
      <h3 className="text-xl font-semibold tracki">
        {job.position} at <Company {...job.company} />
      </h3>
      <time className="text-xs tracki uppercase text-gray-500">
        {job.period.from} - {job.period.to || experience.current}
      </time>
      <article
        className="mt-3 text-justify job-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

function Timeline({ jobs }: TimelineProps) {
  const {
    content: { experience },
  } = useRouteLoaderData<typeof loader>("routes/_index");
  return (
    <section className="">
      <div className="container max-w-5xl py-12 mx-auto">
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-blue-600">
              <h3 className="text-3xl font-semibold">{experience.title}</h3>
            </div>
          </div>
          <div className="relative col-span-12 pl-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative pl-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
              {jobs.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const { jobs } = useRouteLoaderData<typeof loader>("routes/_index");
  return (
    <>
      <div className="mb-2 absolute top-10 right-10">
        <Links />
      </div>
      <div className="max-w-screen-lg mx-auto mt-16 px-10 py-16">
        <Header />
      </div>
      <div className="max-w-screen-lg mx-auto mt-16 px-10">
        <Timeline jobs={jobs} />
      </div>
    </>
  );
}
