import type { ReactNode } from "react";

export default function AuthPagesContainer({ children }: { children: ReactNode }) {
    return <div className="h-screen flex justify-center items-center bg-linear-to-br from-stone-100 via-stone-200 to-stone-300">
        {children}
    </div>
}