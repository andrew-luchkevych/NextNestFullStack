import * as React from "react"
import Select from "react-select/async"
import { withTheme, DefaultTheme } from "styled-components"
import { FormGroup, FormMessage, selectStyles } from "@admin-bro/design-system"

import { PropertyLabel } from "admin-bro/src/frontend/components/property-type/utils/property-label";

import { ApiClient, EditPropertyProps, SelectRecord, RecordJSON } from "admin-bro";

type CombinedProps = EditPropertyProps & { theme: DefaultTheme }
type SelectRecordsEnhanced = (SelectRecord & { record: RecordJSON; })[]

const EditManyToMany: React.FC<CombinedProps> = (props) => {
	const { onChange, property, record, theme } = props;
	const { props: { referenceId: resourceId } } = property;

	if (!resourceId) {
		throw new Error(`Cannot reference resource in property "${property.path}"`);
	}

	const [selected, setSelected] = React.useState([]);

	const handleChange = (selected: SelectRecordsEnhanced): void => {
		setSelected(selected);
		if (selected && selected.length) {
			onChange(property.path, selected.map(s => s.value), selected.map(s => s.record) as any);
		} else {
			onChange(property.path, null);
		}
	}

	const loadOptions = async (inputValue: string): Promise<SelectRecordsEnhanced> => {
		const api = new ApiClient();
		const optionRecords = await api.searchRecords({
			resourceId,
			query: inputValue,
		});
		return optionRecords.map((optionRecord: RecordJSON) => ({
			value: optionRecord.id,
			label: optionRecord.title,
			record: optionRecord,
		}));
	}
	const error = record?.errors[property.path];

	const [loadedRecord, setLoadedRecord] = React.useState<RecordJSON | undefined>();
	const [loadingRecord, setLoadingRecord] = React.useState(0);
	const styles = selectStyles(theme);

	// React.useEffect(() => {
	// 	if (!selectedValue && selectedId) {
	// 		setLoadingRecord(c => c + 1);
	// 		const api = new ApiClient();
	// 		api.recordAction({
	// 			actionName: "show",
	// 			resourceId,
	// 			recordId: selectedId,
	// 		}).then(({ data }: any) => {
	// 			setLoadedRecord(data.record)
	// 		}).finally(() => {
	// 			setLoadingRecord(c => c - 1)
	// 		});
	// 	}
	// }, [selectedValue, selectedId, resourceId]);

	return (
		<FormGroup error={Boolean(error)}>
			123
			<PropertyLabel property={property} />
			<Select
				cacheOptions
				value={selected}
				styles={styles}
				defaultOptions
				loadOptions={loadOptions}
				onChange={handleChange}
				isClearable
				isMulti={true}
				isDisabled={property.isDisabled}
				isLoading={loadingRecord}
				{...property.props}
			/>
			<FormMessage>{error?.message}</FormMessage>
		</FormGroup>
	);
};

export default withTheme(EditManyToMany);
