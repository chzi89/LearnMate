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
          <option>Grade 6</option>
          <option>Grade 7</option>
          <option>Grade 8</option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
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
