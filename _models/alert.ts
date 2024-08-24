export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;
    error: AlertError;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export class AlertError {
    data: string;
    success: boolean;
    timestamp: string;
    cause: string
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}