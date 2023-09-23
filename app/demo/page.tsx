import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Data } from "@measured/puck";

import { Client } from "./[...puckPath]/client";
import resolvePuckPath from "./[...puckPath]/resolve-puck-path";

// Replace with call to your database
const getPage = (path: string) => {
  const allData: Record<string, Data> | null = null;

  return allData ? allData[path] : null;
};

export async function generateMetadata({
  params,
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const { isEdit, path } = resolvePuckPath(params.puckPath);

  if (isEdit) {
    return {
      title: "Puck: " + path,
    };
  }

  return {
    title: getPage(path)?.root?.title,
  };
}

export default async function Page({
  params,
}: {
  params: { puckPath: string[] };
}) {
  const { isEdit, path } = resolvePuckPath(params.puckPath);

  const data = getPage(path);

  if (!data && !isEdit) {
    return notFound();
  }

  return <Client isEdit={isEdit} path={path} dataBE={data} />;
}
