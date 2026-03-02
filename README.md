# 📄 Exam Question Paper Generator

A browser-based tool to create, edit, and print diploma exam question papers in the standard format used by polytechnic and engineering institutions.

---

## 📌 Description

This tool lets you generate a fully formatted exam question paper — exactly matching the official layout with **Part A**, **Part B**, and **Part C** sections, CO/BTL columns, and the double-copy side-by-side format used for printing on a single A4 sheet.

No installations. No backend. Just open and use.

---

## 🚀 Use Cases

- **Teachers & Lecturers** — Quickly draft and finalize question papers without touching Word or LaTeX
- **Exam Coordinators** — Generate print-ready PDFs in the exact institutional format
- **Students** — Create mock papers for practice or study groups
- **Departments** — Standardize question paper formatting across subjects

---

## ✨ Features

- Edit every field inline — subject, department, exam code, date, questions, CO, BTL
- Add or remove rows in any section (Part A / B / C)
- Live mirror — right side updates as you type on the left
- One-click PDF download via browser print
- Pre-filled with sample DBMS paper to get started instantly

---

## 🛠 How to Run

**Option 1 — Claude Artifact (no setup)**
Paste the `.jsx` file into a Claude chat and ask it to run as an artifact.

**Option 2 — Local (Vite + React)**
```bash
npm create vite@latest exam-paper -- --template react
cd exam-paper
npm install
# Replace src/App.jsx with the provided .jsx file
npm run dev
```

**Option 3 — CodeSandbox**
Go to [codesandbox.io](https://codesandbox.io), create a React sandbox, paste the code.

---

## 📁 Files

| File | Description |
|------|-------------|
| `exam-paper-generator.jsx` | Main React component |
| `README.md` | This file |

---

<!--check out for more https://github.com/Zilix-77 -->
