import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const config = {
    server: {
        PORT: parseInt(process.env.PORT) || 8080
    },
    openweather: {
        apiKey: validateVariable("OPEN_WEATHER_API_KEY")
    }
}

export function validateVariable(varName: string): string  {
    if (varName in process.env) {
        return process.env[varName];
    } else {
        throw new Error(`${varName} is a required env variable and was not found!`);
    }
}