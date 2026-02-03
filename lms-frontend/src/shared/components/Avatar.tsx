const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-xl',
};

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`rounded-full bg-primary-red flex items-center justify-center text-white font-bold flex-shrink-0 ${sizeMap[size]} ${className}`}
    >
      {name?.[0]?.toUpperCase() || 'U'}
    </div>
  );
}
