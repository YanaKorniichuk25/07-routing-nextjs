import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NotePreviewClient from "@/components/NotePreview/NotePreview.client";

interface NotePreviewPageProps {
  params: { id: string };
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = params;
  const queryClient = new QueryClient();

  // Попереднє завантаження даних з бекенду
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
