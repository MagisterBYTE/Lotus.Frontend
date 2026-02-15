/**
 * Объект локализации для модуля Core
 * Содержит все данные локализации для модуля Core в виде объекта data
 */
export declare const LocalizationCore: {
    data: {
        api: {
            errorNotOnline: string;
            errorNotFound: string;
            errorTimeoutError: string;
            errorAuth: string;
            auth: {
                invalid_request: string;
                unauthorized_client: string;
                access_denied: string;
                unsupported_response_type: string;
                invalid_scope: string;
                server_error: string;
                temporarily_unavailable: string;
            };
        };
        common: {
            name: string;
            displayName: string;
            failed: string;
            succeed: string;
        };
        controls: {
            grid: string;
            rotation: string;
            scale: string;
            border: string;
            cornerRounding: string;
            transparentBackground: string;
            smoothingEdges: string;
        };
        actions: {
            load: string;
            reset: string;
            get: string;
            getting: string;
            gettingSucceed: string;
            gettingFailed: string;
            create: string;
            createObject: string;
            add: string;
            adding: string;
            addingSucceed: string;
            addingFailed: string;
            edit: string;
            editObject: string;
            save: string;
            saving: string;
            savingSucceed: string;
            savingFailed: string;
            duplicate: string;
            delete: string;
            deleting: string;
            deletingSucceed: string;
            deletingFailed: string;
            deleteObject: string;
            cancel: string;
            clear: string;
            confirm: string;
        };
        filters: {
            equals: string;
            equalsAbbr: string;
            notEqual: string;
            notEqualAbbr: string;
            lessThan: string;
            lessThanAbbr: string;
            lessThanOrEqual: string;
            lessThanOrEqualAbbr: string;
            greaterThan: string;
            greaterThanAbbr: string;
            greaterThanOrEqual: string;
            greaterThanOrEqualAbbr: string;
            between: string;
            betweenAbbr: string;
            contains: string;
            startsWith: string;
            endsWith: string;
            like: string;
            notEmpty: string;
            empty: string;
            includeAny: string;
            includeAll: string;
            includeEquals: string;
            includeNone: string;
        };
        byteSize: {
            bytes: string;
            Kb: string;
            Mb: string;
            Gb: string;
        };
        validation: {
            invalidEmail: string;
            invalidFormat: string;
            invalidPhone: string;
            invalidUrl: string;
            required: string;
            positive: string;
            negative: string;
            minNumber: (min: number) => string;
            maxNumber: (min: number) => string;
            rangeNumber: (min: number, max: number) => string;
            minDate: (min: string) => string;
            maxDate: (min: string) => string;
            rangeDate: (min: string, max: string) => string;
            maxString: (length: number) => string;
            minString: (length: number) => string;
            rangeString: (min: number, max: number) => string;
            minCount: (count: number) => string;
            maxCount: (count: number) => string;
        };
    };
};
//# sourceMappingURL=LocalizationCore.d.ts.map