import { ReactNode } from "react";

export function Carousel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex gap-6 px-2" style={{ minWidth: "100%" }}>
        {children}
      </div>
    </div>
  );
}
