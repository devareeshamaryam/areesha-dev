 import CursorGlow from "@/components/Cursorglow";
import Header from "@/components/Header";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <CursorGlow />
      <Header />
      {children}
    </>
  );
}