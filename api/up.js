// api/up.js

// Get start time from ENV or fallback to now
// Format: YYYY-MM-DD HH:mm:ss (24h)
const startTimeStr = process.env.CUSTOM_START_TIME || 2025-07-28 10:00:00;

function parseDateTime(str) {
  const parts = str.split(/[- :]/).map(n => parseInt(n, 10));
  // [YYYY, MM, DD, HH, mm, ss]
  return new Date(parts[0], parts[1] - 1, parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0);
}

const startTime = startTimeStr ? parseDateTime(startTimeStr).getTime() : Date.now();

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function handler(req, res) {
  const uptime = Date.now() - startTime;
  const { days, hours, minutes, seconds } = formatDuration(uptime);

  const text =
`🔵 Server Uptime: moronali-ELV
________________________
│ Days    : ${days}
│ Hours   : ${hours}
│ Minutes : ${minutes}
│ Seconds : ${seconds}
________________________
(started from: ${startTimeStr || "now"})`;

  res.status(200).send(text);
}
