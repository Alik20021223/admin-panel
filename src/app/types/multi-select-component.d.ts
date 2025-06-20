// multi-select-component.d.ts

import React, { CSSProperties } from "react";

declare module "multi-select-component" {
  export interface Option {
    value: string;
    label: string;
  }

  export interface MultiSelectProps {
    options: Option[];
    value?: string[];
    onValueChange: (values: string[]) => void;
    placeholder?: string;
    animation?: number;
    maxCount?: number;
    variant?: string;
  }

  export const MultiSelect: React.FC<MultiSelectProps>;

  export default MultiSelect;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    style?: CSSProperties;
    className?: string;
  }
}
