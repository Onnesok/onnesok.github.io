import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            {/* Provide the navbar on detail pages too */}
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                {children}
            </div>
            <ContactFooter />
        </main>
    );
}
