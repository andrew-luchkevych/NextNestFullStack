import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessoriesController } from "./Accessory.controller";
import AccessoryEntity from "./Accessory.entity";
import AccessoriesService from "./Accessory.service";

@Module({
	imports: [TypeOrmModule.forFeature([AccessoryEntity])],
	controllers: [AccessoriesController],
	providers: [AccessoriesService],
})
export class AccessoriesModule { }

export default AccessoriesModule;