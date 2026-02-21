import { hardwareProjects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Video, Gamepad2 } from 'lucide-react';

export function generateStaticParams() {
    return hardwareProjects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function HardwareProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const p = await params;
    const project = hardwareProjects.find(pObj => pObj.slug === p.slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="project-detail-page hardware-theme">
            <div className="project-detail-hero">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="project-hero-img"
                    priority
                />
                <div className="project-hero-overlay"></div>

                <div className="container project-hero-content">
                    <Link href="/#hardware-projects" className="btn btn-secondary back-btn">
                        <ArrowLeft size={18} /> Back to Hardware
                    </Link>
                    <div className="hardware-category-badge">{project.categoryLabel}</div>
                    <h1 className="heading-1 project-hero-title">{project.title}</h1>
                    <p className="project-hero-subtitle">{project.description}</p>

                    <div className="project-hero-actions">
                        {project.websiteUrl && (
                            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: 'var(--secondary-accent)', borderColor: 'var(--secondary-accent)' }}>
                                <ExternalLink size={18} /> Visit Website
                            </a>
                        )}
                        {project.videoId && (
                            <a href={`https://www.youtube.com/watch?v=${project.videoId}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-blur" style={{ border: '1px solid rgba(255, 0, 0, 0.4)' }}>
                                <Video size={18} /> Watch Video
                            </a>
                        )}
                        {project.playStoreUrl && (
                            <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-blur" style={{ border: '1px solid rgba(0, 255, 100, 0.4)' }}>
                                <Gamepad2 size={18} /> Get on Google Play
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-blur">
                                <Github size={18} /> Source Code
                            </a>
                        )}
                        {project.demoUrl && !project.websiteUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: 'var(--secondary-accent)', borderColor: 'var(--secondary-accent)' }}>
                                <ExternalLink size={18} /> Watch Video
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="container project-detail-body section-padding">
                <div className="project-main-content">
                    <h2 className="heading-3">Overview</h2>
                    <div className="project-long-desc">
                        {project.longDescription?.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    {project.features && project.features.length > 0 && (
                        <>
                            <h2 className="heading-3 mt-12 mb-6 text-gradient-alt">Technical Specifications</h2>
                            <ul className="project-features-list">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="project-feature-item">
                                        <CheckCircle2 className="text-secondary feature-icon" size={24} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {project.gallery && project.gallery.length > 0 && (
                        <>
                            <h2 className="heading-3 mt-12 mb-6">Hardware Gallery</h2>
                            <div className="project-gallery-grid">
                                {project.gallery.map((img, i) => (
                                    <div key={i} className="project-gallery-item hardware-gallery-item">
                                        <Image src={img} alt={`${project.title} photo ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="project-sidebar">
                    <div className="glass-panel sidebar-card hardware-sidebar-card">
                        <h3 className="sidebar-title text-gradient-alt">Engineering Stack</h3>
                        <div className="sidebar-tech-list">
                            {project.technologies.map(tech => (
                                <span key={tech} className="hardware-tech-badge">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
