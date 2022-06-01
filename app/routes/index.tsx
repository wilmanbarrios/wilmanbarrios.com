import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import fs from "fs";
import path from "path";

type LoaderData = { page: string; x: string };

export const loader: LoaderFunction = async () => {
  // let file = fs.readFileSync(path.resolve("app/data", "es.md"), "utf-8");

  return json<LoaderData>({
    page: "",
    x: path.join(__dirname, "../..", "app/data/es.md")
  });
};

export default function Index() {
  let { page, x } = useLoaderData<LoaderData>();
  return (
    <main className="flex flex-col h-screen px-6 pt-12 md:p-0 md:max-w-xl md:mx-auto md:pt-10">
      <pre>{x}</pre>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="p-1 rounded-full bg-gradient-to-b from-white via-white to-black/10 shadow-md ring-1 ring-black/5">
          <img
            src="/profile_image.jpg"
            loading="lazy"
            alt="Wilman Barrios avatar"
            className="rounded-full object-cover w-36 h-36"
          />
        </div>
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
