import dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const knex = {
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		port: process.env.PORT,
		user: process.env.DB_USER,
		password: process.env.DB_LOCAL_PASSWORD,
		database: process.env.DB_LOCAL_DBNAME,
	},
};

export default knex;
