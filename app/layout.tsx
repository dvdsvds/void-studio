import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Void Studio — Web Agency",
  description: "소상공인을 위한 프리미엄 웹사이트 제작",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
