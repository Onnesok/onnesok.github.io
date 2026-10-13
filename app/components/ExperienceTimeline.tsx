import { experience } from "../data/profile";

const roles = [...experience].sort(
  (a, b) => parseInt(b.period, 10) - parseInt(a.period, 10),
);

export default function ExperienceTimeline() {
  return (
    <ol className="experience-role-list">
      {roles.map((item) => (
        <li key={item.company}>
          <span className="experience-date">{item.period}</span>
          <div>
            <h3>{item.role}</h3>
            <p className="experience-company">{item.company}</p>
            <p className="experience-summary">{item.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
