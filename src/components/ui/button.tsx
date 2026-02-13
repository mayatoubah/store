import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('rounded-xl bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-700 disabled:opacity-50', className)}
      {...props}
    />
  );
}
