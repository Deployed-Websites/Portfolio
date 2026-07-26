export const keys = [
  { note: "C",  freq: 261.63, black: false, label: "Lab",      href: "/lab"      },
  { note: "C#", freq: 277.18, black: true,  label: null,       href: null        },
  { note: "D",  freq: 293.66, black: false, label: "Projects", href: "/projects" },
  { note: "D#", freq: 311.13, black: true,  label: null,       href: null        },
  { note: "E",  freq: 329.63, black: false, label: "Writing",  href: "/writing"  },
  { note: "F",  freq: 349.23, black: false, label: "About",    href: "/about"    },
  { note: "F#", freq: 369.99, black: true,  label: null,       href: null        },
  { note: "G",  freq: 392.00, black: false, label: null,       href: null        },
  { note: "G#", freq: 415.30, black: true,  label: null,       href: null        },
  { note: "A",  freq: 440.00, black: false, label: null,       href: null        },
  { note: "A#", freq: 466.16, black: true,  label: null,       href: null        },
  { note: "B",  freq: 493.88, black: false, label: null,       href: null        },
  { note: "C2", freq: 523.25, black: false, label: null,       href: null        },
];

export const whiteKeys = keys.filter(k => !k.black);
export const blackKeys = keys.filter(k => k.black);

export const blackKeyPositions = {
  "C#": 1, "D#": 2, "F#": 4, "G#": 5, "A#": 6
};