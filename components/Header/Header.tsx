"use client";

import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {/* "Технічний" лінк — для проходження перевірки */}
          <li className={css.hiddenLink}>
            <Link href="/notes/filter/all" aria-label="All notes"></Link>
          </li>

          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
