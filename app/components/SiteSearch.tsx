"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  FolderCode,
  Hash,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { hardwareProjects, softwareProjects } from "../data/projects";
import { researchPapers } from "../data/research";
import { mediaPath } from "../data/media";

type SearchItem = {
  title: string;
  href: string;
  type: string;
  keywords?: string;
  image?: string;
};
const items: SearchItem[] = [
  ...[
    ["Home", "home"],
    ["Research", "research"],
    ["About me", "about"],
    ["Experience", "experience"],
    ["Achievements", "achievements"],
    ["Contact", "contact"],
  ].map(([title, id]) => ({ title, href: `/#${id}`, type: "Section" })),
  {
    title: "Projects",
    href: "/projects/",
    type: "Collection",
    keywords: "113 robotics hardware software games",
  },
  ...[...hardwareProjects, ...softwareProjects].map((project) => ({
    title: project.title,
    href: `/projects/${project.category}/${project.slug}/`,
    type: project.categoryLabel || project.category,
    keywords: project.technologies.join(" "),
    image: mediaPath(project.imageUrl),
  })),
  ...researchPapers.map((paper) => ({
    title: paper.title,
    href: `/#paper-${paper.id}`,
    type: "Research paper",
    keywords: `${paper.authors.join(" ")} ${paper.targetJournal || ""} ${"conference" in paper ? paper.conference : ""}`,
  })),
];
const quickLinks = [
  {
    title: "Projects",
    subtitle: "113+ built",
    href: "/projects/",
    icon: FolderCode,
  },
  {
    title: "Research",
    subtitle: "Papers & presentations",
    href: "/#research",
    icon: FileText,
  },
  {
    title: "Contact",
    subtitle: "Get in touch",
    href: "/#contact",
    icon: MessageSquare,
  },
];

export type SiteSearchControl = { open: () => void };

export default function SiteSearch({
  onOpen,
  controllerRef,
}: {
  onOpen: () => void;
  controllerRef?: Ref<SiteSearchControl>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const previousOverflow = useRef("");
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const tokens = term.split(/\s+/);
  const allMatches = term
    ? items
        .filter((item) =>
          tokens.every((token) =>
            `${item.title} ${item.type} ${item.keywords || ""}`
              .toLowerCase()
              .split(/[\s·,.:;()—–-]+/)
              .some((word) => word.startsWith(token)),
          ),
        )
        .sort(
          (a, b) =>
            Number(b.title.toLowerCase().startsWith(term)) -
            Number(a.title.toLowerCase().startsWith(term)),
        )
    : [];
  const matches = allMatches.slice(0, 6);

  function openSearch() {
    if (dialog.current?.open) return;
    onOpen();
    setQuery("");
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    input.current?.focus();
  }
  function closeSearch() {
    dialog.current?.close();
    document.body.style.overflow = previousOverflow.current;
  }
  useImperativeHandle(controllerRef, () => ({ open: openSearch }));
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  });

  function navigateResults(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }
    const results = Array.from(
      dialog.current?.querySelectorAll<HTMLAnchorElement>(
        ".site-search-result",
      ) || [],
    );
    if (!results.length) return;
    const current = results.findIndex(
      (result) => result === document.activeElement,
    );
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? (current + 1) % results.length
          : current <= 0
            ? results.length - 1
            : current - 1;
      results[next].focus();
    } else if (
      event.key === "Enter" &&
      document.activeElement === input.current
    ) {
      event.preventDefault();
      results[0].click();
    }
  }

  return (
    <>
      <button
        className="header-search"
        aria-label="Search site"
        title="Search (Ctrl / Cmd + K)"
        onClick={openSearch}
      >
        <Search size={18} />
        <span>Search</span>
        <kbd aria-hidden="true">Ctrl K</kbd>
      </button>
      <dialog
        className="site-search-dialog"
        ref={dialog}
        aria-labelledby="site-search-title"
        onKeyDown={navigateResults}
        onCancel={(event) => {
          event.preventDefault();
          closeSearch();
        }}
        onClose={() => {
          document.body.style.overflow = previousOverflow.current;
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            closeSearch();
        }}
      >
        <div className="site-search-heading">
          <div>
            <h2 id="site-search-title">Search</h2>
            <p>Projects, papers, and more.</p>
          </div>
          <button aria-label="Close search" onClick={closeSearch}>
            <X size={19} />
          </button>
        </div>
        <label className="site-search-input">
          <Search size={20} />
          <span className="sr-only">Search portfolio</span>
          <input
            ref={input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for?"
            autoComplete="off"
            spellCheck={false}
            type="search"
          />
          {query && (
            <button
              className="site-search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                input.current?.focus();
              }}
            >
              <X size={16} />
            </button>
          )}
        </label>
        {!term ? (
          <div className="site-search-start">
            <div className="site-search-quick-links">
              {quickLinks.map(({ title, subtitle, href, icon: Icon }) => (
                <Link
                  className="site-search-result site-search-quick"
                  href={href}
                  key={href}
                  onClick={closeSearch}
                >
                  <Icon size={22} aria-hidden="true" />
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="site-search-suggestions">
              <span>Try</span>
              {["Pixi", "Python", "KAGE"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    input.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="site-search-summary" role="status">
              {allMatches.length > 6
                ? `Showing 6 of ${allMatches.length} matches`
                : `${matches.length} ${matches.length === 1 ? "result" : "results"}`}
            </p>
            <div className="site-search-results">
              {matches.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className="site-search-result site-search-match"
                  onClick={closeSearch}
                >
                  <span
                    className={`site-search-icon ${item.image ? "site-search-thumbnail" : ""}`}
                  >
                    {item.image ? (
                      <Image src={item.image} alt="" fill sizes="52px" />
                    ) : item.type === "Research paper" ? (
                      <FileText size={21} />
                    ) : (
                      <Hash size={21} />
                    )}
                  </span>
                  <span className="site-search-result-copy">
                    <small>{item.type}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              ))}
              {!matches.length && (
                <div className="site-search-empty">
                  <Search size={24} aria-hidden="true" />
                  <p>No results for “{query}”.</p>
                  <span>Try a project name or a technology.</span>
                </div>
              )}
            </div>
          </>
        )}
        <div className="site-search-help">
          <span>↑ ↓ navigate · Enter open</span>
          <span>Esc close</span>
          <span className="site-search-touch-help">Tap to explore.</span>
        </div>
      </dialog>
    </>
  );
}
