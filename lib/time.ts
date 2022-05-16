export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
}

export function timePassed(time) {
  const currentTime = new Date().getTime();
  const last_played = new Date(time).getTime();
  const timePassed = currentTime - last_played;
  const minutes = Math.floor(timePassed / 60000);
  const seconds = Math.floor((timePassed % 60000) / 1000);

  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};