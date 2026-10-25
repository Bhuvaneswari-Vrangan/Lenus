import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  let user = { name: "there", email: "" };
  try {
    user = JSON.parse(localStorage.getItem("lenus_user")) || user;
  } catch {
    /* ignore corrupted storage */
  }

  const logout = () => {
    localStorage.removeItem("lenus_token");
    localStorage.removeItem("lenus_user");
    navigate("/login", { replace: true });
  };

  const stats = [
    { label: "Active projects", value: 8 },
    { label: "Tasks done this week", value: 42 },
    { label: "Team members", value: 12 },
  ];

  return (
    <div className="dash">
      <header className="dash__bar">
        <div className="logo logo--dark">
          <span className="logo__mark">
            <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
              <circle cx="16" cy="16" r="6" fill="#fff" />
              <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="logo__name">LENUS</span>
        </div>
        <button className="btn btn--ghost" onClick={logout}>Log out</button>
      </header>

      <main className="dash__body">
        <h1>Hello, {user.name} 👋</h1>
        <p className="card__sub">You're signed in{user.email ? ` as ${user.email}` : ""}. This is a dummy dashboard.</p>

        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
