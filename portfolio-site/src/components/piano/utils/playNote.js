export function playNote(frequency) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 1.5);
}