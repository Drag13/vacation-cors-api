# Vacation Cors Api

Proxy for the vacation https://date.nager.at to fix CORS issue

## Local setup

- Install: `npm ci`
- Start `npm run start:dev`
- Use `fetch('http://localhost:8080/https://date.nager.at/api/v2/LongWeekend/2021/UA');` from the client hosted at **http://localhost:8887** or update script to support other localhost
