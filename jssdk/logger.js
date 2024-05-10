
class Logger {
    static isvicible = process.env.NODE_ENV === 'development' ? true : false;
    constructor() {
        this.logs = [];
    }
    static toggleVisibilty() {
        this.isvicible = !this.isvicible;
    }
    static other() {
        const args = Array.from(arguments);
        const type = args[0];
        args.shift();

        if (this.isvicible) {
            for (let i = 0; i < args.length; i++) {
                console[type](args[i]);
            }
        }
    }
    static log() {
        const args = Array.from(arguments);
        if (this.isvicible) {
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        }
    }
    static error() {
        const args = Array.from(arguments);
        if (this.isvicible) {
            for (let i = 0; i < args.length; i++) {
                console.error(args[i]);
            }
        }
    }
    static info() {
        const args = Array.from(arguments);
        if (this.isvicible) {
            for (let i = 0; i < args.length; i++) {
                console.info(args[i]);
            }
        }
    }
    static warn() {
        const args = Array.from(arguments);
        if (this.isvicible) {
            for (let i = 0; i < args.length; i++) {
                console.warn(args[i]);
            }
        }
    }

    static clear() {
        this.logs = [];
    }
    static getLogs() {
        return this.logs;
    }
}
window.Logger = Logger;
class Message {
    constructor(message , type,uniqueId) {
        this.message = message;
        this.type = type;
        this.uniqueId = uniqueId;
    }
    set message(value) {
        throw new Error('message is a read only property');
    }
    set type(value) {
        throw new Error('type is a read only property');
    }
    set uniqueId(value) {
        throw new Error('uniqueId is a read only property');
    }
    get message() {
        return this.message;
    }
    get type() {
        return this.type;
    }
    get uniqueId() {
        return this.uniqueId;
    }
}