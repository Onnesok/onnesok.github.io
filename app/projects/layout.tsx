import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ContactFooter />
    </>
  );
}
