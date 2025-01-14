import type { Metadata } from 'next'
import './globals.css'
import {TopBar} from "@/components/TopBar";
import {Auth0ProviderWrapper} from "@/components/Auth0ProviderWrapper";

export const metadata: Metadata = {
    title: 'Msa app',
    description: 'Created with help from the god emperor',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body><Auth0ProviderWrapper>
            <TopBar />
            <main className="pt-14">
                {children}
            </main>
        </Auth0ProviderWrapper></body>
        </html>
    )
}