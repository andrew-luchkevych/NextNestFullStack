import { PropertyOptions, ResourceWithOptions } from "admin-bro";
import { BaseEntity as BaseOrmEntity } from "typeorm";
import uploadFeature from "@admin-bro/upload";
import UploadProvider from "src/admin/providers/uploadProvider";
import getConstants from "src/constants";
import EntityWithImage from "./Image.entity";

class BaseEntity extends EntityWithImage(BaseOrmEntity) { }

type BaseResourceProperties = Record<keyof BaseEntity, PropertyOptions>;

export const getResourceWithImageAdminConfig = (): Pick<ResourceWithOptions, "options" | "features"> => ({
	options: {
		properties: <BaseResourceProperties>{
			image: {
				isVisible: false,
			},
		}
	},
	features: [
		uploadFeature({
			provider: new UploadProvider("public", getConstants().uploadsPath),
			properties: {
				key: "image",
				mimeType: "image/jpeg;image/png;image/gif",
			},
			validation: {
				mimeTypes: ["image/jpeg", "image/png"],
			},
			uploadPath: (_, filename) => `${Date.now()}_${filename}`
		}),
	]
});

export default getResourceWithImageAdminConfig;