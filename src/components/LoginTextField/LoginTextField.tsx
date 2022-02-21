import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export interface LoginTextFieldProps
  extends Pick<
    TextFieldProps,
    | "label"
    | "placeholder"
    | "type"
    | "onChange"
    | "value"
    | "InputProps"
    | "inputProps"
    | "disabled"
    | "onBlur"
    | "id"
  > {
  maxWidth?: string;
  error?: string;
}

export function LoginTextField({
  maxWidth,
  label,
  placeholder,
  type,
  value,
  InputProps,
  inputProps,
  disabled,
  error,
  onChange,
  onBlur,
  id,
}: LoginTextFieldProps): JSX.Element {
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <TextField
        label={label}
        type={type}
        id={id}
        variant="outlined"
        style={{ width: "100%", maxWidth: `${maxWidth}` }}
        size="small"
        value={value}
        disabled={disabled}
        InputProps={InputProps}
        inputProps={inputProps}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        InputLabelProps={{ shrink: true, error: !!error }}
      />
      {error && (
        <span style={{ fontSize: "0.8rem", margin: 2, color: "red" }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default LoginTextField;
