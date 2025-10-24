import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NotePreviewClient from "@/components/NotePreview/NotePreview.client";
import type { Metadata } from "next";

interface NotePreviewPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NotePreviewPageProps): Promise<Metadata> {
  return {
    title: `Note ${params.id} — NoteHub`,
  };
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  // Попередньо завантажуємо нотатку для кешу React Query
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
