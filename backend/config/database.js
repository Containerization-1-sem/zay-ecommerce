module.exports = {
  username: process.env.DB_USERNAME || "youruser",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_DATABASE || "yourdatabase",
  host: process.env.DB_HOSTNAME || "db",
  dialect: "postgres"
}
