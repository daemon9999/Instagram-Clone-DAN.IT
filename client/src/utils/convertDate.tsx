export default function convertDate(date: string) {
    const originalDate = new Date(date);

const day = originalDate.getDate().toString().padStart(2, '0');
const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
const year = originalDate.getFullYear();

const formattedDate = `${day}.${month}.${year}`;
return formattedDate
}