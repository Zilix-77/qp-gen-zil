// HelpPage.jsx
// Usage: import HelpPage from "./HelpPage" and render <HelpPage onBack={...} />

const SECTIONS = [
  {
    icon: "🏠",
    title: "Home Page",
    color: "#e8d85a",
    items: [
      {
        name: "Subject Name",
        desc: "Required field. Start typing and a dropdown appears with 12 common subjects — click one to auto-fill. The subject name is automatically inserted into the paper header and default questions. Press Enter to proceed.",
      },
      {
        name: "Department",
        desc: "Optional. The department name that appears under the paper title, e.g. 'Department of Computer Hardware Engineering'.",
      },
      {
        name: "Paper Code",
        desc: "Optional. The exam paper code shown at the top left of the paper, e.g. 'TED (21)6151 B'.",
      },
      {
        name: "Build Paper →",
        desc: "Creates the paper with your subject auto-filled into the header, notes, and starter questions. You can edit everything once inside.",
      },
    ],
  },
  {
    icon: "✏️",
    title: "Editor — Toolbar",
    color: "#7eb8f7",
    items: [
      {
        name: "← Back",
        desc: "Returns to the home page. Warning: your edits are not saved — going back resets everything.",
      },
      {
        name: "● Editing / ○ Preview toggle",
        desc: "Switches the left panel between edit mode (inputs visible, add/remove buttons shown) and preview mode (clean read-only view, no buttons). The right panel is always a live preview mirror regardless of this toggle.",
      },
      {
        name: "↓ Print / PDF",
        desc: "Opens the Print Dialog where you choose options before printing. Does not print immediately — see the Print Dialog section below.",
      },
    ],
  },
  {
    icon: "📄",
    title: "Editor — Panels",
    color: "#a8d8a8",
    items: [
      {
        name: "✏ Editable panel (left, yellow border)",
        desc: "The working copy. Click any field — code, semester, subject, time, marks, questions, CO, BTL — to edit it directly. Changes appear instantly in the preview panel on the right.",
      },
      {
        name: "👁 Preview panel (right, grey border)",
        desc: "A live read-only mirror of the editable panel. This is what will be printed. It always stays in sync with your edits.",
      },
      {
        name: "Paper header fields",
        desc: "All header fields are editable: paper code (top left), roll no / signature line, class, semester, exam type, month, department, subject, time, and maximum marks. Click any of them to edit in place.",
      },
    ],
  },
  {
    icon: "📋",
    title: "Parts A, B and C",
    color: "#f7b8a8",
    items: [
      {
        name: "Part notes",
        desc: "The instruction line under each Part heading (e.g. 'Answer all questions…') is editable. Click it to change the instructions for that part.",
      },
      {
        name: "Question fields (Qn, Question, CO, BTL)",
        desc: "Every cell in the question table is editable. Qn = question number, CO = course outcome, BTL = Bloom's taxonomy level. The Question cell supports multi-line text — press Enter to add a new line, it will show in the preview too.",
      },
      {
        name: "+ Add Row",
        desc: "Adds a new blank question row at the bottom of that part. The question number auto-increments from the last row.",
      },
      {
        name: "× (remove row)",
        desc: "The small red circle button to the RIGHT of each row (outside the table border). Click it to permanently delete that question row.",
      },
    ],
  },
  {
    icon: "➗",
    title: "Separators (OR dividers)",
    color: "#c8b8f7",
    items: [
      {
        name: "What is a separator?",
        desc: "A separator is a horizontal divider line with a label (default: OR) that appears between two questions in the same part. Used to show students they must answer one OR the other.",
      },
      {
        name: "+ separator button",
        desc: "A small blue dashed button that appears below each question row in edit mode. Click it to insert a separator immediately after that question.",
      },
      {
        name: "Editing the separator label",
        desc: "Click the label text inside the separator (defaults to 'OR') and type anything — 'OR', 'Answer any one', 'Either', or any custom text. It updates live in both edit and preview.",
      },
      {
        name: "Removing a separator",
        desc: "Click the small ✕ button on the right side of the separator row to delete it. The questions above and below remain untouched.",
      },
      {
        name: "Example use",
        desc: "Add Q5, click '+ separator' under Q5, add Q6. The paper shows: Q5 — [OR] — Q6, meaning students answer Q5 or Q6. Add another separator after Q7 for Q7/Q8 grouping.",
      },
    ],
  },
  {
    icon: "🖨️",
    title: "Print Dialog",
    color: "#f7e0a8",
    items: [
      {
        name: "Opening the dialog",
        desc: "Click '↓ Print / PDF' in the toolbar. A modal appears — nothing prints until you confirm.",
      },
      {
        name: "⧉ Duplicate copies toggle",
        desc: "OFF (default) = one copy printed, full page. ON = two identical copies printed side by side on the same sheet. Cut down the middle to get 2 papers from 1 sheet — saves paper for classroom distribution.",
      },
      {
        name: "↕ Orientation — Portrait ▯",
        desc: "Tall A4 page (210×297mm). Best for single copies with lots of questions. Text is large and easy to read.",
      },
      {
        name: "↕ Orientation — Landscape ▭",
        desc: "Wide A4 page (297×210mm). More horizontal space. Good for single copies where questions are short.",
      },
      {
        name: "Duplicate + Portrait",
        desc: "Two narrow columns on a tall A4 page. Text is small but readable. Best when questions are short.",
      },
      {
        name: "Duplicate + Landscape",
        desc: "Two columns on a wide A4 page. More space per column than duplicate portrait. Recommended for duplicate printing.",
      },
      {
        name: "Summary line",
        desc: "The yellow text in the dialog shows exactly what will print before you confirm, e.g. '2 copies · A4 landscape · side by side'.",
      },
      {
        name: "Saving as PDF",
        desc: "In your browser's print window, change Destination from your printer to 'Save as PDF'. Set margins to None or Minimum for best results.",
      },
      {
        name: "What gets printed",
        desc: "Only the Preview panel (right side) prints. The Editable panel, toolbar, labels, add/remove buttons, and separator edit controls are all hidden from the PDF.",
      },
    ],
  },
  {
    icon: "💡",
    title: "Tips & Tricks",
    color: "#a8e8d8",
    items: [
      {
        name: "Auto-fill on subject select",
        desc: "Selecting a subject from the dropdown fills in default starter questions referencing that subject. You still need to replace them with real questions.",
      },
      {
        name: "Multi-line questions",
        desc: "Press Enter inside a question box to add sub-parts like a), b), c). Line breaks are preserved in the preview and in print.",
      },
      {
        name: "Editing part instructions",
        desc: "The italic note under each Part heading is fully editable. Change marks per question, add special instructions, etc.",
      },
      {
        name: "Preview is always live",
        desc: "You don't need to toggle anything to see how the paper looks — the right panel updates in real time as you type.",
      },
      {
        name: "Branch testing on Vercel",
        desc: "Push to a new git branch (git checkout -b test && git push origin test) and Vercel automatically creates a preview URL. Test there before merging to main.",
      },
    ],
  },
];

export default function HelpPage({ onBack }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Inconsolata:wght@300;400;500;600&display=swap');

        .help-shell {
          min-height: 100vh;
          background: #0e0e0e;
          font-family: 'Inconsolata', monospace;
          color: #f0ede8;
        }

        .help-tb {
          background: #141414;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 28px;
          height: 52px;
          display: flex;
          align-items: center;
          gap: 14px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .help-tb-back {
          font-family: 'Inconsolata', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          background: transparent;
          color: rgba(240,237,232,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 6px 13px;
          cursor: pointer;
          transition: color 0.12s, border-color 0.12s;
        }
        .help-tb-back:hover { color: #f0ede8; border-color: rgba(255,255,255,0.3); }

        .help-tb-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #f0ede8;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .help-tb-title::before {
          content: '';
          display: block;
          width: 7px;
          height: 7px;
          background: #e8d85a;
          border-radius: 50%;
        }

        .help-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 48px 28px 80px;
        }

        .help-hero {
          margin-bottom: 52px;
        }

        .help-hero-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #e8d85a;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .help-hero-eyebrow::before {
          content: '';
          display: block;
          width: 22px;
          height: 1px;
          background: #e8d85a;
        }

        .help-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 900;
          color: #f5f2ec;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .help-hero-title em { font-style: italic; color: #e8d85a; }

        .help-hero-sub {
          font-size: 12px;
          color: rgba(240,237,232,0.35);
          line-height: 1.6;
          max-width: 520px;
        }

        .help-toc {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 52px;
          padding: 20px 22px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
        }

        .help-toc-label {
          width: 100%;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
          margin-bottom: 6px;
        }

        .toc-chip {
          font-size: 10px;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(240,237,232,0.5);
          cursor: pointer;
          transition: all 0.12s;
          font-family: 'Inconsolata', monospace;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .toc-chip:hover {
          color: #f0ede8;
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.04);
        }

        .help-section {
          margin-bottom: 48px;
          scroll-margin-top: 70px;
        }

        .help-section-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .help-section-icon {
          font-size: 22px;
          line-height: 1;
        }

        .help-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f2ec;
        }

        .help-section-bar {
          flex: 1;
          height: 2px;
          border-radius: 2px;
          opacity: 0.6;
        }

        .help-items {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .help-item {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
        }

        .help-item-name {
          padding: 11px 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: default;
        }

        .help-item-name::before {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.8;
        }

        .help-item-desc {
          padding: 0 16px 13px 28px;
          font-size: 11px;
          color: rgba(240,237,232,0.5);
          line-height: 1.65;
        }

        .help-footer {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-size: 10px;
          color: rgba(240,237,232,0.2);
          text-align: center;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="help-shell">
        {/* TOOLBAR */}
        <div className="help-tb">
          <button className="help-tb-back" onClick={onBack}>← Back</button>
          <div className="help-tb-title">Help &amp; Documentation</div>
        </div>

        <div className="help-body">
          {/* HERO */}
          <div className="help-hero">
            <div className="help-hero-eyebrow">Exam Paper Generator</div>
            <div className="help-hero-title">How to use<br /><em>every feature.</em></div>
            <div className="help-hero-sub">
              A complete guide to building, editing, and printing exam question papers.
              Every button, field, and option explained.
            </div>
          </div>

          {/* TABLE OF CONTENTS */}
          <div className="help-toc">
            <div className="help-toc-label">Jump to section</div>
            {SECTIONS.map((s, i) => (
              <a key={i} className="toc-chip" href={`#section-${i}`}>
                {s.icon} {s.title}
              </a>
            ))}
          </div>

          {/* SECTIONS */}
          {SECTIONS.map((section, si) => (
            <div key={si} id={`section-${si}`} className="help-section">
              <div className="help-section-head">
                <span className="help-section-icon">{section.icon}</span>
                <span className="help-section-title">{section.title}</span>
                <div className="help-section-bar" style={{ background: section.color }} />
              </div>

              <div className="help-items">
                {section.items.map((item, ii) => (
                  <div key={ii} className="help-item"
                    style={{ background: `${section.color}08`, borderColor: `${section.color}18` }}>
                    <div className="help-item-name"
                      style={{ color: section.color }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: section.color, flexShrink: 0, display: "inline-block" }} />
                      {item.name}
                    </div>
                    <div className="help-item-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="help-footer">
            Exam Paper Generator · Built with React + Vite · Deployed on Vercel
          </div>
        </div>
      </div>
    </>
  );
}
