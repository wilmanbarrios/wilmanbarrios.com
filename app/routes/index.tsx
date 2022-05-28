import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import fs from 'fs';
import path from 'path';

type LoaderData = { me: string; };

export const loader: LoaderFunction = async () => {
  let file = fs.readFileSync(path.resolve('./app/data/me.md'), "utf8");
  let me = marked(file)

  return json<LoaderData>({
    me,
  })
};

export default function Index() {
  let { me } = useLoaderData<LoaderData>();
  return (
    <main className="flex flex-col h-screen px-6 pt-8 antialiased text-gray-800 md:max-w-xl md:mx-auto md:pt-10 xl:max-w-2xl">
      <h1 className="text-4xl font-black mb-6">Wilman Barrios</h1>
      <div className="prose prose-sky pb-8 md:pb-10" dangerouslySetInnerHTML={{ __html: me }} />
    </main>
  );
}
