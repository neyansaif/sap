export type FilterPanelProps = {
    studyGroups: string[];
    selectedGroups: string[];
    handleGroupChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};