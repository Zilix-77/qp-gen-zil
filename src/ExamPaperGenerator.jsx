// ExamPaperGenerator.jsx
import { useState, useEffect } from "react";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */

const PRESET_SUBJECTS = [
  "Data Base Management Systems",
  "Computer Networks",
  "Operating Systems",
  "Data Structures",
  "Software Engineering",
  "Digital Electronics",
  "Microprocessors",
  "Web Technology",
  "Programming in C",
  "Object Oriented Programming",
  "Artificial Intelligence",
  "Computer Organization",
];

const makeDefaultData = (subject = "", department = "", code = "") => ({
  code: code || "TED (21)6151 B",
  semester: "SIXTH SEMESTER DIPLOMA FIRST SERIES",
  examType: "EXAMINATION",
  month: "FEBRUARY 2026",
  department: department || "Department of Computer Engineering",
  subject: subject.toUpperCase() || "SUBJECT NAME",
  time: "1 Hour",
  maxMarks: "20",
  partANote: "Answer all questions in one word or one sentence. Each question carries 1 mark.",
  partBNote: "Answer all questions. Each question carries 3 marks.",
  partCNote: "Answer ANY ONE question. Each question carries 7 marks.",
  partA: [
    { qn: "1", question: "Define a key term related to " + (subject || "this subject") + ".", co: "CO1", btl: "U" },
    { qn: "2", question: "State one important concept.", co: "CO1", btl: "U" },
  ],
  partB: [
    { qn: "3", question: "Write brief notes on a core topic in " + (subject || "this subject") + ".", co: "CO1", btl: "U" },
  ],
  partC: [
    { qn: "4", question: "Explain in detail any one major topic from " + (subject || "this subject") + ".", co: "CO1", btl: "U" },
  ],
});

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────────── */

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inconsolata:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; }
body { background: #0e0e0e; font-family: 'Inconsolata', monospace; }

/* toolbar */
.g-tb { background:#1c1c1c; padding:0 22px; height:50px; display:flex; align-items:center; gap:10px; position:sticky; top:0; z-index:300; border-bottom:1px solid rgba(255,255,255,0.06); }
.g-tb-brand { font-family:'Inconsolata',monospace; font-size:10.5px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:#f0ede8; flex:1; display:flex; align-items:center; gap:9px; }
.g-tb-brand::before { content:''; display:block; width:7px; height:7px; background:#e8d85a; border-radius:50%; flex-shrink:0; }
.g-tb-subj { font-family:'Inconsolata',monospace; font-size:10px; color:#e8d85a; letter-spacing:0.8px; max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.g-btn { font-family:'Inconsolata',monospace; font-size:10px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; padding:7px 13px; border-radius:2px; border:none; cursor:pointer; transition:all 0.12s; white-space:nowrap; }
.g-btn-ghost { background:transparent; color:rgba(240,237,232,0.4); border:1px solid rgba(255,255,255,0.1); }
.g-btn-ghost:hover { color:#f0ede8; border-color:rgba(255,255,255,0.3); }
.g-btn-ghost.on { color:#e8d85a; border-color:rgba(232,216,90,0.5); }
.g-btn-yellow { background:#e8d85a; color:#1c1c1c; }
.g-btn-yellow:hover { background:#f0e870; }

/* home */
.home-wrap { min-height:100vh; background:#0e0e0e; display:flex; align-items:center; justify-content:center; padding:40px 20px; position:relative; overflow:hidden; }
.home-grid { position:absolute; inset:0; background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.022) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.022) 60px); pointer-events:none; }
.home-glow { position:absolute; width:700px; height:700px; background:radial-gradient(circle,rgba(232,216,90,0.05) 0%,transparent 65%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
.home-card { position:relative; width:100%; max-width:560px; background:#141414; border:1px solid rgba(255,255,255,0.07); border-radius:4px; padding:52px 46px 44px; opacity:0; transform:translateY(26px); transition:opacity 0.55s cubic-bezier(.22,1,.36,1),transform 0.55s cubic-bezier(.22,1,.36,1); }
.home-card.in { opacity:1; transform:translateY(0); }
.h-eyebrow { font-family:'Inconsolata',monospace; font-size:10px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:#e8d85a; margin-bottom:16px; display:flex; align-items:center; gap:10px; }
.h-eyebrow::before { content:''; display:block; width:22px; height:1px; background:#e8d85a; }
.h-title { font-family:'Playfair Display',serif; font-size:42px; font-weight:900; color:#f5f2ec; line-height:1.08; margin-bottom:8px; }
.h-title em { font-style:italic; color:#e8d85a; }
.h-sub { font-family:'Inconsolata',monospace; font-size:11.5px; color:rgba(245,242,236,0.32); margin-bottom:38px; }
.fg { margin-bottom:17px; position:relative; }
.fg-label { display:block; font-family:'Inconsolata',monospace; font-size:9.5px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:rgba(245,242,236,0.45); margin-bottom:7px; }
.fg-label sup { color:#e8d85a; }
.fg-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:3px; padding:12px 15px; font-family:'Inconsolata',monospace; font-size:13px; color:#ffffff; outline:none; transition:border-color 0.14s,background 0.14s; caret-color:#e8d85a; }
.fg-input::placeholder { color:rgba(245,242,236,0.2); }
.fg-input:focus { border-color:rgba(232,216,90,0.55); background:rgba(232,216,90,0.04); color:#ffffff; }
.sugg { position:absolute; top:100%; left:0; right:0; background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-top:none; border-radius:0 0 3px 3px; z-index:60; }
.si { padding:9px 15px; font-family:'Inconsolata',monospace; font-size:12px; color:rgba(245,242,236,0.6); cursor:pointer; transition:background 0.1s,color 0.1s; }
.si:hover { background:rgba(232,216,90,0.07); color:#e8d85a; }
.fg-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.h-start { width:100%; margin-top:6px; padding:15px; background:#e8d85a; border:none; border-radius:3px; font-family:'Inconsolata',monospace; font-size:11.5px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:#0e0e0e; cursor:pointer; transition:background 0.12s; }
.h-start:hover { background:#f0e870; }
.h-start:disabled { background:rgba(232,216,90,0.22); color:rgba(14,14,14,0.35); cursor:not-allowed; }
.h-foot { text-align:center; margin-top:20px; font-family:'Inconsolata',monospace; font-size:9.5px; color:rgba(245,242,236,0.18); letter-spacing:0.8px; }

/* editor canvas */
.ecanvas { padding:24px 14px 48px; display:flex; justify-content:center; background:#f0ede8; min-height:calc(100vh - 50px); }

/* A4 landscape sheet */
.psheet { background:white; width:297mm; min-height:210mm; padding:8mm 9mm; display:flex; gap:5mm; box-shadow:0 8px 32px rgba(0,0,0,0.1),0 24px 64px rgba(0,0,0,0.07); border-radius:2px; }

/* half panels */
.phalf { flex:1; border:1px solid #c8c0b8; position:relative; min-width:0; overflow:hidden; display:flex; flex-direction:column; }
.phalf.ed { border-color:#c8b820; }

/* panel header label */
.phalf-label { font-family:'Inconsolata',monospace; font-size:7.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:3px 8px; display:flex; align-items:center; gap:5px; border-bottom:1px solid rgba(0,0,0,0.07); flex-shrink:0; }
.phalf-label.lbl-edit { background:#e8d85a; color:#1c1c1c; }
.phalf-label.lbl-preview { background:#e8e4de; color:#6a6060; }
.lbl-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
.lbl-edit .lbl-dot { background:#1c1c1c; }
.lbl-preview .lbl-dot { background:#9a9490; }
.phalf-body { padding:5px 6px; flex:1; overflow:auto; }

/* dashed divider */
.pdiv { width:1px; background:repeating-linear-gradient(to bottom,#c8c0b8 0,#c8c0b8 4px,transparent 4px,transparent 8px); flex-shrink:0; margin:0 1mm; }

/* paper input focus ring */
.phalf input:focus, .phalf textarea:focus {
  background:rgba(232,216,90,0.07)!important;
  outline:1px solid rgba(232,216,90,0.45)!important;
  border-radius:1px;
}
.phalf input, .phalf textarea { color:#000!important; }

/* print dialog */
.pdlg-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:999; display:flex; align-items:center; justify-content:center; }
.pdlg { background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:32px 36px; width:360px; font-family:'Inconsolata',monospace; }
.pdlg-title { font-size:13px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#f0ede8; margin-bottom:6px; }
.pdlg-sub { font-size:10px; color:rgba(240,237,232,0.35); margin-bottom:28px; letter-spacing:0.5px; }
.pdlg-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
.pdlg-row-label { font-size:11px; color:rgba(240,237,232,0.7); letter-spacing:0.5px; }
.pdlg-row-desc { font-size:9px; color:rgba(240,237,232,0.3); margin-top:2px; }
.toggle-wrap { display:flex; align-items:center; gap:8px; }
.toggle { position:relative; width:40px; height:22px; flex-shrink:0; }
.toggle input { opacity:0; width:0; height:0; }
.toggle-slider { position:absolute; inset:0; background:#333; border-radius:22px; cursor:pointer; transition:background 0.2s; }
.toggle-slider::before { content:''; position:absolute; width:16px; height:16px; left:3px; top:3px; background:white; border-radius:50%; transition:transform 0.2s; }
.toggle input:checked + .toggle-slider { background:#e8d85a; }
.toggle input:checked + .toggle-slider::before { transform:translateX(18px); }
.orient-btns { display:flex; gap:6px; }
.orient-btn { font-family:'Inconsolata',monospace; font-size:10px; padding:5px 12px; border-radius:3px; border:1px solid rgba(255,255,255,0.12); background:transparent; color:rgba(240,237,232,0.4); cursor:pointer; transition:all 0.12s; display:flex; align-items:center; gap:5px; }
.orient-btn.active { background:rgba(232,216,90,0.1); border-color:rgba(232,216,90,0.5); color:#e8d85a; }
.pdlg-actions { display:flex; gap:10px; margin-top:28px; }
.pdlg-cancel { flex:1; padding:11px; background:transparent; border:1px solid rgba(255,255,255,0.1); border-radius:3px; font-family:'Inconsolata',monospace; font-size:11px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:rgba(240,237,232,0.4); cursor:pointer; transition:all 0.12s; }
.pdlg-cancel:hover { color:#f0ede8; border-color:rgba(255,255,255,0.3); }
.pdlg-confirm { flex:2; padding:11px; background:#e8d85a; border:none; border-radius:3px; font-family:'Inconsolata',monospace; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#0e0e0e; cursor:pointer; transition:background 0.12s; }
.pdlg-confirm:hover { background:#f0e870; }

/* separator row */
.sep-row { display:flex; align-items:center; gap:6px; margin:2px 0; }
.sep-line { flex:1; height:1px; background:#bbb; }
.sep-label { font-family:'Times New Roman',serif; font-size:8px; font-style:italic; color:#555; white-space:nowrap; }
.sep-input { font-family:'Times New Roman',serif; font-size:8px; font-style:italic; color:#333; background:transparent; border:none; border-bottom:1px dashed #aaa; outline:none; width:80px; text-align:center; padding:0 2px; }
.sep-del { background:none; border:none; color:#c02020; font-size:11px; cursor:pointer; padding:0 2px; line-height:1; flex-shrink:0; }

/* print */
@media print {
  body { background:white!important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .g-tb, .layout-strip, .pdlg-overlay { display:none!important; }
  .phalf-label { display:none!important; }
  .ecanvas { padding:0; background:white!important; min-height:unset; display:block; }
  .edit-panel { display:none!important; }
  .sep-del, .add-sep-btn { display:none!important; }
  button { display:none!important; }

  /* ── SINGLE PORTRAIT (default) ── */
  body.print-single-portrait .psheet { box-shadow:none; border-radius:0; width:100%; min-height:unset; gap:0; padding:0; display:block; }
  body.print-single-portrait .pdiv, body.print-single-portrait .dup-copy { display:none!important; }
  body.print-single-portrait .phalf { border:none!important; overflow:visible!important; width:100%; display:block; padding:10mm 14mm; }
  body.print-single-portrait .phalf-body { overflow:visible!important; }
  body.print-single-portrait .phalf-body > div { font-size:13pt!important; line-height:1.6!important; }
  body.print-single-portrait .phalf-body table { font-size:12pt!important; width:100%!important; }
  body.print-single-portrait .phalf-body th { font-size:11pt!important; padding:5pt 7pt!important; }
  body.print-single-portrait .phalf-body td { font-size:11pt!important; padding:5pt 7pt!important; }
  body.print-single-portrait .phalf-body span { font-size:11pt!important; font-family:'Times New Roman',serif!important; }

  /* ── SINGLE LANDSCAPE ── */
  body.print-single-landscape .psheet { box-shadow:none; border-radius:0; width:100%; min-height:unset; gap:0; padding:0; display:block; }
  body.print-single-landscape .pdiv, body.print-single-landscape .dup-copy { display:none!important; }
  body.print-single-landscape .phalf { border:none!important; overflow:visible!important; width:100%; display:block; padding:8mm 14mm; }
  body.print-single-landscape .phalf-body { overflow:visible!important; }
  body.print-single-landscape .phalf-body > div { font-size:12pt!important; line-height:1.5!important; }
  body.print-single-landscape .phalf-body table { font-size:11pt!important; width:100%!important; }
  body.print-single-landscape .phalf-body th { font-size:10pt!important; padding:4pt 6pt!important; }
  body.print-single-landscape .phalf-body td { font-size:10pt!important; padding:4pt 6pt!important; }
  body.print-single-landscape .phalf-body span { font-size:10pt!important; font-family:'Times New Roman',serif!important; }

  /* ── DUPLICATE PORTRAIT — two half-page columns on A4 portrait ── */
  body.print-dup-portrait .psheet { box-shadow:none; border-radius:0; width:100%; min-height:297mm; gap:0; padding:5mm; display:flex; flex-direction:row; }
  body.print-dup-portrait .pdiv { display:block!important; width:1px!important; background:#999!important; margin:0 3mm!important; flex-shrink:0; }
  body.print-dup-portrait .dup-copy { display:flex!important; }
  body.print-dup-portrait .phalf { border:1px solid #ccc!important; overflow:visible!important; flex:1; display:flex; flex-direction:column; padding:3mm; }
  body.print-dup-portrait .phalf-body { overflow:visible!important; }
  body.print-dup-portrait .phalf-body > div { font-size:7pt!important; line-height:1.4!important; }
  body.print-dup-portrait .phalf-body table { font-size:6.5pt!important; width:100%!important; }
  body.print-dup-portrait .phalf-body th { font-size:6pt!important; padding:2pt 3pt!important; }
  body.print-dup-portrait .phalf-body td { font-size:6pt!important; padding:2pt 3pt!important; }
  body.print-dup-portrait .phalf-body span { font-size:6pt!important; font-family:'Times New Roman',serif!important; }

  /* ── DUPLICATE LANDSCAPE — two copies on A4 landscape ── */
  body.print-dup-landscape .psheet { box-shadow:none; border-radius:0; width:100%; min-height:210mm; gap:0; padding:5mm; display:flex; flex-direction:row; }
  body.print-dup-landscape .pdiv { display:block!important; width:1px!important; background:#999!important; margin:0 3mm!important; flex-shrink:0; }
  body.print-dup-landscape .dup-copy { display:flex!important; }
  body.print-dup-landscape .phalf { border:1px solid #ccc!important; overflow:visible!important; flex:1; display:flex; flex-direction:column; padding:4mm; }
  body.print-dup-landscape .phalf-body { overflow:visible!important; }
  body.print-dup-landscape .phalf-body > div { font-size:9pt!important; line-height:1.4!important; }
  body.print-dup-landscape .phalf-body table { font-size:8.5pt!important; width:100%!important; }
  body.print-dup-landscape .phalf-body th { font-size:8pt!important; padding:3pt 4pt!important; }
  body.print-dup-landscape .phalf-body td { font-size:8pt!important; padding:3pt 4pt!important; }
  body.print-dup-landscape .phalf-body span { font-size:8pt!important; font-family:'Times New Roman',serif!important; }

  @page { size:A4; margin:0; }
}
`;

function useGlobalStyles() {
  useEffect(() => {
    const id = "epg-global";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────────────── */

function HomePage({ onStart, onHelp }) {
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [code, setCode] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);

  const handleChange = (val) => {
    setSubject(val);
    if (val.length > 0) {
      const f = PRESET_SUBJECTS.filter(s => s.toLowerCase().includes(val.toLowerCase()));
      setFiltered(f);
      setShowSugg(f.length > 0);
    } else { setFiltered([]); setShowSugg(false); }
  };

  const pick = (s) => { setSubject(s); setShowSugg(false); };
  const submit = () => { if (subject.trim()) onStart(makeDefaultData(subject, department, code)); };

  return (
    <div className="home-wrap">
      <div className="home-grid" />
      <div className="home-glow" />
      <div className={`home-card ${ready ? "in" : ""}`}>
        <div className="h-eyebrow">Exam Paper Generator</div>
        <div className="h-title">Build your<br /><em>question paper.</em></div>
        <div className="h-sub">Type the subject — the paper auto-fills instantly.</div>

        <div className="fg">
          <label className="fg-label">Subject Name <sup>*</sup></label>
          <input
            className="fg-input"
            placeholder="e.g. Data Base Management Systems"
            value={subject}
            onChange={e => handleChange(e.target.value)}
            onBlur={() => setTimeout(() => setShowSugg(false), 150)}
            onFocus={() => subject && filtered.length && setShowSugg(true)}
            onKeyDown={e => e.key === "Enter" && submit()}
            autoFocus
          />
          {showSugg && (
            <div className="sugg">
              {filtered.map(s => <div key={s} className="si" onMouseDown={() => pick(s)}>{s}</div>)}
            </div>
          )}
        </div>

        <div className="fg-row">
          <div className="fg">
            <label className="fg-label">Department</label>
            <input className="fg-input" placeholder="e.g. Computer Hardware" value={department}
              onChange={e => setDepartment(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <div className="fg">
            <label className="fg-label">Paper Code</label>
            <input className="fg-input" placeholder="e.g. TED (21)6151 B" value={code}
              onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
        </div>

        <button className="h-start" onClick={submit} disabled={!subject.trim()}>Build Paper →</button>
        <div className="h-foot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>A4 landscape · two-sided · print / PDF ready</span>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <a href="mailto:adarsh.7025.v@gmail.com" style={{ color: "rgba(245,242,236,0.35)", textDecoration: "underline", fontSize: "10px", transition: "color 0.12s" }} onMouseEnter={e => e.currentTarget.style.color = "#e8d85a"} onMouseLeave={e => e.currentTarget.style.color = "rgba(245,242,236,0.35)"}>Report Bug</a>
            <button onClick={onHelp} style={{ background: "transparent", border: "none", color: "rgba(245,242,236,0.35)", fontFamily: "Inconsolata,monospace", fontSize: "10px", cursor: "pointer", letterSpacing: "1px", padding: 0, textDecoration: "underline" }}>? Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EDITABLE CELL ──────────────────────────────────────────────────────────── */

function ECell({ value, onChange, multiline }) {
  const base = {
    width: "100%", background: "transparent", border: "none", outline: "none",
    fontFamily: "'Times New Roman', serif", fontSize: "9px", padding: 0, color: "#000",
  };
  if (multiline)
    return <textarea value={value} onChange={e => onChange(e.target.value)}
      style={{ ...base, resize: "vertical", minHeight: "32px", lineHeight: "1.4" }} />;
  return <input value={value} onChange={e => onChange(e.target.value)}
    style={{ ...base, textAlign: "inherit" }} />;
}

/* ─── PAPER BODY (full A+B+C) ────────────────────────────────────────────────── */

function PaperBody({ data, onUpdate, readOnly, editMode, onAddRow, onRemoveRow, onAddSep, onUpdateSep }) {
  const upd = (p, v) => { if (!readOnly && onUpdate) onUpdate(p, v); };
  // Called as f() not <F/> to prevent React unmounting input on every keystroke
  const f = (path, value, multiline = false) =>
    readOnly
      ? <span style={{ whiteSpace: "pre-wrap" }}>{value}</span>
      : <ECell value={value} onChange={v => upd(path, v)} multiline={multiline} />;

  const th = { border: "1px solid #000", padding: "2px 4px", fontWeight: "bold", fontSize: "8.5px", background: "#ebebeb", whiteSpace: "nowrap" };
  const td = { border: "1px solid #000", padding: "2px 4px", fontSize: "8.5px", verticalAlign: "top" };
  const tdn = { ...td, width: 26, textAlign: "center" };
  const tbl = { borderCollapse: "collapse", width: "100%" };

  const partLabel = { partA: "Part A", partB: "Part B", partC: "Part C" };
  const partNoteKey = { partA: "partANote", partB: "partBNote", partC: "partCNote" };

  const renderPart = (part) => {
    const noteKey = partNoteKey[part];
    if (readOnly) return (
      <div key={part}>
        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "9.5px", marginTop: 2 }}>{partLabel[part]}</div>
        <div style={{ fontSize: "8px", textAlign: "center", marginBottom: 1, fontStyle: "italic" }}>
          {f(noteKey, data[noteKey])}
        </div>
        {/* single table — separators are inline <tr> rows so borders stay connected */}
        <table style={{ ...tbl, marginTop: 2, marginBottom: 2 }}>
          <thead><tr>
            <th style={{ ...th, width: 18 }}>Qn</th>
            <th style={th}>Question</th>
            <th style={{ ...th, width: 26 }}>CO</th>
            <th style={{ ...th, width: 22 }}>BTL</th>
          </tr></thead>
          <tbody>
            {data[part].map((row, i) => {
              if (row._sep) return (
                <tr key={"sep-" + i}>
                  <td colSpan={4} style={{ border: "1px solid #000", padding: "2px 6px" }}>
                    <div className="sep-row" style={{ margin: 0 }}>
                      <div className="sep-line" />
                      <span className="sep-label">{row.label || "OR"}</span>
                      <div className="sep-line" />
                    </div>
                  </td>
                </tr>
              );
              return (
                <tr key={i}>
                  <td style={{ ...td, textAlign: "center", width: 18 }}>{row.qn}</td>
                  <td style={td}><span style={{ whiteSpace: "pre-wrap" }}>{row.question}</span></td>
                  <td style={tdn}>{row.co}</td>
                  <td style={tdn}>{row.btl}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    return (
      <div key={part}>
        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "9.5px", marginTop: 2 }}>{partLabel[part]}</div>
        <div style={{ fontSize: "8px", textAlign: "center", marginBottom: 1, fontStyle: "italic" }}>
          {f(noteKey, data[noteKey])}
        </div>
        {/* header */}
        <table style={{ ...tbl, marginBottom: 0 }}>
          <thead><tr>
            <th style={{ ...th, width: 18 }}>Qn</th>
            <th style={th}>Question</th>
            <th style={{ ...th, width: 26 }}>CO</th>
            <th style={{ ...th, width: 22 }}>BTL</th>
          </tr></thead>
        </table>
        {/* rows + separators */}
        {data[part].map((row, i) => {
          if (row._sep) {
            return (
              <div key={"sep-" + i} className="sep-row">
                <div className="sep-line" />
                {editMode
                  ? <input className="sep-input" value={row.label || "OR"}
                    onChange={e => onUpdateSep(part, i, e.target.value)} />
                  : <span className="sep-label">{row.label || "OR"}</span>
                }
                <div className="sep-line" />
                {editMode && (
                  <button className="sep-del" onClick={() => onRemoveRow(part, i)} title="Remove separator">✕</button>
                )}
              </div>
            );
          }
          return (
            <div key={row.qn + "-" + i}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 0 }}>
                <table style={{ ...tbl, margin: 0 }}>
                  <tbody>
                    <tr>
                      <td style={{ ...td, textAlign: "center", width: 18 }}>
                        {f(`${part}.${i}.qn`, row.qn)}
                      </td>
                      <td style={td}>
                        {f(`${part}.${i}.question`, row.question, true)}
                      </td>
                      <td style={tdn}>{f(`${part}.${i}.co`, row.co)}</td>
                      <td style={tdn}>{f(`${part}.${i}.btl`, row.btl)}</td>
                    </tr>
                  </tbody>
                </table>
                {editMode && (
                  <button
                    onClick={() => onRemoveRow(part, i)}
                    title="Remove row"
                    style={{
                      flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
                      background: "rgba(200,30,30,0.1)", border: "1px solid rgba(200,30,30,0.3)",
                      color: "#c02020", fontSize: "13px", lineHeight: 1, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(200,30,30,0.22)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(200,30,30,0.1)"}
                  >×</button>
                )}
              </div>
              {editMode && (
                <button className="add-sep-btn" onClick={() => onAddSep(part, i)} style={{
                  display: "block", width: "calc(100% - 22px)", marginTop: 1, marginBottom: 0,
                  background: "transparent", border: "1px dashed rgba(100,100,200,0.3)",
                  color: "rgba(80,80,180,0.7)", borderRadius: 2, cursor: "pointer", fontSize: "7.5px",
                  padding: "1px 0", fontFamily: "'Times New Roman', serif", textAlign: "center",
                }}>+ separator</button>
              )}
            </div>
          );
        })}
        {editMode && (
          <button onClick={() => onAddRow(part)} style={{
            display: "block", width: "calc(100% - 22px)", marginTop: 2, marginBottom: 4,
            background: "rgba(20,130,60,0.08)", border: "1px dashed rgba(20,130,60,0.4)",
            color: "#1a7a40", borderRadius: 2, cursor: "pointer", fontSize: "8.5px",
            padding: "3px 0", fontFamily: "'Times New Roman', serif", textAlign: "center",
          }}>+ Add Row</button>
        )}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "9px", lineHeight: "1.3", color: "#000" }}>
      {/* header info */}
      <div style={{ fontWeight: "bold", fontSize: "9px" }}>{f("code", data.code)}</div>
      <div style={{ display: "flex", gap: 8, fontSize: "8.5px", marginTop: 1 }}>
        <span>Roll No :....................</span>
        <span style={{ flex: 1 }}>Signature:..................................</span>
      </div>
      <div style={{ fontSize: "8.5px" }}>Class :.....................</div>
      <div style={{ textAlign: "center", margin: "4px 0 3px" }}>
        <div style={{ fontWeight: "bold", fontSize: "9.5px" }}>{f("semester", data.semester)}</div>
        <div style={{ fontWeight: "bold", fontSize: "9.5px" }}>{f("examType", data.examType)}</div>
        <div style={{ fontWeight: "bold", fontSize: "9.5px" }}>{f("month", data.month)}</div>
        <div style={{ fontSize: "8.5px", marginTop: 1 }}>{f("department", data.department)}</div>
        <div style={{ fontWeight: "bold", fontSize: "10px", textTransform: "uppercase", marginTop: 1 }}>
          {f("subject", data.subject)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8.5px", marginTop: 2 }}>
          <span>(Time: {f("time", data.time)})</span>
          <span>(Maximum Marks: {f("maxMarks", data.maxMarks)})</span>
        </div>
      </div>
      {renderPart("partA")}
      {renderPart("partB")}
      {renderPart("partC")}
    </div>
  );
}

/* ─── PRINT DIALOG ───────────────────────────────────────────────────────────── */

function PrintDialog({ onConfirm, onCancel }) {
  const [dup, setDup] = useState(false);
  const [orient, setOrient] = useState("portrait");

  return (
    <div className="pdlg-overlay" onClick={onCancel}>
      <div className="pdlg" onClick={e => e.stopPropagation()}>
        <div className="pdlg-title">Print / Save PDF</div>
        <div className="pdlg-sub">Choose options before printing</div>

        {/* Duplicate toggle */}
        <div className="pdlg-row">
          <div>
            <div className="pdlg-row-label">⧉ Duplicate copies</div>
            <div className="pdlg-row-desc">Print two copies side by side on one sheet</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={dup} onChange={e => setDup(e.target.checked)} />
            <span className="toggle-slider" />
          </label>
        </div>

        {/* Orientation */}
        <div className="pdlg-row">
          <div>
            <div className="pdlg-row-label">↕ Orientation</div>
            <div className="pdlg-row-desc">Portrait = tall · Landscape = wide</div>
          </div>
          <div className="orient-btns">
            <button className={`orient-btn ${orient === "portrait" ? "active" : ""}`} onClick={() => setOrient("portrait")}>
              <span style={{ fontSize: 14 }}>▯</span> Portrait
            </button>
            <button className={`orient-btn ${orient === "landscape" ? "active" : ""}`} onClick={() => setOrient("landscape")}>
              <span style={{ fontSize: 14 }}>▭</span> Landscape
            </button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, padding: "10px 14px", fontSize: 10, color: "rgba(240,237,232,0.5)", fontFamily: "Inconsolata,monospace", letterSpacing: "0.5px" }}>
          Will print: <span style={{ color: "#e8d85a" }}>
            {dup ? "2 copies" : "1 copy"} · A4 {orient} · {dup ? (orient === "landscape" ? "side by side" : "two columns") : "full page"}
          </span>
        </div>

        <div className="pdlg-actions">
          <button className="pdlg-cancel" onClick={onCancel}>Cancel</button>
          <button className="pdlg-confirm" onClick={() => onConfirm(dup, orient)}>Print / Save PDF →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── EDITOR PAGE ────────────────────────────────────────────────────────────── */

function EditorPage({ initialData, onBack, onHelp }) {
  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(true);
  const [dupMode, setDupMode] = useState(false);
  const [showPrintDlg, setShowPrintDlg] = useState(false);
  const [printDup, setPrintDup] = useState(false);
  const [printOrient, setPrintOrient] = useState("portrait"); // "portrait" | "landscape"

  const updateField = (path, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const addRow = (part) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    const last = next[part];
    const nextQn = last.length > 0 ? parseInt(last[last.length - 1].qn) + 1 : 1;
    next[part].push({ qn: String(nextQn), question: "New question here.", co: "CO1", btl: "U" });
    return next;
  });

  const removeRow = (part, i) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next[part].splice(i, 1);
    return next;
  });

  const addSeparator = (part, afterIndex) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next[part].splice(afterIndex + 1, 0, { _sep: true, label: "OR" });
    return next;
  });

  const updateSepLabel = (part, i, label) => setData(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next[part][i].label = label;
    return next;
  });

  const executePrint = (dup, orient) => {
    setShowPrintDlg(false);
    setDupMode(dup);
    setEditMode(false);
    const cls = dup ? `print-dup-${orient}` : `print-single-${orient}`;
    // set @page size via a temporary style tag
    const styleId = "epg-page-size";
    let st = document.getElementById(styleId);
    if (!st) { st = document.createElement("style"); st.id = styleId; document.head.appendChild(st); }
    st.textContent = `@page { size: A4 ${orient}; margin: 0; }`;
    document.body.classList.add(cls);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setEditMode(true);
        document.body.classList.remove(cls);
      }, 600);
    }, 150);
  };

  const handlePrint = () => setShowPrintDlg(true);

  const shared = { data, onUpdate: updateField, editMode, onAddRow: addRow, onRemoveRow: removeRow, onAddSep: addSeparator, onUpdateSep: updateSepLabel };

  return (
    <>
      {/* PRINT DIALOG */}
      {showPrintDlg && (
        <PrintDialog
          onConfirm={(dup, orient) => executePrint(dup, orient)}
          onCancel={() => setShowPrintDlg(false)}
        />
      )}

      {/* TOOLBAR */}
      <div className="g-tb">
        <button className="g-btn g-btn-ghost" onClick={onBack}>← Back</button>
        <div className="g-tb-brand">Exam Paper</div>
        <button className="g-btn g-btn-ghost" onClick={onHelp} title="Open help page">? Help</button>
        <div className="g-tb-subj">{data.subject}</div>
        <a href="mailto:adarsh.7025.v@gmail.com" className="g-btn g-btn-ghost" style={{ textDecoration: 'none', border: 'none' }} title="Contact Dev / Report Bug">
          Contact Dev
        </a>
        <button
          className={`g-btn g-btn-ghost ${editMode ? "on" : ""}`}
          onClick={() => setEditMode(e => !e)}
        >
          {editMode ? "● Editing" : "○ Preview"}
        </button>
        <button className="g-btn g-btn-yellow" onClick={handlePrint}>↓ Print / PDF</button>
      </div>

      {/* CANVAS */}
      <div className="ecanvas">
        <div className="psheet">

          {/* LEFT — EDITABLE */}
          <div className={`phalf edit-panel ${editMode ? "ed" : ""}`}>
            <div className="phalf-label lbl-edit">
              <span className="lbl-dot" />
              ✏ Editable — click any field to edit
            </div>
            <div className="phalf-body">
              <PaperBody readOnly={false} {...shared} />
            </div>
          </div>

          <div className="pdiv" />

          {/* RIGHT — PREVIEW */}
          <div className="phalf">
            <div className="phalf-label lbl-preview">
              <span className="lbl-dot" />
              👁 Preview — live print copy
            </div>
            <div className="phalf-body">
              <PaperBody readOnly={true} editMode={false} data={data} />
            </div>
          </div>

          {/* DUPLICATE COPY — hidden on screen, shown during dup print via CSS */}
          <div className="pdiv dup-copy" style={{ display: "none" }} />
          <div className="phalf dup-copy" style={{ display: "none", flexDirection: "column" }}>
            <div className="phalf-label lbl-preview" style={{ background: "#d4ecd4", color: "#2a5a2a" }}>
              <span className="lbl-dot" style={{ background: "#2a5a2a" }} />
              ⧉ Duplicate copy
            </div>
            <div className="phalf-body">
              <PaperBody readOnly={true} editMode={false} data={data} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────────────── */

export default function ExamPaperGenerator() {
  useGlobalStyles();
  const [page, setPage] = useState("home");
  const [editorData, setEditorData] = useState(null);

  const handleStart = (d) => { setEditorData(d); setPage("editor"); };

  if (page === "help") return <HelpPage onBack={() => setPage("home")} />;
  if (page === "editor" && editorData)
    return <EditorPage initialData={editorData} onBack={() => setPage("home")} onHelp={() => setPage("help")} />;

  return <HomePage onStart={handleStart} onHelp={() => setPage("help")} />;
}
