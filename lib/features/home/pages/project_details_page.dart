import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:animate_do/animate_do.dart';
import 'dart:html' as html;
import 'dart:ui' as ui;
import 'dart:math' as math;
import '../widgets/projects_section.dart';
import 'youtube_player_web.dart' if (dart.library.html) 'youtube_player_web.dart';

class ProjectDetailsPage extends StatefulWidget {
  final FeaturedProject project;

  const ProjectDetailsPage({
    super.key,
    required this.project,
  });

  @override
  State<ProjectDetailsPage> createState() => _ProjectDetailsPageState();
}

class _ProjectDetailsPageState extends State<ProjectDetailsPage> with SingleTickerProviderStateMixin {
  bool _isVideoLoading = true;
  bool _isImageLoading = true;
  late ImageProvider _imageProvider;
  String? _videoId;
  final String _viewType = 'youtube-player';
  bool _isPlayerReady = false;
  
  // Animation controller for particles
  late AnimationController _animationController;
  late Animation<double> _animation;
  final List<Particle> _particles = List.generate(
    50,
    (index) => Particle(
      position: Offset(
        math.Random().nextDouble() * 2000,
        math.Random().nextDouble() * 1000,
      ),
      velocity: Offset(
        math.Random().nextDouble() * 2 - 1,
        math.Random().nextDouble() * 2 - 1,
      ),
      radius: math.Random().nextDouble() * 2 + 1,
    ),
  );

  @override
  void initState() {
    super.initState();
    _initializeVideo();
    _initializeImage();
    
    // Initialize animation controller
    _animationController = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    )..repeat();

    _animation = Tween<double>(
      begin: 0,
      end: 2 * math.pi,
    ).animate(_animationController);
  }

  void _initializeImage() {
    _imageProvider = AssetImage(widget.project.imageUrl);
    _imageProvider.resolve(ImageConfiguration()).addListener(
      ImageStreamListener(
        (info, synchronousCall) {
          if (mounted) {
            setState(() {
              _isImageLoading = false;
            });
          }
        },
        onError: (exception, stackTrace) {
          if (mounted) {
            setState(() {
              _isImageLoading = false;
            });
          }
        },
      ),
    );
  }

  void _initializeVideo() {
    // Use placeholder video if no video ID is provided
    final videoId = widget.project.videoId ?? 'oe4XJ851oOk';
    try {
      if (videoId.length == 11) {
        // Initialize web player
        initializeYoutubePlayer(_viewType, videoId);
        setState(() {
          _videoId = videoId;
          _isVideoLoading = false;
          _isPlayerReady = true;
        });
      } else {
        setState(() {
          _isVideoLoading = false;
          _isPlayerReady = false;
        });
        debugPrint('Invalid video ID format: $videoId');
      }
    } catch (e) {
      setState(() {
        _isVideoLoading = false;
        _isPlayerReady = false;
      });
      debugPrint('Error initializing video player: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final size = MediaQuery.of(context).size;
    final isMobile = size.width <= 600;

    return Scaffold(
      backgroundColor: isDark 
        ? Colors.black
        : Colors.white,
      body: Stack(
        children: [
          // Animated Background
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: isDark 
                    ? [
                        Colors.black,
                        Colors.black87,
                        Colors.black,
                      ]
                    : [
                        Colors.white,
                        Colors.grey[50]!,
                        Colors.white,
                      ],
                ),
              ),
              child: AnimatedBuilder(
                animation: _animationController,
                builder: (context, child) {
                  for (var particle in _particles) {
                    particle.update(size);
                  }
                  return CustomPaint(
                    painter: DetailPageParticlesPainter(
                      particles: _particles,
                      isDark: isDark,
                    ),
                    size: Size.infinite,
                  );
                },
              ),
            ),
          ),
          // Main Content
          CustomScrollView(
            slivers: [
              // App Bar with Banner Image
              SliverAppBar(
                expandedHeight: 300,
                pinned: true,
                flexibleSpace: FlexibleSpaceBar(
                  background: Stack(
                    fit: StackFit.expand,
                    children: [
                      // Project Banner Image with Loading Indicator
                      Stack(
                        fit: StackFit.expand,
                        children: [
                          Image(
                            image: _imageProvider,
                            fit: BoxFit.cover,
                            frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
                              if (wasSynchronouslyLoaded) return child;
                              return AnimatedSwitcher(
                                duration: const Duration(milliseconds: 300),
                                child: frame != null
                                  ? child
                                  : Container(
                                      color: isDark ? Colors.grey[900] : Colors.grey[100],
                                      child: Center(
                                        child: CircularProgressIndicator(
                                          color: Theme.of(context).colorScheme.primary,
                                        ),
                                      ),
                                    ),
                              );
                            },
                            errorBuilder: (context, error, stackTrace) => Container(
                              color: isDark ? Colors.grey[900] : Colors.grey[100],
                              child: Center(
                                child: Icon(
                                  Icons.broken_image,
                                  size: 64,
                                  color: isDark ? Colors.white24 : Colors.black.withOpacity(0.24),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      // Gradient Overlay
                      Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.black.withOpacity(0.7),
                              Colors.black.withOpacity(0.3),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  title: FadeInDown(
                    duration: const Duration(milliseconds: 600),
                    child: Text(
                      widget.project.title,
                      style: GoogleFonts.inter(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
              // Content
              SliverToBoxAdapter(
                child: Container(
                  padding: EdgeInsets.all(isMobile ? 16 : 32),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Project Links
                      FadeInLeft(
                        duration: const Duration(milliseconds: 600),
                        child: Text(
                          'Project Links',
                          style: GoogleFonts.inter(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : Colors.black,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      FadeInLeft(
                        duration: const Duration(milliseconds: 600),
                        delay: const Duration(milliseconds: 200),
                        child: Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: isDark ? Colors.grey[900] : Colors.grey[100],
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                              width: 1,
                            ),
                          ),
                          child: Wrap(
                            spacing: 16,
                            runSpacing: 16,
                            children: [
                              if (widget.project.githubUrl.isNotEmpty)
                                _buildLinkButton(
                                  icon: FontAwesomeIcons.github,
                                  label: 'GitHub',
                                  url: widget.project.githubUrl,
                                  isDark: isDark,
                                ),
                              if (widget.project.demoUrl != null)
                                _buildLinkButton(
                                  icon: Icons.play_circle_outline,
                                  label: 'Live Demo',
                                  url: widget.project.demoUrl!,
                                  isDark: isDark,
                                ),
                              if (widget.project.facebookUrl != null)
                                _buildLinkButton(
                                  icon: FontAwesomeIcons.facebook,
                                  label: 'Facebook',
                                  url: widget.project.facebookUrl!,
                                  isDark: isDark,
                                ),
                              if (widget.project.instagramUrl != null)
                                _buildLinkButton(
                                  icon: FontAwesomeIcons.instagram,
                                  label: 'Instagram',
                                  url: widget.project.instagramUrl!,
                                  isDark: isDark,
                                ),
                              if (widget.project.websiteUrl != null)
                                _buildLinkButton(
                                  icon: Icons.language,
                                  label: 'Website',
                                  url: widget.project.websiteUrl!,
                                  isDark: isDark,
                                ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 32),

                      // Project Description
                      FadeInLeft(
                        duration: const Duration(milliseconds: 600),
                        child: Text(
                          'About the Project',
                          style: GoogleFonts.inter(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : Colors.black,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      FadeInLeft(
                        duration: const Duration(milliseconds: 600),
                        delay: const Duration(milliseconds: 200),
                        child: Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: isDark ? Colors.grey[900] : Colors.grey[100],
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                              width: 1,
                            ),
                          ),
                          child: Text(
                            widget.project.description,
                            style: GoogleFonts.inter(
                              fontSize: 16,
                              color: isDark ? Colors.grey[300] : Colors.grey[800],
                              height: 1.6,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 32),

                      // Video Section (if available)
                      if (widget.project.videoId != null) ...[
                        FadeInLeft(
                          duration: const Duration(milliseconds: 600),
                          child: Text(
                            'Project Video',
                            style: GoogleFonts.inter(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : Colors.black,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        FadeInLeft(
                          duration: const Duration(milliseconds: 600),
                          delay: const Duration(milliseconds: 200),
                          child: Container(
                            decoration: BoxDecoration(
                              color: isDark ? Colors.grey[900] : Colors.grey[100],
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                                width: 1,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: isDark 
                                    ? Colors.black.withOpacity(0.3)
                                    : Colors.grey.withOpacity(0.2),
                                  blurRadius: 8,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(16),
                              child: AspectRatio(
                                aspectRatio: 16 / 9,
                                child: Stack(
                                  fit: StackFit.expand,
                                  children: [
                                    // Video Placeholder
                                    Container(
                                      color: isDark ? Colors.grey[850] : Colors.grey[200],
                                      child: Center(
                                        child: Icon(
                                          Icons.play_circle_outline,
                                          size: 64,
                                          color: isDark ? Colors.white24 : Colors.black26,
                                        ),
                                      ),
                                    ),
                                    if (_isVideoLoading)
                                      Container(
                                        color: isDark ? Colors.black45 : Colors.white70,
                                        child: Center(
                                          child: Column(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              CircularProgressIndicator(
                                                color: Theme.of(context).colorScheme.primary,
                                              ),
                                              const SizedBox(height: 16),
                                              Text(
                                                'Loading video...',
                                                style: GoogleFonts.inter(
                                                  color: isDark ? Colors.white70 : Colors.black54,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    if (!_isVideoLoading && _videoId != null && _isPlayerReady)
                                      Container(
                                        height: 400,
                                        decoration: BoxDecoration(
                                          color: isDark ? Colors.grey[900] : Colors.grey[100],
                                          borderRadius: BorderRadius.circular(12),
                                          border: Border.all(
                                            color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                                            width: 1,
                                          ),
                                        ),
                                        clipBehavior: Clip.antiAlias,
                                        child: HtmlElementView(
                                          viewType: _viewType,
                                        ),
                                      ),
                                    if (!_isVideoLoading && (!_isPlayerReady || _videoId == null))
                                      Container(
                                        height: 400,
                                        decoration: BoxDecoration(
                                          color: isDark ? Colors.grey[900] : Colors.grey[100],
                                          borderRadius: BorderRadius.circular(12),
                                          border: Border.all(
                                            color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                                            width: 1,
                                          ),
                                        ),
                                        child: Center(
                                          child: Column(
                                            mainAxisAlignment: MainAxisAlignment.center,
                                            children: [
                                              Icon(
                                                Icons.error_outline,
                                                size: 48,
                                                color: isDark ? Colors.white24 : Colors.black26,
                                              ),
                                              const SizedBox(height: 16),
                                              TextButton.icon(
                                                onPressed: _initializeVideo,
                                                icon: Icon(Icons.refresh),
                                                label: Text('Retry'),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 32),
                      ],

                      // Technologies Used
                      FadeInRight(
                        duration: const Duration(milliseconds: 600),
                        child: Text(
                          'Technologies Used',
                          style: GoogleFonts.inter(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : Colors.black,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      FadeInRight(
                        duration: const Duration(milliseconds: 600),
                        delay: const Duration(milliseconds: 200),
                        child: Container(
                          padding: const EdgeInsets.all(24),
                          decoration: BoxDecoration(
                            color: isDark ? Colors.grey[900] : Colors.grey[100],
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                              width: 1,
                            ),
                          ),
                          child: Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: widget.project.technologies.map((tech) => _buildTechChip(tech, isDark)).toList(),
                          ),
                        ),
                      ),

                      if (widget.project.stats != null) ...[
                        const SizedBox(height: 32),
                        // Project Stats
                        FadeInRight(
                          duration: const Duration(milliseconds: 600),
                          child: Text(
                            'Project Stats',
                            style: GoogleFonts.inter(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : Colors.black,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        FadeInRight(
                          duration: const Duration(milliseconds: 600),
                          delay: const Duration(milliseconds: 200),
                          child: Container(
                            padding: const EdgeInsets.all(24),
                            decoration: BoxDecoration(
                              color: isDark ? Colors.grey[900] : Colors.grey[100],
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
                                width: 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                _buildStatCard(
                                  icon: Icons.star,
                                  value: widget.project.stats!.stars.toString(),
                                  label: 'Stars',
                                  isDark: isDark,
                                ),
                                const SizedBox(width: 16),
                                _buildStatCard(
                                  icon: Icons.fork_right,
                                  value: widget.project.stats!.forks.toString(),
                                  label: 'Forks',
                                  isDark: isDark,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTechChip(String tech, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? Colors.blue.shade900.withOpacity(0.2) : Colors.blue.shade50,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? Colors.blue.shade200.withOpacity(0.3) : Colors.blue.shade100,
          width: 1,
        ),
      ),
      child: Text(
        tech,
        style: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
        ),
      ),
    );
  }

  Widget _buildLinkButton({
    required IconData icon,
    required String label,
    required String url,
    required bool isDark,
  }) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: isDark 
              ? [Colors.blue.shade900, Colors.purple.shade900]
              : [Colors.blue.shade400, Colors.purple.shade400],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: isDark 
                ? Colors.blue.shade900.withOpacity(0.3)
                : Colors.blue.shade200.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ElevatedButton.icon(
          onPressed: () async {
            final uri = Uri.parse(url);
            if (await canLaunchUrl(uri)) {
              await launchUrl(uri, mode: LaunchMode.externalApplication);
            }
          },
          icon: Icon(icon, size: 20),
          label: Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.transparent,
            foregroundColor: Colors.white,
            shadowColor: Colors.transparent,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String value,
    required String label,
    required bool isDark,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isDark ? Colors.grey[850] : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isDark ? Colors.grey[700]! : Colors.grey[200]!,
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: isDark 
                ? Colors.black.withOpacity(0.2)
                : Colors.grey.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(
              icon,
              size: 24,
              color: isDark ? Colors.grey[400] : Colors.grey[600],
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: GoogleFonts.inter(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white : Colors.black,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: GoogleFonts.inter(
                fontSize: 14,
                color: isDark ? Colors.grey[400] : Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
}

class DetailPageParticlesPainter extends CustomPainter {
  final List<Particle> particles;
  final bool isDark;

  DetailPageParticlesPainter({required this.particles, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = isDark 
          ? Colors.white.withOpacity(0.05)
          : Colors.black.withOpacity(0.03)
      ..style = PaintingStyle.fill;

    for (var particle in particles) {
      canvas.drawCircle(
        particle.position, 
        isDark ? particle.radius * 1.2 : particle.radius,
        paint
      );

      // Draw connections between nearby particles
      for (var otherParticle in particles) {
        if (particle != otherParticle) {
          final distance = (particle.position - otherParticle.position).distance;
          if (distance < 150) {
            final linePaint = Paint()
              ..color = isDark
                  ? Colors.white.withOpacity(0.02 * (1 - distance / 150))
                  : Colors.black.withOpacity(0.01 * (1 - distance / 150))
              ..strokeWidth = 0.5;
            canvas.drawLine(particle.position, otherParticle.position, linePaint);
          }
        }
      }
    }
  }

  @override
  bool shouldRepaint(DetailPageParticlesPainter oldDelegate) => true;
} 