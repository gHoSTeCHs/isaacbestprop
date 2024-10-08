import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger'; // Define button variants
	loading?: boolean; // Loading state
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	loading = false,
	children,
	className,
	...props
}) => {
	const baseStyles =
		'px-[16px] py-[14px] md:px-[20px] md:py-[14px] text-[14px] font-semibold rounded-md focus:outline-none transition duration-150';
	const variantStyles = {
		primary:
			'bg-background-primary text-txt font-semibold hover:bg-background-tertiary border border-border hover:bg-gray-600',
		secondary: 'bg-btn text-white hover:bg-gray-600',
		danger: 'bg-red-500 text-white hover:bg-red-600',
	};
	return (
		<button
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
			disabled={loading} // Disable button if loading
			{...props} // Spread other props (like onClick)
		>
			{loading ? 'Loading...' : children} {/* Show loading text if loading */}
		</button>
	);
};

export default Button;
