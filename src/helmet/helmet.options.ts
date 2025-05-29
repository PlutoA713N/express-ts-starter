import { HelmetOptions } from 'helmet';

export const helmetOptions: HelmetOptions = {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    referrerPolicy: {
        policy: 'no-referrer',
    },
    frameguard: {
        action: 'deny',
    },
    hidePoweredBy: true,
    noSniff: true,
    dnsPrefetchControl: {
        allow: false,
    },
};
