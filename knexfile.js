import dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_LOCAL_USER,
		password: process.env.DB_LOCAL_PASSWORD,
		database: process.env.DB_LOCAL_DBNAME,
		charset: "utf8",
	},
};
