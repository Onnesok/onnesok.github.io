import { softwareProjects } from '../../../data/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Video, Gamepad2 } from 'lucide-react';

export function generateStaticParams() {
    return softwareProjects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function SoftwareProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const p = await params;
    const project = softwareProjects.find(pObj => pObj.slug === p.slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="project-detail-page">
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
                    <Link href="/#software-projects" className="btn btn-secondary back-btn">
                        <ArrowLeft size={18} /> Back to Software
                    </Link>
                    <div className="project-category-badge">{project.categoryLabel}</div>
                    <h1 className="heading-1 project-hero-title">{project.title}</h1>
                    <p className="project-hero-subtitle">{project.description}</p>

                    <div className="project-hero-actions">
                        {project.websiteUrl && (
                            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <ExternalLink size={18} /> Visit Website
                            </a>
                        )}
                        {project.videoId && (
                            <a href={`https://www.youtube.com/watch?v=${project.videoId}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary bg-blur" style={{ border: '1px solid rgba(255, 0, 0, 0.4)' }}>
                                <Video size={18} /> Watch Demo
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
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <ExternalLink size={18} /> Live Demo
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
                            <h2 className="heading-3 mt-12 mb-6">Key Features</h2>
                            <ul className="project-features-list">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="project-feature-item">
                                        <CheckCircle2 className="text-primary feature-icon" size={24} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {project.gallery && project.gallery.length > 0 && (
                        <>
                            <h2 className="heading-3 mt-12 mb-6">Gallery</h2>
                            <div className="project-gallery-grid">
                                {project.gallery.map((img, i) => (
                                    <div key={i} className="project-gallery-item">
                                        <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="project-sidebar">
                    <div className="glass-panel sidebar-card">
                        <h3 className="sidebar-title">Tech Stack</h3>
                        <div className="sidebar-tech-list">
                            {project.technologies.map(tech => (
                                <span key={tech} className="software-tech-pill">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
