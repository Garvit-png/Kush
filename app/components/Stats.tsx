const stats = [
  { value: "7 Years+", label: "EXPERIENCE" },
  { value: "161K+", label: "MEMBERS" },
  { value: "10+", label: "MASTER COURSES &\nEBOOKS" },
  { value: "4.8 ★★★★★", label: "TRAINEES RATING" },
];

export default function Stats() {
  return (
    <section className="stats">
      {stats.map((stat, index) => (
        <div className="stats__card" key={index}>
          <h2 className="stats__value">{stat.value}</h2>
          <p className="stats__label" style={{ whiteSpace: "pre-line" }}>
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}
