import { Dropdown, DropdownMenuItemType, IDropdownOption } from '@fluentui/react';
import * as React from 'react';

const unitOptions = [
  { key: 0, text: 'in' }, 
  { key: 1, text: 'ft' }, 
  { key: 2, text: 'mm' }, 
  { key: 3, text: 'cm' }, 
  { key: 4, text: 'm' }, 
  { key: 5, text: 'yd' },
];

export const UnitDropdown = () => {
  const [selectedKey, setSelectedItem] = React.useState<number>();
  const onChange = (_event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => setSelectedItem(item.key as number);

  return (
    <Dropdown
      label="Unit"
      selectedKey={selectedKey}
      onChange={onChange}
      placeholder="Select an option"
      options={unitOptions}
    />
  );
};
