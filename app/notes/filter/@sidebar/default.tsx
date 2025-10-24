import css from "./SidebarNotes.module.css";
import Link from "next/link";
import { tagsList } from "@/types/note";
import React from "react";

export default function SidebarNotes() {
  return (
    <div className={css.sidebar}>
      <h2 className={css.title}>Filter by Tag</h2>
      <ul className={css.menuList}>
        {tagsList.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
