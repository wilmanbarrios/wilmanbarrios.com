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
    <main>
      <h1 className="text-4xl font-bold">Wilman Barrios</h1>
      <div dangerouslySetInnerHTML={{ __html: me }} />
    </main>
  );
}
