import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import fs from "fs";
import { marked } from "marked";
import path from "path";

type LoaderData = { page: string };

export const loader: LoaderFunction = async () => {
  let file = fs.readFileSync(path.join(`${__dirname}../../data/es.md`), "utf8");

  return json<LoaderData>({
    page: marked(file),
  });
};

export default function Index() {
  let { page } = useLoaderData<LoaderData>();
  return (
    <main className="flex flex-col h-screen px-6 pt-12 md:p-0 md:max-w-xl md:mx-auto md:pt-10">
      <div className="flex flex-col items-center justify-center mb-6">
        <img
          src="/profile_image.jpg"
          loading="lazy"
          alt="Wilman Barrios avatar"
          className="rounded-full object-cover w-36 h-36 ring-1 ring-offset-4 ring-black/5 drop-shadow-md"
        />
        <h1 className="text-4xl font-black text-slate-800 mt-4">
          Wilman Barrios
        </h1>
      </div>
      <div
        className="prose prose-sky w-full pb-8 md:pb-10 text-slate-800"
        dangerouslySetInnerHTML={{ __html: page }}
      />
    </main>
  );
}
