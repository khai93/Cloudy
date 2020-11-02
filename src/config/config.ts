import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

console.log( process.env.OPEN_WEATHER_API_KEY);

export const config = {
    server: {
        PORT: parseInt(process.env.PORT) || 8080
    },
    openweather: {
        apiKey: process.env.OPEN_WEATHER_API_KEY
    }
}