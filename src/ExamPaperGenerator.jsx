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
  department: department || "Department of Computer Hardware Engineering",
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

/* print */
@media print {
  body { background:white!important; }
  .g-tb { display:none!important; }
  .phalf-label { display:none!important; }
  .ecanvas { padding:0; background:white!important; min-height:unset; }
  .psheet { box-shadow:none; border-radius:0; width:100%; min-height:unset; }
  .phalf { border-color:#999!important; overflow:visible!important; }
  .phalf-body { overflow:visible!important; }
  button { display:none!important; }
  @page { size:A4 landscape; margin:6mm; }
  body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
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

function HomePage({ onStart }) {
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
        <div className="h-foot">A4 landscape · two-sided · print / PDF ready</div>
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

function PaperBody({ data, onUpdate, readOnly, editMode, onAddRow, onRemoveRow }) {
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
        <table style={{ ...tbl, marginTop: 2, marginBottom: 2 }}>
          <thead><tr>
            <th style={{ ...th, width: 18 }}>Qn</th>
            <th style={th}>Question</th>
            <th style={{ ...th, width: 26 }}>CO</th>
            <th style={{ ...th, width: 22 }}>BTL</th>
          </tr></thead>
          <tbody>
            {data[part].map((row, i) => (
              <tr key={i}>
                <td style={{ ...td, textAlign: "center", width: 18 }}>{row.qn}</td>
                <td style={td}>{row.question}</td>
                <td style={tdn}>{row.co}</td>
                <td style={tdn}>{row.btl}</td>
              </tr>
            ))}
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
        {/* rows — delete button sits OUTSIDE the table */}
        {data[part].map((row, i) => (
          <div key={row.qn + "-" + i} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 0 }}>
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
        ))}
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

/* ─── EDITOR PAGE ────────────────────────────────────────────────────────────── */

function EditorPage({ initialData, onBack }) {
  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(true);

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

  const handlePrint = () => {
    setEditMode(false);
    setTimeout(() => { window.print(); setTimeout(() => setEditMode(true), 600); }, 120);
  };

  const shared = { data, onUpdate: updateField, editMode, onAddRow: addRow, onRemoveRow: removeRow };

  return (
    <>
      {/* TOOLBAR */}
      <div className="g-tb">
        <button className="g-btn g-btn-ghost" onClick={onBack}>← Back</button>
        <div className="g-tb-brand">Exam Paper</div>
        <div className="g-tb-subj">{data.subject}</div>
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
          <div className={`phalf ${editMode ? "ed" : ""}`}>
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

  if (page === "editor" && editorData)
    return <EditorPage initialData={editorData} onBack={() => setPage("home")} />;

  return <HomePage onStart={handleStart} />;
}
