const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEE3VkJ4OVZFRTNtbmZTZ0dYZzNOR1pXclRTQ0NESWZobXhtd1E4cXkxUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNjNveFZxV3N4MnlaazFUVDIxcitoMlFLMFpPSnErdFUvTm94bnc0K2lCVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSXdIcE1EaVNmSWNxRk1DSTRSMTZGVndVelpIOUZPQXZDTFllcE8yRDBZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhMk9wRmdSUEJQNEVqcFExN1VJOGtTZUtGQjF1d2xnOFdiZjE5d1MwQWg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVPdU9vUXpUSTY1cGdEZWhMTE1CeWtudVYrTEE1NEhUeWt4Y3dzc1gzVXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikl1S0lxMU4zWk9oVmI4bEdHWlBmUkxDdWFHaWpXcXlucGp1QnA0RXZoak09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUozSXI1Z0RROXE4T1hRODZXck81YU1YTmxwT21LZUR1SFlLRlM0aG0zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUFJad2o3SmF5dWxWZjgwSENJTUhpK2dhVmhKTU9ibTJiN2VLYjZ1QkpCcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9GYzJwYXlEanVTVFI1V1o5emU0eXVaaUNrcXUySWg4eEx6UFNyOWFMNFhUdk51b21LUWRxOGdEY2d6eHQ5allmK1R6WloyTkc4U2RoT0NLeEs4cWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6Imp1Z3cwaUMrS0ZiWmN5L1ZhNmtEZk0yT1h2SUE1VjVrWS84RGwvWWFXMW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMDAwMDUzNDg0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBDQTA0MUNERTk1QUMyMDUzNERDODFDMDMwQjJGMThBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjEzODEzMzh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBzSHAtandzUkt1SFBXSzItSUxSS0EiLCJwaG9uZUlkIjoiNjRkNTdlZDQtNGFjYy00ZTlmLWI4OGQtNDg1ZDRhNzBjMGYzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpxL1BZOFNWaDEzTVNvUFhTMWJVcXF4N08zZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXd2RFZWZKRHBnY3QyZjE5UjFjclhVWU5TdG89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNEpXRE5LQVEiLCJtZSI6eyJpZCI6IjkyMzAwMDA1MzQ4NDozNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTE9EdXBZQ0VNZmo2TFFHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWURkQmZFSC9SeWgvU1JLVFIxZUU4Q0NmVDB3MjJ0bzNkMDl2M0NUMUJucz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRHBZOUIwZSs0NVhTcXZ6VDJFOWJmSzd1aWlzdWQwMWVjWlhLUTVVNWcyRlZFZmtteERZeDQ5L0t5dXprMXd1WU82Rk1xMUpXdmhCZU5CbHlrcTEzQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjladmFYcXlNQ2hNWjAxOVYvNmN2QU43alFXaDdYcEdtQWNMZ0Y5RmpNMjBYZEZLWmVnL1dpN05ZTnlJWlBXdDlCTzA3N3kvZGxVc2QxamhlbVhNUGp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDAwMDUzNDg0OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldBM1FYeEIvMGNvZjBrU2swZFhoUEFnbjA5TU50cmFOM2RQYjl3azlRWjcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzODEzMzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2gvIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🫰🏻✨ پرويز البلوشي 💫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "🫰🏻✨ پرويز البلوشي 💫",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY 'HRKU-af194a8d-486a-47f5-82d6-c2da964e9c6a' ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
