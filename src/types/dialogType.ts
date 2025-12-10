export type DialogType = {
  message?: string;
  upperPart?: React.ReactNode;
  btnR: DialogButton;
  btnL: DialogButton;
}

export type DialogButton = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};