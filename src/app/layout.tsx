import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { Providers } from "./provider";
export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.APP_URL
			? `${process.env.APP_URL}`
			: process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: `http://localhost:${process.env.PORT || 4000}`
	),
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body >
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Providers>
						{children}
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
