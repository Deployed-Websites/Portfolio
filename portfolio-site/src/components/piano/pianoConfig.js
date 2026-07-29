// All tunable numbers for the 3D piano scene live here.
// Change values here instead of hunting through component files.

export const pianoConfig = {
  keys: {
    whiteKeyWidth: 0.42,
    whiteKeyDepth: 1.15,
    whiteKeyHeight: 0.08,
    whiteKeyGap: 0.02,
    whiteKeyPosY: 0.11,
    whiteKeyPosZ: 0.6,
    whiteKeyColorActive: "#fdfaf4",
    whiteKeyColorInactive: "#e5ded0",

    blackKeyWidthRatio: 0.55,
    blackKeyDepth: 0.65,
    blackKeyHeight: 0.1,
    blackKeyPosY: 0.16,
    blackKeyPosZ: 0.25,
    blackKeyColor: "#1a1a1a",

    labelPosY: 0.16,
    labelPosZ: 1.05,
    labelDistanceFactor: 8,
    labelFontSize: "9px",
    labelColor: "#555",
    labelLetterSpacing: "0.03em",
  },

  body: {
    position: [0.5, 0.35, -1.2],
    rotation: [0, 0.15, 0],
    heightExtra: 1.5,
    thickness: 0.7,
    depth: 2.6,
    color: "#5a3420",
  },

  lid: {
    position: [0.5, 0.85, -1.7],
    rotation: [-0.35, 0.15, 0],
    widthExtra: 1.3,
    thickness: 0.06,
    depth: 2.2,
    color: "#6b4028",
  },

  legs: {
    positionY: -0.35,
    radiusTop: 0.06,
    radiusBottom: 0.08,
    height: 0.7,
    color: "#3d2317",
    zFrontLegs: -0.3,
    zBackLeg: -2.2,
  },

  keybed: {
    position: [0.5, 0.05, 0.2],
    widthExtra: 0.3,
    thickness: 0.1,
    depth: 1.2,
    color: "#2a1810",
  },

  // 3D placement of the music stand + sheet within the scene
  stand: {
    position: [0.2, 0.95, -0.4],
    rotation: [-0.25, 0.15, 0],
    ledgePosition: [0, -0.05, 0.06],
    ledgeSize: [1.4, 0.05, 0.12],
    ledgeColor: "#2a1810",
    sheetPosition: [-0.0, 0.35, 0],
    sheetDistanceFactor: 1.4,
  },

  // Internal styling of the MusicSheet HTML content itself (matches current MusicSheet.js exactly)
  sheet: {
    descriptionSize : 20,
    width: 400,
    minHeight: 280,
    padding: "24px 24px 20px",
    borderRadius: "3px 3px 0 0",
    background: "linear-gradient(160deg, #fdfaf4 0%, #f5f0e4 100%)",
    boxShadow: "0 -4px 24px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.3)",

    staffLineCount: 5,
    staffLineTopStart: 60,
    staffLineTopStep: 10,
    staffLineInset: 48,
    staffLineColor: "rgba(0,0,0,0.08)",

    clefFontSize: "72px",
    clefColor: "rgba(0,0,0,0.07)",
    clefTop: 32,
    clefLeft: 48,

    contentPaddingLeft: 40,

    titleFontSize: "28px",
    titleColor: "#1a1a1a",
    titleFontWeight: "700",
    titleMarginBottom: "12px",

    descriptionFontSize: "14px",
    descriptionColor: "#444",
    descriptionLineHeight: 1.8,
    descriptionMaxWidth: "520px",
  },

  camera: {
    position: [0, 3, 5],
    fov: 45,
  },

  controls: {
    minDistance: 3,
    maxDistance: 12,
    minPolarAngle: 0.3,
    maxPolarAngle: Math.PI / 1.8,
    zoomSpeed: 0.8,
  },

  lights: {
    ambientIntensity: 0.8,
    directional1: { position: [5, 8, 5], intensity: 1.4 },
    directional2: { position: [-5, 4, -5], intensity: 0.5 },
    point: { position: [0, 3, 4], intensity: 0.6, color: "#fff5e0" },
  },
};