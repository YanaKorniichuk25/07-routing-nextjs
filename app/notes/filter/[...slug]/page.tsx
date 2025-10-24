import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes — NoteHub",
};

interface PageProps {
  params: { slug?: string[] };
}

export default async function NotesPage({ params }: PageProps) {
  const slug = params.slug || [];
  const tag = slug[0] || "All";

  const queryClient = new QueryClient();

  // Серверне попереднє завантаження нотаток
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient page={1} search="" tag={tag} />
    </HydrationBoundary>
  );
}
