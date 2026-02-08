export type BulkUploadDropdown = {
  key: string; // formData key
  label: string; // placeholder text
  options: { label: string; value: string }[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onChangeCapture?: (value: string) => void;
};
