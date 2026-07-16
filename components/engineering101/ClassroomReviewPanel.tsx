"use client";

import { Check, CircleHelp, ClipboardCheck, GitCompare, Lightbulb, MessageSquareText, Plus, ScanSearch, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { useClassroomReview } from "@/components/engineering101/useClassroomReview";
import type { ClassroomDesign, DesignView, DevicePlacement } from "@/data/engineering101/design";
import type { EngineeringDevice } from "@/data/engineering101/devices";
import { mentorHintsFor, qcMentorNotes } from "@/data/engineering101/mentorNotes";
import { assumptionStatuses, emptyTeachBack, plantedQcIssues, redlineCategories, type AssumptionStatus, type DesignFinding, type RedlineCategory, type TeachBackResponse } from "@/data/engineering101/review";

type ClassroomReviewPanelProps = {
  design: ClassroomDesign;
  activeView: DesignView;
  selectedPlacement?: DevicePlacement;
  selectedDevice?: EngineeringDevice;
  findings: DesignFinding[];
  reviewTools: ReturnType<typeof useClassroomReview>;
  redlineArmed: boolean;
  setRedlineArmed: (value: boolean) => void;
  redlineCategory: RedlineCategory;
  setRedlineCategory: (value: RedlineCategory) => void;
  redlineConsequence: string;
  setRedlineConsequence: (value: string) => void;
  onStatus: (message: string) => void;
};

export function ClassroomReviewPanel({ design, activeView, selectedPlacement, selectedDevice, findings, reviewTools, redlineArmed, setRedlineArmed, redlineCategory, setRedlineCategory, redlineConsequence, setRedlineConsequence, onStatus }: ClassroomReviewPanelProps) {
  const [assumptionText, setAssumptionText] = useState("");
  const [assumptionStatus, setAssumptionStatus] = useState<AssumptionStatus>("Pending");
  const [teachBackDraft, setTeachBackDraft] = useState<TeachBackResponse>(emptyTeachBack(""));
  const selectedResponse = selectedPlacement ? reviewTools.review.teachBack[selectedPlacement.instanceId] : undefined;
  const hints = useMemo(() => selectedDevice ? mentorHintsFor(selectedDevice) : [], [selectedDevice]);
  const currentHint = reviewTools.review.hintLevel ? hints[reviewTools.review.hintLevel - 1] : undefined;

  useEffect(() => {
    if (!selectedPlacement || !selectedDevice) { setTeachBackDraft(emptyTeachBack("")); return; }
    setTeachBackDraft(selectedResponse ?? { ...emptyTeachBack(selectedPlacement.instanceId), division: selectedDevice.division, servedFrom: selectedDevice.sourceType, pathway: selectedDevice.pathwayType });
  }, [selectedDevice, selectedPlacement, selectedResponse]);

  function updateTeachBack(field: keyof TeachBackResponse, value: string) {
    setTeachBackDraft((current) => ({ ...current, [field]: value }));
  }

  return <section className="classroom-review" aria-labelledby="design-review-heading">
    <div className="review-heading">
      <div><p className="quest-panel-kicker">Design review</p><h3 id="design-review-heading">Explain it. Check it. Improve it.</h3></div>
      <button type="button" onClick={() => onStatus(`Design check complete. ${findings.length} educational finding${findings.length === 1 ? "" : "s"}.`)}><ScanSearch /> Check design</button>
    </div>

    <div className="review-grid">
      <section className="feedback-panel" aria-labelledby="feedback-heading">
        <div className="review-subheading"><ClipboardCheck /><div><h4 id="feedback-heading">Categorized feedback</h4><p>{findings.length} current finding{findings.length === 1 ? "" : "s"}</p></div></div>
        <div className="feedback-list" aria-live="polite">
          {findings.map((finding) => <article key={finding.id} className={`feedback-item severity-${finding.severity.toLowerCase().replaceAll(" ", "-")}`} data-category={finding.category}>
            <span>{finding.category}</span><strong>{finding.title}</strong><p>{finding.message}</p><small>{finding.severity}</small>
          </article>)}
        </div>
      </section>

      <section className="mentor-hint-panel" aria-labelledby="mentor-hint-heading">
        <div className="review-subheading"><Lightbulb /><div><h4 id="mentor-hint-heading">Mentor Hint</h4><p>{reviewTools.review.hintUsage} hint request{reviewTools.review.hintUsage === 1 ? "" : "s"}</p></div></div>
        <blockquote>&ldquo;{currentHint?.message || "Start with the purpose of the device, then trace what serves it."}&rdquo;</blockquote>
        {currentHint && <p className="hint-level">Hint {currentHint.level} of 4: {currentHint.label}</p>}
        <div className="review-actions">
          <button type="button" onClick={() => { reviewTools.nextHint(); onStatus(`Mentor Hint ${Math.min(4, reviewTools.review.hintLevel + 1)} opened.`); }} disabled={reviewTools.review.hintLevel >= 4}><CircleHelp /> {reviewTools.review.hintLevel ? "Next hint" : "Open Mentor Hint"}</button>
          {reviewTools.review.hintLevel > 0 && <button type="button" onClick={reviewTools.resetHint}>Reset hints</button>}
        </div>
      </section>
    </div>

    <section className="assumption-log" aria-labelledby="assumption-log-heading">
      <div className="review-subheading"><MessageSquareText /><div><h4 id="assumption-log-heading">Assumption log</h4><p>Keep temporary design decisions visible to the team.</p></div></div>
      <div className="assumption-form">
        <label><span>Design assumption</span><input value={assumptionText} onChange={(event) => setAssumptionText(event.target.value)} placeholder="Example: Owner technology standard is pending." maxLength={280} /></label>
        <label><span>Status</span><select value={assumptionStatus} onChange={(event) => setAssumptionStatus(event.target.value as AssumptionStatus)}>{assumptionStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <button type="button" onClick={() => { reviewTools.addAssumption(assumptionText, assumptionStatus); if (assumptionText.trim()) { setAssumptionText(""); onStatus("Assumption added to the local design record."); } }}><Plus /> Add assumption</button>
      </div>
      {reviewTools.review.assumptions.length ? <ul className="assumption-list">{reviewTools.review.assumptions.map((assumption) => <li key={assumption.id}><span>{assumption.status}</span><p>{assumption.text}</p><button type="button" onClick={() => reviewTools.removeAssumption(assumption.id)} aria-label={`Remove assumption: ${assumption.text}`}><Trash2 /></button></li>)}</ul> : <p className="review-empty">No assumptions recorded yet.</p>}
    </section>

    <section className={`qc-review ${reviewTools.review.qcActive ? "is-active" : ""}`} aria-labelledby="qc-review-heading">
      <div className="review-subheading"><ScanSearch /><div><h4 id="qc-review-heading">QC Challenge</h4><p>Find, classify, explain, and correct the planted coordination issues.</p></div></div>
      {!reviewTools.review.qcActive ? <button type="button" className="review-primary" onClick={() => { reviewTools.startQc(design); onStatus("QC Challenge started. Three planted issues are ready for review."); }}>Enter QC Challenge</button> : <>
        <blockquote>&ldquo;{qcMentorNotes[reviewTools.review.redlines.length % qcMentorNotes.length]}&rdquo;</blockquote>
        <div className="qc-planted-list" aria-label="Planted QC issues">{plantedQcIssues.map((issue) => <article key={issue.id} data-testid="qc-planted-issue"><strong>{issue.title}</strong><p>{issue.prompt}</p></article>)}</div>
        <div className="redline-controls">
          <label><span>Issue class</span><select value={redlineCategory} onChange={(event) => setRedlineCategory(event.target.value as RedlineCategory)}>{redlineCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label><span>Likely consequence</span><input value={redlineConsequence} onChange={(event) => setRedlineConsequence(event.target.value)} placeholder="What could this affect?" maxLength={220} /></label>
          <button type="button" aria-pressed={redlineArmed} onClick={() => { setRedlineArmed(!redlineArmed); onStatus(redlineArmed ? "Redline tool paused." : "Redline tool armed. Select a point on the drawing."); }}><Plus /> {redlineArmed ? "Redline armed" : "Add redline"}</button>
        </div>
        {reviewTools.review.redlines.length ? <ol className="redline-list">{reviewTools.review.redlines.map((redline, index) => <li key={redline.id} className={redline.resolved ? "is-resolved" : ""}><span>{index + 1}</span><div><strong>{redline.category}</strong><p>{redline.consequence}</p></div><button type="button" onClick={() => reviewTools.toggleRedline(redline.id)}>{redline.resolved ? "Reopen" : "Resolve"}</button><button type="button" onClick={() => reviewTools.removeRedline(redline.id)} aria-label={`Delete redline ${index + 1}`}><Trash2 /></button></li>)}</ol> : <p className="review-empty">Arm the redline tool, then select a problem location on the drawing.</p>}
        <div className="compare-tools" aria-label="Before and corrected plan comparison">
          <GitCompare />
          <button type="button" aria-pressed={reviewTools.compareMode === "before"} onClick={() => reviewTools.setCompareMode("before")}>Before review</button>
          <button type="button" aria-pressed={reviewTools.compareMode === "current"} onClick={() => reviewTools.setCompareMode("current")}>Working plan</button>
          <button type="button" aria-pressed={reviewTools.compareMode === "corrected"} disabled={!reviewTools.review.correctedDesign} onClick={() => reviewTools.setCompareMode("corrected")}>Corrected plan</button>
          <button type="button" onClick={() => { reviewTools.saveCorrection(design); onStatus("Corrected plan snapshot saved for comparison."); }}><Check /> Save corrected plan</button>
          <button type="button" onClick={() => { reviewTools.endQc(); setRedlineArmed(false); onStatus("QC Challenge closed. Redlines remain saved locally."); }}><X /> Close QC</button>
        </div>
        <p className="compare-summary">Before: {reviewTools.review.baselineDesign?.placements.length ?? 0} devices. Working: {design.placements.length}. Resolved redlines: {reviewTools.review.redlines.filter((item) => item.resolved).length} / {reviewTools.review.redlines.length}. View checked: {activeView}.</p>
      </>}
    </section>

    <section className="teach-back" aria-labelledby="teach-back-heading">
      <div className="review-subheading"><MessageSquareText /><div><h4 id="teach-back-heading">Teach-back prompts</h4><p>Explain the selected placement in the guide&apos;s seven-part structure.</p></div></div>
      <blockquote>&ldquo;This belongs to Division __. It is served from __. It uses __ pathway. It is located here because __. It coordinates with __. The remaining assumption is __. It is tested or commissioned by __.&rdquo;</blockquote>
      {selectedPlacement && selectedDevice ? <form className="teach-back-form" onSubmit={(event) => { event.preventDefault(); reviewTools.saveTeachBack(teachBackDraft); onStatus(`${selectedDevice.name} teach-back saved locally.`); }}>
        <label><span>This belongs to Division</span><select value={teachBackDraft.division} onChange={(event) => updateTeachBack("division", event.target.value)}><option value="">Select</option><option value="26">26</option><option value="27">27</option><option value="28">28</option></select></label>
        <label><span>It is served from</span><select value={teachBackDraft.servedFrom} onChange={(event) => updateTeachBack("servedFrom", event.target.value)}><option value="">Select</option><option value={selectedDevice.sourceType}>{selectedDevice.sourceType}</option><option value="Classroom panel branch circuit">Classroom panel branch circuit</option><option value="IDF or communications headend">IDF or communications headend</option><option value="Ordinary branch circuit">Ordinary branch circuit</option></select></label>
        <label><span>It uses this pathway</span><select value={teachBackDraft.pathway} onChange={(event) => updateTeachBack("pathway", event.target.value)}><option value="">Select</option><option value={selectedDevice.pathwayType}>{selectedDevice.pathwayType}</option><option value="Ordinary branch-circuit conductors">Ordinary branch-circuit conductors</option><option value="Structured cabling toward the IDF">Structured cabling toward the IDF</option><option value="Supervised life-safety pathway">Supervised life-safety pathway</option></select></label>
        <label><span>It is located here because</span><textarea value={teachBackDraft.rationale} onChange={(event) => updateTeachBack("rationale", event.target.value)} rows={2} required /></label>
        <label><span>It coordinates with</span><textarea value={teachBackDraft.coordinatesWith} onChange={(event) => updateTeachBack("coordinatesWith", event.target.value)} rows={2} required /></label>
        <label><span>The remaining assumption is</span><textarea value={teachBackDraft.remainingAssumption} onChange={(event) => updateTeachBack("remainingAssumption", event.target.value)} rows={2} required /></label>
        <label><span>It is tested or commissioned by</span><textarea value={teachBackDraft.testing} onChange={(event) => updateTeachBack("testing", event.target.value)} rows={2} required /></label>
        <button type="submit"><Check /> Save teach-back</button>
      </form> : <p className="review-empty">Select a placed device on the drawing to open its teach-back form.</p>}
    </section>
  </section>;
}
