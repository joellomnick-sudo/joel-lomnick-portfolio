import Link from "next/link";
import { getLionheartTimeline } from "@/lib/lionheart-airtable";

export default async function TimelinePage() {
  const timeline = await getLionheartTimeline();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="lionheart-kicker">Timeline</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          The chronology behind the narrative.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 opacity-70">
          Events stay separate from certainty. Each entry shows where it belongs in the books, what it changed emotionally,
          and how strongly the current evidence supports the chronology.
        </p>

        <div className="relative mt-12 border-l border-[#1f5e99]/25 pl-7">
          {timeline?.length ? timeline.map((item) => {
            const href = item.volume === 1
              ? `/lionheart/volume-one/${item.chapter}`
              : `/lionheart/volume-two/${item.chapter}`;

            return (
              <article key={item.id} className="lionheart-panel relative mb-7">
                <span
                  className="absolute -left-[2.15rem] top-7 h-3 w-3 rounded-full bg-[#1f5e99]"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="lionheart-kicker">{item.dateOrPeriod}</p>
                    <h2 className="mt-2 font-serif text-2xl font-bold">{item.event}</h2>
                    {item.place ? <p className="mt-2 text-sm opacity-65">{item.place}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-[#1f5e99]/25 px-3 py-1">
                      {item.evidenceLevel || "Unclassified"}
                    </span>
                    <span className="rounded-full border border-[#c89a32]/45 px-3 py-1">
                      {item.status || "Working"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">Emotional impact</p>
                    <p className="mt-2 text-sm leading-6 opacity-75">
                      {item.emotionalImpact || "Not yet mapped."}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b4a2f]">Long-term consequence</p>
                    <p className="mt-2 text-sm leading-6 opacity-75">
                      {item.longTermConsequence || "Not yet mapped."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1f5e99]/15 pt-4 text-xs">
                  <span className="opacity-60">Volume {item.volume} · Chapter {item.chapter}</span>
                  <Link href={href} className="font-bold text-[#174a7e]">
                    Open chapter →
                  </Link>
                </div>
              </article>
            );
          }) : (
            <div className="lionheart-panel">
              <p className="text-sm opacity-65">No timeline events are connected yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
