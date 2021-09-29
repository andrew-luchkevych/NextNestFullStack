import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { writeFile } from "fs";
import getConstants from "src/constants";
import * as source from "../../../dump/accessories.json";
import AccessoryEntity from "./Accessory.entity";
import JwtAuthenticationGuard from "src/services/Authentication/Strategies/Jwt/Jwt.guard";
import AccessoriesService from "./Accessory.service";

@Controller("/api/accessories")
@UseInterceptors(ClassSerializerInterceptor)
export class AccessoriesController {
	constructor(private readonly accessoriesService: AccessoriesService) { }

	@Get("/migrateFromJson")
	migrateFromJson() {
		const l = source.length;
		const getMigrated = (s: (typeof source)[0], i: number) => new Promise(
			(resolve, reject) => {
				const a = new AccessoryEntity();
				a.image = s.image;
				a.name = s.name;
				a.price = s.price;
				a.updatedBy = "migration@migration.com"
				a.save().then(entity => {
					resolve({
						old: s,
						migrated: JSON.parse(JSON.stringify(entity)),
					});
					console.log("Created ", i, "/", l);
				}).catch(reject);
			});
		const promises = source.map((s, i) => getMigrated(s, i));
		return Promise.all(promises).then(data => {
			console.log("Migration Finished. Creating Dump file");
			writeFile(`${getConstants().uploadsPath}/../dump/migrated/accessories.json`, JSON.stringify(data), (err) => {
				console.log("done", err);
			})
		})
	}

	@Get()
	@UseGuards(JwtAuthenticationGuard)
	list() {
		return this.accessoriesService.listAccessories().then(res => res.items);
	}

}

export default AccessoriesController;