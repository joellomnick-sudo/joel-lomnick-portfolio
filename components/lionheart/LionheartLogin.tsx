type LionheartLoginProps = {
  configured: boolean;
  error?: string;
};

export function LionheartLogin({ configured, error }: LionheartLoginProps) {
  return (
    <section className="min-h-[70vh] bg-softBlack px-6 py-20 text-warmIvory">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Private access</p>
        <h1 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">Lionheart Story Studio</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-warmIvory/80">
          This area is private. Enter the owner access key to continue.
        </p>

        {!configured ? (
          <div className="mt-8 rounded-2xl border border-mutedGold/40 bg-richBlack p-6">
            <p className="font-bold text-softGold">Private access is not configured yet.</p>
            <p className="mt-3 text-sm leading-6 text-warmIvory/75">
              The secure shell is installed, but the two private Lionheart secrets still need to be added in the hosting settings before login can be enabled.
            </p>
          </div>
        ) : (
          <form action="/api/lionheart/login" method="post" className="mt-8 rounded-2xl border border-mutedGold/40 bg-richBlack p-6 shadow-2xl">
            <label htmlFor="accessKey" className="block text-sm font-bold text-softGold">
              Owner access key
            </label>
            <input
              id="accessKey"
              name="accessKey"
              type="password"
              autoComplete="current-password"
              required
              className="mt-3 w-full rounded-xl border border-warmIvory/20 bg-softBlack px-4 py-3 text-base text-warmIvory outline-none ring-mutedGold transition focus:ring-2"
            />
            {error === "invalid" ? (
              <p className="mt-3 text-sm text-warmIvory/75">That access key was not accepted.</p>
            ) : null}
            <button
              type="submit"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-mutedGold px-6 py-3 text-sm font-bold text-richBlack transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-softGold focus:ring-offset-2 focus:ring-offset-richBlack"
            >
              Enter Lionheart
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
