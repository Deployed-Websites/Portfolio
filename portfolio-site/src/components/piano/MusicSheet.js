export default function MusicSheet() {
  const descriptionSize = 20
  return (
      <div style={{
        background: "linear-gradient(160deg, #fdfaf4 0%, #f5f0e4 100%)",
        borderRadius: "3px 3px 0 0",
        padding: "24px 24px 20px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
        width: "400px",
        minHeight: "280px",
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
        <p style={{ fontSize: descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Student at university of birmingham
        </p>
        <p style={{ fontSize: descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Final Year student
        </p>
        <p style={{ fontSize: descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Doing a computer science course specialising in AI, NLP and computer vision
        </p>
      </div>
    </div>
  );
}