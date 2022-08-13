export default class Log {
    static log(message: string) {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const fullYear = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const dateString = `${month}/${day}/${fullYear} - ${hours}:${minutes}:${seconds}`;

        console.log(`[${dateString}] -- ${message}`)
    }
}
