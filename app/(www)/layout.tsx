import {Footer} from "@/components/footer";
import {Header} from "@/components/www/header";
import React from "react";

export default function WwwLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-full bg-white">
                <Header />
                <main className="h-full w-full">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}