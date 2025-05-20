/**
 * Truncate string to the given length
 * @param str target string
 * @param length length which allowed string to display
 * @returns a truncated string
 */
export function truncateString(str: string, length = 10) {
  return str.length > length ? str.slice(0, length).trim() + "..." : str;
}

export function formatDate(
  day: Date,
  locale: string = "en-US",
  time: boolean = false
) {
  const date = new Date(day);
  const month = date.toLocaleString(locale, { month: "short" });

  let result = `${date.getDate()} ${month} ${date.getFullYear()}`;

  if (time) {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    result += `| ${hour}:${minute}`;
  }
  return result;
}
