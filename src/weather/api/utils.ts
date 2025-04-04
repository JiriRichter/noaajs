// returns date formatted as YYYYMMDD HH:mm in UTC
export function formatDate(date: Date): string {

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}