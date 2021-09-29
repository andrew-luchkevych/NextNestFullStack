import { Injectable } from "@nestjs/common";
import Accessory from "./Accessory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class AccessoriesService {
	constructor(
		@InjectRepository(Accessory)
		private accessoriesRepository: Repository<Accessory>,
	) { }

	async listAccessories() {
		const [items, count] = await this.accessoriesRepository.findAndCount()
		return { items, count };
	}
}