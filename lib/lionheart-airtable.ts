const AIRTABLE_BASE_ID = process.env.LIONHEART_AIRTABLE_BASE_ID || "appu7uDUA0BrNXUoC";

const tableIds = {
  chapters: "tblmZH0nSF2Vb3d6O",
  discrepancies: "tblM9grMG1iGYjhOe",
  sources: "tblcEN8CyK2WjHqoU",
  inbox: "tblwsMenLRxf86n1t",
  versions: "tbl8NXURSUTJPmFJL",
  worlds: "tblTBSU9t8pjrqe7A",
} as const;

type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

type AirtableListResponse<T> = {
  records: Array<AirtableRecord<T>>;
  offset?: string;
};

export type LionheartChapter = {
  id: string;
  title: string;
  volume: number;
  chapter: number;
  years: string;
  status: string;
  workingSummary?: string;
  currentDraftLink?: string;
  wordCount?: number;
  editorialNotes?: string;
};

export type LionheartDiscrepancy = {
  id: string;
  claim: string;
  category?: string;
  status?: string;
  conflictingSources?: string;
  affectedChapters?: string;
  resolution?: string;
  evidenceNotes?: string;
};

export type LionheartSource = {
  id: string;
  source: string;
  type?: string;
  storage?: string;
  dateOrPeriod?: string;
  sourceLink?: string;
  evidenceLevel?: string;
  notes?: string;
};

export type LionheartInboxItem = {
  id: string;
  item: string;
  type?: string;
  status?: string;
  suggestedChapter?: string;
  sourceLink?: string;
  notes?: string;
};

export type LionheartVersion = {
  id: string;
  version: string;
  scope?: string;
  volumeOrChapter?: string;
  date?: string;
  storage?: string;
  sourceLink?: string;
  status?: string;
  notes?: string;
};

function airtableToken() {
  return process.env.LIONHEART_AIRTABLE_TOKEN || "";
}

export function isLionheartAirtableConfigured() {
  return Boolean(airtableToken() && AIRTABLE_BASE_ID);
}

async function listTable<T>(tableId: string): Promise<Array<AirtableRecord<T>> | null> {
  const token = airtableToken();
  if (!token) return null;

  const records: Array<AirtableRecord<T>> = [];
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lionheart Airtable read failed", tableId, response.status);
      return null;
    }

    const data = (await response.json()) as AirtableListResponse<T>;
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

export async function getLionheartChapters(): Promise<LionheartChapter[] | null> {
  type Fields = {
    "Chapter Title"?: string;
    Volume?: number;
    Chapter?: number;
    Years?: string;
    Status?: string;
    "Working Summary"?: string;
    "Current Draft Link"?: string;
    "Word Count"?: number;
    "Editorial Notes"?: string;
  };

  const records = await listTable<Fields>(tableIds.chapters);
  if (!records) return null;

  return records
    .map((record) => ({
      id: record.id,
      title: record.fields["Chapter Title"] || "Untitled chapter",
      volume: record.fields.Volume || 0,
      chapter: record.fields.Chapter || 0,
      years: record.fields.Years || "",
      status: record.fields.Status || "Researching",
      workingSummary: record.fields["Working Summary"],
      currentDraftLink: record.fields["Current Draft Link"],
      wordCount: record.fields["Word Count"],
      editorialNotes: record.fields["Editorial Notes"],
    }))
    .sort((a, b) => a.volume - b.volume || a.chapter - b.chapter);
}

export async function getLionheartDiscrepancies(): Promise<LionheartDiscrepancy[] | null> {
  type Fields = {
    Claim?: string;
    Category?: string;
    Status?: string;
    "Conflicting Sources"?: string;
    "Affected Chapters"?: string;
    Resolution?: string;
    "Evidence Notes"?: string;
  };

  const records = await listTable<Fields>(tableIds.discrepancies);
  if (!records) return null;

  return records.map((record) => ({
    id: record.id,
    claim: record.fields.Claim || "Untitled discrepancy",
    category: record.fields.Category,
    status: record.fields.Status,
    conflictingSources: record.fields["Conflicting Sources"],
    affectedChapters: record.fields["Affected Chapters"],
    resolution: record.fields.Resolution,
    evidenceNotes: record.fields["Evidence Notes"],
  }));
}

export async function getLionheartSources(): Promise<LionheartSource[] | null> {
  type Fields = {
    Source?: string;
    Type?: string;
    Storage?: string;
    "Date or Period"?: string;
    "Source Link"?: string;
    "Evidence Level"?: string;
    Notes?: string;
  };

  const records = await listTable<Fields>(tableIds.sources);
  if (!records) return null;

  return records.map((record) => ({
    id: record.id,
    source: record.fields.Source || "Untitled source",
    type: record.fields.Type,
    storage: record.fields.Storage,
    dateOrPeriod: record.fields["Date or Period"],
    sourceLink: record.fields["Source Link"],
    evidenceLevel: record.fields["Evidence Level"],
    notes: record.fields.Notes,
  }));
}

export async function getLionheartInbox(): Promise<LionheartInboxItem[] | null> {
  type Fields = {
    Item?: string;
    Type?: string;
    Status?: string;
    "Suggested Chapter"?: string;
    "Source Link"?: string;
    Notes?: string;
  };

  const records = await listTable<Fields>(tableIds.inbox);
  if (!records) return null;

  return records.map((record) => ({
    id: record.id,
    item: record.fields.Item || "Untitled inbox item",
    type: record.fields.Type,
    status: record.fields.Status,
    suggestedChapter: record.fields["Suggested Chapter"],
    sourceLink: record.fields["Source Link"],
    notes: record.fields.Notes,
  }));
}

export async function getLionheartVersions(): Promise<LionheartVersion[] | null> {
  type Fields = {
    Version?: string;
    Scope?: string;
    "Volume or Chapter"?: string;
    Date?: string;
    Storage?: string;
    "Source Link"?: string;
    Status?: string;
    Notes?: string;
  };

  const records = await listTable<Fields>(tableIds.versions);
  if (!records) return null;

  return records.map((record) => ({
    id: record.id,
    version: record.fields.Version || "Untitled version",
    scope: record.fields.Scope,
    volumeOrChapter: record.fields["Volume or Chapter"],
    date: record.fields.Date,
    storage: record.fields.Storage,
    sourceLink: record.fields["Source Link"],
    status: record.fields.Status,
    notes: record.fields.Notes,
  }));
}
