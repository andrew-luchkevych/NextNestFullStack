
import { ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "typeorm";
import EntityWithBase from "src/common/utils/entities/Base/Base.entity";
import EntityWithImage from "src/common/utils/entities/Image/Image.entity";
import EntityWithPrice from "src/common/utils/entities/Price/Price.entity";
import EntityWithUniqueName from "src/common/utils/entities/UniqueName/UniqueName.entity";

@Entity()
@ObjectType()
export class AccessoryEntity extends EntityWithBase(EntityWithPrice(EntityWithUniqueName(EntityWithImage(BaseEntity)))) { }
export default AccessoryEntity;