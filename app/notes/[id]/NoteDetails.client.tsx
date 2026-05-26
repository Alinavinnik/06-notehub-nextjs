"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }
  return (
    data && (
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    )
  );
}
export default NoteDetailsClient;
