const fs = require("fs");
const path = require("path");

const sampleRate = 44100;
const bpm = 72; // slow, romantic wedding tempo
const beatDuration = 60 / bpm; // ~0.833s per beat

// Notes frequencies (Hz)
const N = {
  D3: 146.83,
  F3: 174.61,
  Fs3: 185.00,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
  Cs4: 277.18,
  D4: 293.66,
  E4: 329.63,
  Fs4: 369.99,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  Cs5: 554.37,
  D5: 587.33,
  E5: 659.25,
  Fs5: 739.99,
  A5: 880.00,
};

// 16 bars romantic chord progression & acoustic melody (loopable ~26 seconds)
const score = [
  // Bar 1 - D Major
  { bass: N.D3, chord: [N.Fs4, N.A4, N.D5], melody: N.Fs5, time: 0, dur: 2.0 },
  { melody: N.E5, time: 2.0 * beatDuration, dur: 1.5 },
  { melody: N.D5, time: 3.0 * beatDuration, dur: 1.5 },

  // Bar 2 - G Major
  { bass: N.G3, chord: [N.G4, N.B4, N.D5], melody: N.B4, time: 4.0 * beatDuration, dur: 2.0 },
  { melody: N.D5, time: 6.0 * beatDuration, dur: 1.5 },
  { melody: N.G5, time: 7.0 * beatDuration, dur: 1.5 },

  // Bar 3 - B Minor
  { bass: N.B3, chord: [N.Fs4, N.B4, N.D5], melody: N.Fs5, time: 8.0 * beatDuration, dur: 2.5 },
  { melody: N.E5, time: 10.0 * beatDuration, dur: 1.5 },
  { melody: N.D5, time: 11.0 * beatDuration, dur: 1.5 },

  // Bar 4 - A Major
  { bass: N.A3, chord: [N.E4, N.A4, N.Cs5], melody: N.Cs5, time: 12.0 * beatDuration, dur: 2.5 },
  { melody: N.E5, time: 14.0 * beatDuration, dur: 1.5 },
  { melody: N.A4, time: 15.0 * beatDuration, dur: 2.0 },

  // Bar 5 - D Major (Flourish)
  { bass: N.D3, chord: [N.Fs4, N.A4, N.D5], melody: N.D5, time: 16.0 * beatDuration, dur: 2.0 },
  { melody: N.Fs5, time: 18.0 * beatDuration, dur: 1.5 },
  { melody: N.A5, time: 19.0 * beatDuration, dur: 1.8 },

  // Bar 6 - G Major
  { bass: N.G3, chord: [N.G4, N.B4, N.D5], melody: N.G5, time: 20.0 * beatDuration, dur: 2.0 },
  { melody: N.Fs5, time: 22.0 * beatDuration, dur: 1.5 },
  { melody: N.E5, time: 23.0 * beatDuration, dur: 1.5 },

  // Bar 7 - A Major (Cadence resolution into loop)
  { bass: N.A3, chord: [N.E4, N.A4, N.Cs5], melody: N.E5, time: 24.0 * beatDuration, dur: 2.5 },
  { melody: N.Cs5, time: 26.0 * beatDuration, dur: 2.0 },
  { melody: N.D5, time: 28.0 * beatDuration, dur: 3.5 },
];

const totalDuration = 32 * beatDuration; // ~26.6 seconds
const totalSamples = Math.floor(totalDuration * sampleRate);
const audioBuffer = new Float32Array(totalSamples);

function addNote(freq, startTime, duration, volume, isBass = false) {
  const startSample = Math.floor(startTime * sampleRate);
  const numSamples = Math.floor(duration * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;

    const t = i / sampleRate;
    // Envelope: quick attack + smooth exponential decay
    const attack = Math.min(1, i / (sampleRate * 0.03));
    const decay = Math.exp(-t * (isBass ? 1.4 : 2.2));
    const envelope = attack * decay * volume;

    // Harmonic richness (warm piano / acoustic harp string)
    let sample =
      Math.sin(2 * Math.PI * freq * t) * 0.6 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.25 +
      Math.sin(2 * Math.PI * freq * 3 * t) * 0.1 +
      Math.sin(2 * Math.PI * freq * 4 * t) * 0.05;

    // Gentle chorus / warmth
    sample += Math.sin(2 * Math.PI * (freq + 0.5) * t) * 0.15;

    audioBuffer[idx] += sample * envelope;
  }
}

// Generate the score
score.forEach((event) => {
  if (event.bass) {
    addNote(event.bass, event.time, 3.0, 0.45, true);
    addNote(event.bass * 2, event.time, 2.5, 0.25, false);
  }
  if (event.chord) {
    event.chord.forEach((note, nIdx) => {
      // Arpeggiate chord slightly for harp-like acoustic sound
      addNote(note, event.time + nIdx * 0.08, 2.8, 0.2, false);
    });
  }
  if (event.melody) {
    addNote(event.melody, event.time, event.dur, 0.5, false);
    // Subtle octave shimmer on melody
    addNote(event.melody * 2, event.time, event.dur * 0.7, 0.08, false);
  }
});

// Normalize & soft clip to prevent distortion
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  const abs = Math.abs(audioBuffer[i]);
  if (abs > maxAmp) maxAmp = abs;
}

const targetAmp = 0.85;
const scale = maxAmp > 0 ? targetAmp / maxAmp : 1;

// Build 16-bit PCM WAV
const numChannels = 2; // Stereo
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const wavBuffer = Buffer.alloc(44 + dataSize);

// RIFF header
wavBuffer.write("RIFF", 0);
wavBuffer.writeUInt32LE(36 + dataSize, 4);
wavBuffer.write("WAVE", 8);

// fmt chunk
wavBuffer.write("fmt ", 12);
wavBuffer.writeUInt32LE(16, 16); // Chunk size
wavBuffer.writeUInt16LE(1, 20); // Audio format (1 = PCM)
wavBuffer.writeUInt16LE(numChannels, 22);
wavBuffer.writeUInt32LE(sampleRate, 24);
wavBuffer.writeUInt32LE(byteRate, 28);
wavBuffer.writeUInt16LE(blockAlign, 32);
wavBuffer.writeUInt16LE(16, 34); // Bits per sample

// data chunk
wavBuffer.write("data", 36);
wavBuffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Soft limiter tanh
  const sampleFloat = Math.tanh(audioBuffer[i] * scale);
  const sampleInt = Math.max(-32768, Math.min(32767, Math.floor(sampleFloat * 32767)));

  // Left & Right stereo channels
  wavBuffer.writeInt16LE(sampleInt, offset);
  wavBuffer.writeInt16LE(sampleInt, offset + 2);
  offset += 4;
}

const publicDir = path.join(__dirname, "..", "public");

// Save as both kudmayi.wav and kudmayi.mp3
fs.writeFileSync(path.join(publicDir, "kudmayi.wav"), wavBuffer);
fs.writeFileSync(path.join(publicDir, "kudmayi.mp3"), wavBuffer);

console.log("Successfully generated romantic wedding instrumental music!");
console.log("Duration:", (totalDuration).toFixed(1), "seconds");
console.log("File size:", (wavBuffer.length / 1024 / 1024).toFixed(2), "MB");

