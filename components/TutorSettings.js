import React from 'react';

export default function TutorSettings({ subject, setSubject, grade, setGrade, language, setLanguage }) {
  return (
    <div className="session-pills">
      <label className="select-pill">
        <span className="tutor-icon">▧</span>
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          aria-label="Choose subject"
        >
          <option>Biology</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>English</option>
          <option value="ComputerScience">Computer Science</option>
        </select>
        <span className="select-caret">⌄</span>
      </label>
      <label className="select-pill grade-pill">
        <span className="tutor-icon">♙</span>
        <select
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          aria-label="Choose grade"
        >
          <option>Playgroup</option>
          <option>Nursery</option>
          <option>KG</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
          <option>Class 4</option>
          <option>Class 5</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
        </select>
        <span className="select-caret">⌄</span>
      </label>
      <label className="select-pill">
        <span className="tutor-icon">文</span>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label="Choose explanation language"
        >
          <option>English</option>
          <option>Roman Urdu</option>
        </select>
        <span className="select-caret">⌄</span>
      </label>
    </div>
  );
}
