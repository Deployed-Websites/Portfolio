export default function MusicSheet() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fdfaf4 0%, #f5f0e4 100%)",
      borderRadius: "4px 4px 0 0",
      padding: "36px 48px 28px",
      boxShadow: "0 -2px 20px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* STAFF LINES */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: "absolute",
          left: "48px",
          right: "48px",
          top: `${60 + i * 10}px`,
          height: "1px",
          background: "rgba(0,0,0,0.08)",
        }} />
      ))}

      {/* TREBLE CLEF */}
      <div style={{
        position: "absolute",
        left: "48px",
        top: "32px",
        fontSize: "72px",
        color: "rgba(0,0,0,0.07)",
        lineHeight: 1,
        fontFamily: "serif",
        userSelect: "none",
      }}>𝄞</div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, paddingLeft: "40px" }}>
        {/* YOUR NAME */}
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px", lineHeight: 1.2 }}>
          Armaan Khaitan
        </h1>
        {/* YOUR DESCRIPTION */}
        <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          I&apos;m a third year undergraduate university student studying B.Sc Artificial Intelligence and Computer Science at the University of Birmingham. I have a lot of interest in machine learning, deep learning and robotics and would like to apply what I&apos;ve learnt in university especially the AI specific modules as well as all the things I&apos;ve learnt myself in my free time to real projects.
        </p>
      </div>
    </div>
  );
}