"use client";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type={props.type || "button"}
      className={`active:scale-95 px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
