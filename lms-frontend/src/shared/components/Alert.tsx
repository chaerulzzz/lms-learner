interface AlertProps {
  variant: 'error' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

const variantStyles: Record<AlertProps['variant'], string> = {
  error: 'bg-red-50 border-status-error text-status-error',
  success: 'bg-green-50 border-status-success text-status-success',
  warning: 'bg-yellow-50 border-status-warning text-status-warning',
  info: 'bg-blue-50 border-blue-400 text-blue-700',
};

export function Alert({ variant, children }: AlertProps) {
  return (
    <div className={`p-3 border rounded-lg ${variantStyles[variant]}`}>
      <p className="text-sm">{children}</p>
    </div>
  );
}
