// deps
import { Box, HoverCard, SelectItem, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';

// svg
import { IconChevronRight } from '@tabler/icons-react';
import { useCallback } from 'react';

interface UserCenterSelectItemProps<ValidSelectValue = string> {
  label: string;
  selectData: SelectItem[];
  defaultSelect: string;
  onSelectChange: (newLanguage: ValidSelectValue) => void;
}

export default function UserCenterSelectItem<ValidSelectValue = string>({
  label,
  ...selectItemProps
}: UserCenterSelectItemProps<ValidSelectValue>) {
  const { t } = useTranslation();

  return (
    <HoverCard position="left">
      <HoverCard.Target>
        <Box className="flex h-10 cursor-pointer items-center justify-between px-3 text-sm">
          <Text className="text-#1F2329">{t(label)}</Text>
          <IconChevronRight color="#646A73" width={14} height={14} />
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <LeftSelectPanel<ValidSelectValue> {...selectItemProps} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

// 菜单选项
export function LeftSelectPanel<ValidSelectValue = string>({
  selectData,
  onSelectChange,
}: Omit<UserCenterSelectItemProps<ValidSelectValue>, 'label'>) {
  // 点击修改选项
  const changeCurrentSelect = useCallback(
    (newSelectValue: ValidSelectValue) => {
      onSelectChange(newSelectValue);
    },
    [onSelectChange],
  );

  return (
    <Box>
      {map(selectData, (selectDescriptor) => {
        return (
          <Box
            onClick={() => {
              changeCurrentSelect(selectDescriptor.value as ValidSelectValue);
            }}
            key={selectDescriptor.value}
          >
            {selectDescriptor.label}
          </Box>
        );
      })}
    </Box>
  );
}
