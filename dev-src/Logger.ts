export interface PrintLogger {
    log : string;
}

export function printLog(loggerObj: PrintLogger, log: string) {
    loggerObj.log = log;
    console.log(loggerObj.log);
}