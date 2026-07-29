import { pianoConfig } from "./pianoConfig";

export default function MusicSheet() {
  const s = pianoConfig.sheet;

  return (
    <div style={{
      background: s.background,
      borderRadius: s.borderRadius,
      padding: s.padding,
      boxShadow: s.boxShadow,
      position: "relative",
      overflow: "hidden",
      width: `${s.width}px`,
      minHeight: `${s.minHeight}px`,
    }}>

      {/* STAFF LINES */}
      {Array.from({ length: s.staffLineCount }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${s.staffLineInset}px`,
          right: `${s.staffLineInset}px`,
          top: `${s.staffLineTopStart + i * s.staffLineTopStep}px`,
          height: "1px",
          background: s.staffLineColor,
        }} />
      ))}

      {/* TREBLE CLEF */}
      <div style={{
        position: "absolute",
        left: `${s.clefLeft}px`,
        top: `${s.clefTop}px`,
        fontSize: s.clefFontSize,
        color: s.clefColor,
        lineHeight: 1,
        fontFamily: "serif",
        userSelect: "none",
      }}>𝄞</div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, paddingLeft: `${s.contentPaddingLeft}px` }}>
        {/* YOUR NAME */}
        <h1 style={{
          fontSize: s.titleFontSize,
          fontWeight: s.titleFontWeight,
          color: s.titleColor,
          marginBottom: s.titleMarginBottom,
          lineHeight: 1.2,
        }}>
          Armaan Khaitan
        </h1>
        {/* YOUR DESCRIPTION */}
        <p style={{ fontSize: s.descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Student at university of birmingham
        </p>
        <p style={{ fontSize: s.descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Final Year student
        </p>
        <p style={{ fontSize: s.descriptionSize+"px", color: "#444", lineHeight: 1.8, maxWidth: "520px" }}>
          Doing a computer science course specialising in AI, NLP and computer vision
        </p>
      </div>
    </div>
  );
}


