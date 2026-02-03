interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  disabled,
  hint,
  className = '',
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
        {hint && <span className="text-neutral-dark font-normal"> {hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`input ${!onChange ? 'bg-gray-50 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={!onChange}
      />
    </div>
  );
}
