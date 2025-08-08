const startTime = Date.now();

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
________________________`;

  res.status(200).send(text);
}
