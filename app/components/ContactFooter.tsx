import { Github, Linkedin, Mail, MapPin, Phone, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function ContactFooter() {
    return (
        <footer id="contact" className="footer-section" style={{ background: '#000000', padding: '6rem 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>

                    {/* Column 1: Info */}
                    <div>
                        <h2 className="heading-2" style={{ color: 'white', marginBottom: '1rem' }}>Get In Touch.</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.6' }}>
                            Whether you have a project in mind, a robotics challenge to solve, or just want to connect, my inbox is always open.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px' }}>
                                    <Mail size={24} style={{ color: 'var(--primary-accent)' }} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '0.2rem' }}>Email</h4>
                                    <a href="mailto:ratulhasan9464@gmail.com" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>ratulhasan9464@gmail.com</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px' }}>
                                    <MapPin size={24} style={{ color: 'var(--primary-accent)' }} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '0.2rem' }}>Location</h4>
                                    <span style={{ color: 'var(--text-secondary)' }}>Dhaka, Bangladesh</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px' }}>
                                    <Phone size={24} style={{ color: 'var(--primary-accent)' }} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '0.2rem' }}>Phone</h4>
                                    <a href="tel:+8801700595246" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>+880 1700 595246</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Social / Action */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <h3 className="heading-3 text-gradient" style={{ margin: 0 }}>Say Hello</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

                        <Link href="mailto:ratulhasan9464@gmail.com" className="btn btn-primary" style={{ padding: '1rem', width: '100%', justifyContent: 'center', fontSize: '1.1rem', marginTop: '1rem' }}>
                            Send a Message <Mail size={20} />
                        </Link>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Or connect on social media:</p>
                            <div className="social-links" style={{ justifyContent: 'flex-start', margin: 0, gap: '1rem' }}>
                                <a href="https://github.com/Onnesok" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                    <Github size={20} />
                                </a>
                                <a href="https://www.linkedin.com/in/ratul-hasan-45911b245/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://www.facebook.com/share/1AXaXb5KZT/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="copyright" style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)' }}>© 2026 Onnesok, all rights reserved. built with ❤️</p>
                </div>
            </div>
        </footer>
    );
}
