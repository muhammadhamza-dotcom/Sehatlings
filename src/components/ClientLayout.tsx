"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      key={pathname}
    >
      {children}
    </div>
  );
}