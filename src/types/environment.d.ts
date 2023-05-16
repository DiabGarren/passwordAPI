export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string;
            CLIENT_ID: string;
            CLIENT_SECRET: string;
        }
    }
}