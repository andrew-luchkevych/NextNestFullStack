
import * as dotenv from "dotenv"
import * as fs from "fs"

const requiredKeys = [
	"DB_HOST",
	"DB_PORT",
	"DB_USER",
	"DB_PASSWORD",
	"DB_NAME",
	"JWT_SECRET",
	"JWT_EXPIRATION_TIME",
	"UPLOAD_PATH",
] as const;

const optionalKeys = [
	"PORT",
] as const;

export type RequiredConfigKeys = typeof requiredKeys[number];
export type OptionalConfigKeys = typeof optionalKeys[number];

export type ConfigKeys = RequiredConfigKeys | OptionalConfigKeys
export class ConfigService {
	private readonly envConfig: { [key: string]: string }

	constructor(filePath: string) {
		this.envConfig = dotenv.parse(fs.readFileSync(filePath))
		requiredKeys.forEach(key => {
			if (!this.envConfig[key]) {
				throw new Error(`${key} missed!`);
			}
		})
	}

	get(key: ConfigKeys): string {
		return this.envConfig[key]
	}
}