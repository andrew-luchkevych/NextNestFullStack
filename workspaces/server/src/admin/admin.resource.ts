import {Resource as TypeORMResource} from "@admin-bro/typeorm";
import * as AdminBro from "admin-bro";

export class Resource extends (TypeORMResource as any) {
	prepareProps() {
        const { columns } = this.model.getRepository().metadata;
		console.log(columns);
		return super.prepareProps();
    }
	private prepareParams(params) {
		const preparedParams = Object.assign({}, params);
        this.properties().forEach((property) => {
			const param = AdminBro.flat.get(preparedParams, property.path());
			console.log({
				property,
				param
			});
			const key = property.path();
            if (param === undefined) {
                return;
            }
			const type = property.type();
			console.log(key, type);
            if (type === 'mixed') {
                preparedParams[key] = param;
            }
            if (type === 'number') {
                preparedParams[key] = Number(param);
            }
            if (type === 'reference') {
                if (param === null) {
                    preparedParams[property.column.propertyName] = null;
                }
                else {
                    // references cannot be stored as an IDs in typeorm, so in order to mimic this) and
                    // not fetching reference resource) change this:
                    // { postId: "1" }
                    // to that:
                    // { post: { id: 1 } }
                    const id = (property.column.type === Number) ? Number(param) : param;
                    preparedParams[property.column.propertyName] = { id };
                }
			}
			
			if(type === 'references-array') {
				console.log(param);
				if(param === null) {
					preparedParams[property.column.propertyName] = [];
				} else if (Array.isArray(param) && param.every(i => typeof i === "string")) {
					preparedParams[property.column.propertyName] = param.map(i => ({id: i}));
				} else {
					preparedParams[property.column.propertyName] = param;
				}
			}
		});
		console.log(preparedParams);
        return preparedParams;
    }
}

export default Resource as unknown as TypeORMResource;