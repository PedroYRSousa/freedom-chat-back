export default class Log {
    public static log(message: string) {
        const date = new Date();
        const day = Log.Adjuste(date.getDate().toString());
        const month = Log.Adjuste(date.getMonth().toString());
        const fullYear = Log.Adjuste(date.getFullYear().toString());
        const hours = Log.Adjuste(date.getHours().toString());
        const minutes = Log.Adjuste(date.getMinutes().toString());
        const seconds = Log.Adjuste(date.getSeconds().toString());

        const dateString = `${month}/${day}/${fullYear} - ${hours}:${minutes}:${seconds}`;

        console.log(`[${dateString}] -- ${message}`)
    }

    private static Adjuste(target: string) {
        if (target.length < 2)
            target = '0' + target;

        return (target);
    }
}
