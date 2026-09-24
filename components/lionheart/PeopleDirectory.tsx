"use client";

import { useMemo, useState } from "react";
import type { LionheartPerson } from "@/lib/lionheart-airtable";

const typeOrder = [
  "Family",
  "Chosen Family",
  "Love / Relationship",
  "Mentor / Educator",
  "Fraternity",
  "Church / Faith",
  "Career",
  "Arts / Community",
  "Public Context",
  "Other",
];

export function PeopleDirectory({ people }: { people: LionheartPerson[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const types = useMemo(() => {
    const counts = new Map<string, number>();
    for (const person of people) {
      const label = person.peopleType || "Other";
      counts.set(label, (counts.get(label) || 0) + 1);
    }
    return typeOrder
      .filter((label) => counts.has(label))
      .map((label) => ({ label, count: counts.get(label) || 0 }));
  }, [people]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return people.filter((person) => {
      if (type !== "All" && (person.peopleType || "Other") !== type) return false;
      if (!needle) return true;
      return [
        person.name,
        person.relationshipOrRole,
        person.peopleType,
        person.birthDate,
        person.firstAppears,
        person.relatedChapters,
        person.notes,
        person.sourceBasis,
      ].some((value) => value?.toLowerCase().includes(needle));
    });
  }, [people, query, type]);

  return (
    <>
      <div className="mt-8 rounded-2xl border border-[#1f5e99]/20 bg-[#f5f9fd] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="block flex-1">
            <span className="sr-only">Search people</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, role, chapter, or source…"
              className="w-full rounded-xl border border-[#1f5e99]/30 bg-white px-4 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#1f5e99]/30"
            />
          </label>
          <p className="text-sm font-bold text-[#174a7e]">
            {filtered.length} of {people.length} people
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter people by type">
          <button
            type="button"
            onClick={() => setType("All")}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${
              type === "All"
                ? "border-[#1f5e99] bg-[#1f5e99] text-white"
                : "border-[#1f5e99]/25 bg-white text-black"
            }`}
          >
            All · {people.length}
          </button>
          {types.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setType(item.label)}
              className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${
                type === item.label
                  ? "border-[#1f5e99] bg-[#1f5e99] text-white"
                  : "border-[#1f5e99]/25 bg-white text-black"
              }`}
            >
              {item.label} · {item.count}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((person) => (
          <article key={person.id} className="lionheart-panel">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="lionheart-kicker">{person.peopleType || "Other"}</p>
                <h2 className="mt-2 font-serif text-2xl font-bold">{person.name}</h2>
                {person.relationshipOrRole ? (
                  <p className="mt-2 text-sm font-semibold text-[#174a7e]">{person.relationshipOrRole}</p>
                ) : null}
              </div>
              {person.privacy ? (
                <span className="rounded-full border border-[#c89a32]/45 px-3 py-1 text-xs font-bold">
                  {person.privacy}
                </span>
              ) : null}
            </div>

            {person.birthDate ? (
              <div className="mt-5 rounded-xl bg-[#eaf3fb] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">Birth date</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{person.birthDate}</p>
                  {person.birthDateStatus ? (
                    <span className="rounded-full border border-[#1f5e99]/25 bg-white px-2 py-1 text-[0.68rem] font-bold text-[#174a7e]">
                      {person.birthDateStatus}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}

            {person.firstAppears ? (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">First appears</p>
                <p className="mt-1 text-sm leading-6 opacity-75">{person.firstAppears}</p>
              </div>
            ) : null}

            {person.relatedChapters ? (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">Related chapters</p>
                <p className="mt-1 text-sm leading-6 opacity-75">{person.relatedChapters}</p>
              </div>
            ) : null}

            {person.notes ? (
              <p className="mt-5 border-t border-[#1f5e99]/15 pt-4 text-sm leading-6 opacity-70">
                {person.notes}
              </p>
            ) : null}

            {person.sourceBasis ? (
              <details className="mt-4 border-t border-[#1f5e99]/15 pt-4">
                <summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.12em] text-[#174a7e]">
                  Source basis
                </summary>
                <p className="mt-2 text-xs leading-5 opacity-65">{person.sourceBasis}</p>
              </details>
            ) : null}
          </article>
        ))}

        {!filtered.length ? (
          <div className="lionheart-panel md:col-span-2 xl:col-span-3">
            <p className="text-sm opacity-65">No people match this search or category.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
