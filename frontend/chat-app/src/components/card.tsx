import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return <div className={`bg-white shadow-lg rounded-xl p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: ReactNode, className?: string; }) {
    return <div className="p-4">{children}</div>;
}

