import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FilterTube Pro",
  description:
    "Supercharge YouTube Search: More filters, more control. Your video exploration, amplified.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="en">
      <body className={robotoFlex.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
