import { Dropdown, IDropdownOption } from '@fluentui/react';
import * as React from 'react';
import { UNIT_LABELS, Unit } from '../lib/units';

const unitOptions = UNIT_LABELS.map((text, key) => ({ key, text }));

export interface UnitDropdownProps {
    label?: string;
    onChange?: (unit?: Unit) => void;
}

export const UnitDropdown = (props: UnitDropdownProps) => {
    const [selectedKey, setSelectedItem] = React.useState<number>();
    const onChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        const key = (item.key as Unit);
        setSelectedItem(key);
        props.onChange && props.onChange(key);
    }

    return <Dropdown
        label={props.label}
        selectedKey={selectedKey}
        onChange={onChange}
        placeholder="Select unit"
        options={unitOptions}
    />;
};
