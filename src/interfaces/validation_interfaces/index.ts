interface FieldError {
    field: string;
    message: string;
    value: any;
    location: string;
}

export {FieldError}