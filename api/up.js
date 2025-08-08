const startOffset = {
  days: parseInt(process.env.START_DAYS || "11"),
  hours: parseInt(process.env.START_HOURS || "9"),
  minutes: parseInt(process.env.START_MINUTES || "48"),
  seconds: parseInt(process.env.START_SECONDS || "0"),
};

function getStartTime() {
  const now = new Date();
  now.setDate(now.getDate() - startOffset.days);
  now.setHours(now.getHours() - startOffset.hours);
  now.setMinutes(now.getMinutes() - startOffset.minutes);
  now.setSeconds(now.getSeconds() - startOffset.seconds);
  return now;
}

export default function handler(req, res) {
  const startTime = getStartTime();
  const now = new Date();

  let diff = Math.floor((now - startTime) / 1000);

  const days = Math.floor(diff / (3600 * 24));
  diff %= 3600 * 24;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  res.status(200).json({
    server: process.env.SERVER_NAME || "moronali-ELV",
    uptime: { days, hours, minutes, seconds },
  });
}
