import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:animate_do/animate_do.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:math' as math;
import 'dart:ui';
import '../pages/project_details_page.dart';
import 'package:visibility_detector/visibility_detector.dart';

class ProjectsSection extends StatefulWidget {
  const ProjectsSection({super.key});

  @override
  State<ProjectsSection> createState() => _ProjectsSectionState();
}

class _ProjectsSectionState extends State<ProjectsSection> with SingleTickerProviderStateMixin {
  int _hoveredIndex = -1;
  late AnimationController _animationController;
  late Animation<double> _animation;
  bool _showHardwareProjects = true; // Toggle between hardware and software projects
  static const int _particleCount = 6; // Fewer for performance
  final List<Particle> _particles = List.generate(
    _particleCount,
    (index) => Particle(
      position: Offset(
        math.Random().nextDouble() * 2000,
        math.Random().nextDouble() * 400,
      ),
      velocity: Offset(
        math.Random().nextDouble() * 0.3 - 0.15,
        math.Random().nextDouble() * 0.3 - 0.15,
      ),
      radius: math.Random().nextDouble() * 1.2 + 0.5,
    ),
  );

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(seconds: 18), // Slower for performance
      vsync: this,
    )..repeat();

    _animation = Tween<double>(
      begin: 0,
      end: 2 * math.pi,
    ).animate(_animationController);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final width = MediaQuery.of(context).size.width;
    final isWideScreen = width > 800;
    final isSmall = width < 600;
    final projects = _showHardwareProjects ? hardwareProjects : softwareProjects;

    final cardWidth = isSmall ? width - 32 : 340.0;
    final cardHeight = isSmall ? 320.0 : 390.0;

    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Center(
          child: Column(
            children: [
              Text(
                'Featured Projects',
                style: GoogleFonts.inter(
                  fontSize: isWideScreen ? 48 : (isSmall ? 26 : 36),
                  fontWeight: FontWeight.bold,
                  color: colorScheme.primary,
                  height: 1.1,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: isSmall ? 8 : 16),
              Text(
                'A showcase of my best work in robotics and software development',
                style: GoogleFonts.inter(
                  fontSize: isWideScreen ? 18 : (isSmall ? 14 : 16),
                  color: colorScheme.onSurface.withOpacity(0.7),
                  height: 1.5,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
        SizedBox(height: isSmall ? 20 : 40),
        _buildCategoryToggle(false),
        SizedBox(height: isSmall ? 16 : 32),
        Wrap(
          spacing: isSmall ? 8 : 24,
          runSpacing: isSmall ? 16 : 32,
          alignment: WrapAlignment.center,
          children: [
            for (int index = 0; index < projects.length; index++)
              _buildProjectCardHorizontal(
                context,
                projects[index],
                index,
                false,
                cardWidth,
                cardHeight,
                isSmall,
              ),
          ],
        ),
        SizedBox(height: isSmall ? 24 : 40),
        Center(
          child: ElevatedButton.icon(
            onPressed: () => _launchUrl('https://github.com/Onnesok?tab=repositories'),
            icon: Icon(Icons.arrow_forward),
            label: Text('View All Projects', style: GoogleFonts.inter(fontWeight: FontWeight.w600)),
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.primary,
              foregroundColor: colorScheme.onPrimary,
              padding: EdgeInsets.symmetric(horizontal: isSmall ? 18 : 28, vertical: isSmall ? 12 : 18),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(isSmall ? 8 : 14)),
              textStyle: GoogleFonts.inter(fontSize: isSmall ? 14 : 16),
              elevation: 2,
            ),
          ),
        ),
      ],
    );

    return Stack(
      children: [
        RepaintBoundary(
          child: AnimatedBuilder(
            animation: _animationController,
            builder: (context, child) {
              for (var particle in _particles) {
                particle.update(Size(MediaQuery.of(context).size.width, isSmall ? 400 : 600));
              }
              return CustomPaint(
                size: Size(MediaQuery.of(context).size.width, isSmall ? 400 : 600),
                painter: ParticlesPainter(
                  particles: _particles,
                  isDark: true,
                ),
              );
            },
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(
            horizontal: isWideScreen ? 40 : (isSmall ? 6 : 12),
            vertical: isWideScreen ? 80 : (isSmall ? 18 : 40),
          ),
          child: content,
        ),
      ],
    );
  }

  Future<void> _launchUrl(String url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }

  Widget _buildProjectCard(
    BuildContext context,
    FeaturedProject project,
    int index,
    bool isDark,
    bool isWideScreen,
  ) {
    final colorScheme = Theme.of(context).colorScheme;
    final isMobile = MediaQuery.of(context).size.width <= 600;
    return MouseRegion(
      onEnter: (_) => setState(() => _hoveredIndex = index),
      onExit: (_) => setState(() => _hoveredIndex = -1),
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ProjectDetailsPage(project: project),
            ),
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Card(
            elevation: _hoveredIndex == index ? 12 : 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            clipBehavior: Clip.antiAlias,
            color: colorScheme.surface.withOpacity(isDark ? 0.7 : 0.95),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Lazy load image with placeholder
                SizedBox(
                  height: isWideScreen ? 180 : 160,
                  child: VisibilityDetector(
                    key: Key('project-image-$index'),
                    onVisibilityChanged: (info) {
                      if (info.visibleFraction > 0.1) {
                        setState(() {
                          // Mark as visible to trigger image load
                        });
                      }
                    },
                    child: Image.asset(
                      project.imageUrl,
                      fit: BoxFit.cover,
                      frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
                        if (wasSynchronouslyLoaded) return child;
                        return AnimatedSwitcher(
                          duration: const Duration(milliseconds: 300),
                          child: frame != null
                            ? child
                            : Container(
                                color: colorScheme.surface.withOpacity(0.7),
                                child: Center(
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(12),
                                    child: BackdropFilter(
                                      filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                                      child: SizedBox(
                                        width: 60,
                                        height: 60,
                                        child: CircularProgressIndicator(
                                          color: colorScheme.primary,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                        );
                      },
                      errorBuilder: (context, error, stackTrace) => Container(
                        color: colorScheme.surface.withOpacity(0.5),
                        child: const Center(child: Icon(Icons.broken_image, size: 40)),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: SizedBox(
                    height: (isWideScreen ? 180 : 160) + 140, // image height + estimated text/buttons
                    child: SingleChildScrollView(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            project.title,
                            style: GoogleFonts.inter(
                              fontSize: isWideScreen ? 22 : 18,
                              fontWeight: FontWeight.bold,
                              color: colorScheme.onSurface,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            project.description,
                            style: GoogleFonts.inter(
                              fontSize: isWideScreen ? 15 : 13,
                              color: colorScheme.onSurface.withOpacity(0.8),
                            ),
                            maxLines: 3,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 16),
                          Wrap(
                            spacing: 8,
                            runSpacing: 4,
                            children: project.technologies.map((tech) => Chip(
                              label: Text(tech, style: GoogleFonts.inter(fontSize: 12)),
                              backgroundColor: colorScheme.primary.withOpacity(0.08),
                              labelStyle: TextStyle(color: colorScheme.primary),
                            )).toList(),
                          ),
                          const SizedBox(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              if (project.demoUrl != null)
                                IconButton(
                                  onPressed: () => _launchUrl(project.demoUrl!),
                                  icon: const Icon(Icons.play_circle_outline),
                                  tooltip: 'Live Demo',
                                  color: colorScheme.primary,
                                ),
                              if (project.githubUrl != null)
                                IconButton(
                                  onPressed: () => _launchUrl(project.githubUrl!),
                                  icon: const Icon(FontAwesomeIcons.github),
                                  tooltip: 'View Code',
                                  color: colorScheme.primary,
                                ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildIconButton({
    required IconData icon,
    required String tooltip,
    required VoidCallback onPressed,
    required bool isDark,
  }) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Tooltip(
        message: tooltip,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(8),
          child: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: isDark 
                ? Colors.blue.shade900.withOpacity(0.2)
                : Colors.blue.shade50,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              icon,
              size: 20,
              color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTechChip(String tech, bool isDark, {bool isHovered = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 12,
        vertical: 6,
      ),
      decoration: BoxDecoration(
        color: isHovered
          ? (isDark ? Colors.blue.shade900 : Colors.blue.shade100)
          : (isDark ? Colors.blue.shade900.withOpacity(0.2) : Colors.blue.shade50),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark
            ? Colors.blue.shade200.withOpacity(0.3)
            : Colors.blue.shade100,
          width: 1,
        ),
      ),
      child: Text(
        tech,
        style: GoogleFonts.inter(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
        ),
      ),
    );
  }

  Widget _buildStat(BuildContext context, IconData icon, String value, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: isDark 
          ? Colors.grey.shade900.withOpacity(0.3)
          : Colors.grey.shade100,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: [
          FaIcon(
            icon,
            size: 14,
            color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
          ),
          const SizedBox(width: 6),
          Text(
            value,
            style: GoogleFonts.inter(
              fontSize: 14,
              color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryToggle(bool isDark) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isMobile = constraints.maxWidth <= 600;
        final buttonPadding = isMobile 
          ? const EdgeInsets.symmetric(horizontal: 12, vertical: 8)
          : const EdgeInsets.symmetric(horizontal: 20, vertical: 12);
        final fontSize = isMobile ? 12.0 : 14.0;
        final spacing = isMobile ? 6.0 : 12.0;
        final borderRadius = isMobile ? 8.0 : 12.0;
        
        return Padding(
          padding: EdgeInsets.symmetric(horizontal: isMobile ? 8 : 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: _showHardwareProjects
                        ? (isDark ? [Colors.blue.shade900, Colors.purple.shade900] : [Colors.blue.shade400, Colors.purple.shade400])
                        : [Colors.transparent, Colors.transparent],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(borderRadius),
                    border: Border.all(
                      color: _showHardwareProjects
                        ? (isDark ? Colors.blue.shade200 : Colors.blue.shade400)
                        : (isDark ? Colors.grey.shade700 : Colors.grey.shade300),
                      width: 1,
                    ),
                  ),
                  child: ElevatedButton(
                    onPressed: () => setState(() => _showHardwareProjects = true),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      foregroundColor: _showHardwareProjects
                        ? Colors.white
                        : (isDark ? Colors.grey.shade400 : Colors.grey.shade700),
                      shadowColor: Colors.transparent,
                      padding: buttonPadding,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(borderRadius),
                      ),
                    ),
                    child: Text(
                      'Hardware',
                      style: GoogleFonts.inter(
                        fontSize: fontSize,
                        fontWeight: _showHardwareProjects ? FontWeight.w600 : FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(width: spacing),
              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: !_showHardwareProjects
                        ? (isDark ? [Colors.blue.shade900, Colors.purple.shade900] : [Colors.blue.shade400, Colors.purple.shade400])
                        : [Colors.transparent, Colors.transparent],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(borderRadius),
                    border: Border.all(
                      color: !_showHardwareProjects
                        ? (isDark ? Colors.blue.shade200 : Colors.blue.shade400)
                        : (isDark ? Colors.grey.shade700 : Colors.grey.shade300),
                      width: 1,
                    ),
                  ),
                  child: ElevatedButton(
                    onPressed: () => setState(() => _showHardwareProjects = false),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      foregroundColor: !_showHardwareProjects
                        ? Colors.white
                        : (isDark ? Colors.grey.shade400 : Colors.grey.shade700),
                      shadowColor: Colors.transparent,
                      padding: buttonPadding,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(borderRadius),
                      ),
                    ),
                    child: Text(
                      'Software',
                      style: GoogleFonts.inter(
                        fontSize: fontSize,
                        fontWeight: !_showHardwareProjects ? FontWeight.w600 : FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildProjectGrid(List<FeaturedProject> projects, bool isDark) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWideScreen = constraints.maxWidth > 800;
        final isMobile = constraints.maxWidth <= 600;
        
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 12 : 16,
            vertical: 12,
          ),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 7,
            childAspectRatio: 0.7,
            mainAxisSpacing: isMobile ? 16 : 12,
            crossAxisSpacing: isMobile ? 0 : 12,
          ),
          itemCount: projects.length < 7 ? projects.length : 7,
          itemBuilder: (context, index) => _buildProjectCard(
            context,
            projects[index],
            index,
            isDark,
            isWideScreen,
          ),
        );
      },
    );
  }

  Widget _buildProjectCardHorizontal(
    BuildContext context,
    FeaturedProject project,
    int index,
    bool isDark,
    double cardWidth,
    double cardHeight,
    bool isSmall,
  ) {
    final colorScheme = Theme.of(context).colorScheme;
    final isHovered = _hoveredIndex == index;
    return MouseRegion(
      onEnter: (_) => setState(() => _hoveredIndex = index),
      onExit: (_) => setState(() => _hoveredIndex = -1),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeInOut,
        width: cardWidth,
        height: cardHeight,
        margin: EdgeInsets.symmetric(vertical: isSmall ? 2 : 4),
        decoration: BoxDecoration(
          color: colorScheme.surface.withOpacity(0.95),
          borderRadius: BorderRadius.circular(isSmall ? 12 : 22),
          boxShadow: [
            if (isHovered)
              BoxShadow(
                color: colorScheme.primary.withOpacity(0.18),
                blurRadius: 24,
                offset: Offset(0, 8),
              ),
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 12,
              offset: Offset(0, 4),
            ),
          ],
          border: Border.all(
            color: isHovered ? colorScheme.primary.withOpacity(0.18) : colorScheme.primary.withOpacity(0.08),
            width: 1.5,
          ),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(isSmall ? 12 : 22),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProjectDetailsPage(project: project),
                ),
              );
            },
            child: SizedBox(
              height: cardHeight,
              child: SingleChildScrollView(
                physics: NeverScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.vertical(top: Radius.circular(isSmall ? 12 : 22)),
                      child: Image.asset(
                        project.imageUrl,
                        height: cardHeight * 0.42,
                        width: cardWidth,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          height: cardHeight * 0.42,
                          color: colorScheme.surface.withOpacity(0.5),
                          child: const Center(child: Icon(Icons.broken_image, size: 40)),
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(isSmall ? 10 : 18, isSmall ? 8 : 14, isSmall ? 10 : 18, isSmall ? 4 : 8),
                      child: Text(
                        project.title,
                        style: GoogleFonts.inter(
                          fontSize: isSmall ? 15 : 18,
                          fontWeight: FontWeight.bold,
                          color: colorScheme.onSurface,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: isSmall ? 10 : 18),
                      child: Text(
                        project.description,
                        style: GoogleFonts.inter(
                          fontSize: isSmall ? 12 : 14,
                          color: colorScheme.onSurface.withOpacity(0.8),
                        ),
                        maxLines: isSmall ? 2 : 3,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(isSmall ? 10 : 18, isSmall ? 6 : 10, isSmall ? 10 : 18, 0),
                      child: Wrap(
                        spacing: isSmall ? 6 : 8,
                        runSpacing: 4,
                        children: project.technologies.take(isSmall ? 2 : 4).map((tech) => Chip(
                          label: Text(tech, style: GoogleFonts.inter(fontSize: isSmall ? 10 : 12)),
                          backgroundColor: colorScheme.primary.withOpacity(0.08),
                          labelStyle: TextStyle(color: colorScheme.primary),
                          padding: EdgeInsets.symmetric(horizontal: isSmall ? 6 : 8, vertical: 0),
                          visualDensity: VisualDensity.compact,
                        )).toList(),
                      ),
                    ),
                    SizedBox(height: isSmall ? 8 : 16),
                    Padding(
                      padding: EdgeInsets.fromLTRB(isSmall ? 10 : 18, 0, isSmall ? 10 : 18, isSmall ? 8 : 12),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          if (project.demoUrl != null)
                            IconButton(
                              onPressed: () => _launchUrl(project.demoUrl!),
                              icon: const Icon(Icons.play_circle_outline),
                              tooltip: 'Live Demo',
                              color: colorScheme.primary,
                              iconSize: isSmall ? 20 : 24,
                            ),
                          if (project.githubUrl != null)
                            IconButton(
                              onPressed: () => _launchUrl(project.githubUrl!),
                              icon: const Icon(FontAwesomeIcons.github),
                              tooltip: 'View Code',
                              color: colorScheme.primary,
                              iconSize: isSmall ? 20 : 24,
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class FeaturedProject {
  final String title;
  final String description;
  final String imageUrl;
  final String githubUrl;
  final String? demoUrl;
  final String? videoId;
  final String? facebookUrl;
  final String? instagramUrl;
  final String? websiteUrl;
  final List<String> technologies;
  final ProjectStats? stats;

  const FeaturedProject({
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.githubUrl,
    this.demoUrl,
    this.videoId,
    this.facebookUrl,
    this.instagramUrl,
    this.websiteUrl,
    required this.technologies,
    this.stats,
  });
}

class ProjectStats {
  final int stars;
  final int forks;

  const ProjectStats({
    required this.stars,
    required this.forks,
  });
}

final List<FeaturedProject> hardwareProjects = [
  FeaturedProject(
    title: 'OVIJAN v2 Rescue Robot',
    description: 'Advanced rescue robot designed for emergency response and fire incidents. Features real-time image processing, environmental sensors, GPS tracking, and a 3-DOF manipulator arm for efficient rescue operations.',
    technologies: ['Robotics', 'Image Processing', 'Sensors', 'GPS', 'Fire Detection'],
    githubUrl: 'https://github.com/Onnesok/ovijan-v2',
    imageUrl: 'assets/projects/ovijanv3.png',
    //videoId: 'dQw4w9WgXcQ',
    //facebookUrl: 'https://facebook.com/your_post',
    //instagramUrl: 'https://instagram.com/p/your_post',
    //websiteUrl: 'https://your-website.com/project',
  ),
  FeaturedProject(
    title: 'Bionic Arm',
    description: 'Advanced robotic hand designed for physically challenged individuals. Features precise motor control, sensory feedback, and intuitive user interface for natural movement.',
    technologies: ['Robotics', 'Arduino', 'Sensors', 'CAD'],
    githubUrl: 'https://github.com/Onnesok/bionic-arm',
    imageUrl: 'assets/projects/PI_1006.png',
  ),
  FeaturedProject(
    title: 'Axelia - Quadruped Robot',
    description: 'Four-legged robot with advanced terrain navigation capabilities. Implements dynamic gait control and real-time environment mapping for autonomous operation.',
    technologies: ['ROS', 'Python', 'Computer Vision', 'SLAM'],
    githubUrl: 'https://github.com/Onnesok/axelia',
    imageUrl: 'assets/projects/axelia.jpg',
  ),
  FeaturedProject(
    title: 'Pixi v2.0 Humanoid',
    description: 'Advanced humanoid robot with improved balance control and human-like movements. Features facial recognition, voice interaction, and autonomous navigation.',
    technologies: ['ROS', 'Python', 'AI', 'Robotics'],
    githubUrl: 'https://github.com/Onnesok/pixi-v2',
    imageUrl: 'assets/projects/pixi v2_humanoid robot.jpg',
  ),
  FeaturedProject(
    title: 'Pixi v1.0',
    description: 'First iteration of the humanoid robot project featuring basic movement control and sensor integration. Laid the foundation for advanced features in v2.0.',
    technologies: ['Arduino', 'Sensors', 'Robotics', 'CAD'],
    githubUrl: 'https://github.com/Onnesok/pixi-v1',
    imageUrl: 'assets/projects/pixi v1.jpg',
  ),
  FeaturedProject(
    title: 'Env cleaner',
    description: 'Env cleaner is a robot designed for cleaning the environment from trash and debris. It features a camera for object detection, a suction cup for picking up trash, and a motor for moving around. sensors for detecting co2, temperature, and humidity, O3, and many more.',
    technologies: ['AI', 'Flutter', 'IoT', 'Robotics'],
    githubUrl: 'https://github.com/Onnesok/env-cleaner',
    imageUrl: 'assets/projects/env.jpg',
  ),
  FeaturedProject(
    title: 'CO2 Reactor',
    description: 'Innovative reactor system for CO2 processing and environmental applications. Includes monitoring and control systems for efficient operation.',
    technologies: ['Chemical Engineering', 'IoT', 'Sensors'],
    githubUrl: 'https://github.com/Onnesok/co2-reactor',
    imageUrl: 'assets/projects/co2 reactor.png',
  ),
  FeaturedProject(
    title: 'Jol Torongo',
    description: 'Jol Torongo is a underwater robot designed for underwater exploration and mapping. It features a sonar system, depth sensor, and a camera for underwater exploration.',
    technologies: ['Robotics', 'Arduino', 'Sensors', 'CAD'],
    githubUrl: 'https://github.com/Onnesok/jol-torongo',
    imageUrl: 'assets/projects/auv.jpg',
  ),
  FeaturedProject(
    title: 'Theo Jansen Walker',
    description: 'Eight-legged walking mechanism based on Theo Jansen\'s design principles. Features innovative mechanical design and smooth locomotion.',
    technologies: ['Mechanical Design', 'CAD', 'Robotics'],
    githubUrl: 'https://github.com/Onnesok/theo-jansen',
    imageUrl: 'assets/projects/theojenson.jpg',
  ),
];

final List<FeaturedProject> softwareProjects = [
  FeaturedProject(
    title: 'Learners',
    description: 'A modern Learning Management System with AI-assisted learning, course enrollment, and seamless video integration. Features minimalistic design and intuitive interface.',
    technologies: ['Flutter', 'Dart', 'MySQL', 'AI'],
    githubUrl: 'https://github.com/Onnesok/Learners',
    imageUrl: 'assets/projects/learners app.png',
    stats: const ProjectStats(stars: 9, forks: 3),
  ),
  FeaturedProject(
    title: 'ROBU App',
    description: 'Official mobile application for BRAC University Robotics Club (ROBU). Features event management, member profiles, and project showcases.',
    technologies: ['Flutter', 'Firebase', 'Cloud Functions'],
    githubUrl: 'https://github.com/Onnesok/robu-app',
    imageUrl: 'assets/projects/robu app.png',
  ),
  FeaturedProject(
    title: 'Flappy Bird',
    description: 'A polished recreation of the classic Flappy Bird game using Flutter and Flame engine. Features smooth animations, engaging gameplay, and responsive controls.',
    technologies: ['Flutter', 'Flame', 'Game Dev'],
    githubUrl: 'https://github.com/Onnesok/flappy-bird',
    imageUrl: 'assets/projects/flappy bird.png',
    demoUrl: 'https://onnesok.github.io/flappy-bird',
    stats: const ProjectStats(stars: 5, forks: 0),
  ),
  FeaturedProject(
    title: 'Caarmate',
    description: 'Modern ride-sharing application with real-time tracking, secure payments, and user-friendly interface. Built for optimal user experience and reliability.',
    technologies: ['Flutter', 'Firebase', 'Maps API'],
    githubUrl: 'https://github.com/Onnesok/caarmate',
    imageUrl: 'assets/projects/caarmate.png',
  ),
  FeaturedProject(
    title: 'BUX Web App',
    description: 'Comprehensive web application for BRAC University students. Provides academic resources, course management, and campus services integration.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/Onnesok/bux-web',
    imageUrl: 'assets/projects/bux.jpg',
  ),
  FeaturedProject(
    title: 'Machine Vision App',
    description: 'Advanced computer vision application for robotics applications. Implements object detection, tracking, and environment mapping.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'ROS'],
    githubUrl: 'https://github.com/Onnesok/machine-vision-app',
    imageUrl: 'assets/projects/machine vision.jpg',
  ),
  FeaturedProject(
    title: 'Blinky',
    description: 'Human Robot Interaction project with a robot that blinks and talks to the user. It also has a face recognition system. shows emotions and gestures and many more',
    technologies: ['Flutter', 'Arduino', 'Bluetooth'],
    githubUrl: 'https://github.com/Onnesok/blinky',
    imageUrl: 'assets/projects/blinky.jpg',
  ),
  FeaturedProject(
    title: 'Hire Me',
    description: 'Hire Me is a job portal application that allows users to post jobs and search for jobs. It also has a chat system for communication between the employer and the employee. It can hire people for a specific task or a project.',
    technologies: ['Flutter', 'Mongodb', 'Nodejs', 'Express'],
    githubUrl: 'https://github.com/Onnesok/hire_me',
    imageUrl: 'assets/projects/hireme.png',
  ),
];

class Particle {
  Offset position;
  Offset velocity;
  double radius;

  Particle({
    required this.position,
    required this.velocity,
    required this.radius,
  });

  void update(Size size) {
    position = position + velocity;

    if (position.dx < 0) {
      position = Offset(size.width, position.dy);
    } else if (position.dx > size.width) {
      position = Offset(0, position.dy);
    }

    if (position.dy < 0) {
      position = Offset(position.dx, size.height);
    } else if (position.dy > size.height) {
      position = Offset(position.dx, 0);
    }
  }
}

class ParticlesPainter extends CustomPainter {
  final List<Particle> particles;
  final bool isDark;

  ParticlesPainter({required this.particles, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = isDark 
          ? Colors.white.withOpacity(0.08)
          : Colors.black.withOpacity(0.05)
      ..style = PaintingStyle.fill;

    for (var particle in particles) {
      canvas.drawCircle(
        particle.position, 
        isDark ? particle.radius * 1.5 : particle.radius,
        paint
      );

      // Draw connections between nearby particles
      for (var otherParticle in particles) {
        if (particle != otherParticle) {
          final distance = (particle.position - otherParticle.position).distance;
          if (distance < 150) {
            final linePaint = Paint()
              ..color = isDark
                  ? Colors.white.withOpacity(0.03 * (1 - distance / 150))
                  : Colors.black.withOpacity(0.02 * (1 - distance / 150))
              ..strokeWidth = 0.8;
            canvas.drawLine(particle.position, otherParticle.position, linePaint);
          }
        }
      }
    }
  }

  @override
  bool shouldRepaint(ParticlesPainter oldDelegate) => true;
} 