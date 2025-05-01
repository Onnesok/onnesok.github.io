import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:animate_do/animate_do.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:math' as math;
import 'dart:ui';
import '../pages/project_details_page.dart';

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
  final List<Particle> _particles = List.generate(
    50, // Reduced from 100 to 50 particles
    (index) => Particle(
      position: Offset(
        math.Random().nextDouble() * 2000,
        math.Random().nextDouble() * 1000,
      ),
      velocity: Offset(
        math.Random().nextDouble() * 1 - 0.5, // Reduced velocity
        math.Random().nextDouble() * 1 - 0.5, // Reduced velocity
      ),
      radius: math.Random().nextDouble() * 1.5 + 0.5, // Reduced size
    ),
  );

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(seconds: 6), // Increased duration for smoother animation
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isWideScreen = MediaQuery.of(context).size.width > 800;
    
    return Container(
      decoration: BoxDecoration(
        color: isDark 
          ? Colors.black.withOpacity(0.7)
          : Colors.grey[50]!.withOpacity(0.7),
      ),
      child: Stack(
        children: [
          // Animated Background with reduced update frequency
          Positioned.fill(
            child: AnimatedBuilder(
              animation: _animationController,
              builder: (context, child) {
                // Only update particles every other frame
                if (_animationController.value % 0.1 < 0.05) {
                  for (var particle in _particles) {
                    particle.update(MediaQuery.of(context).size);
                  }
                }
                return RepaintBoundary(
                  child: CustomPaint(
                    painter: ParticlesPainter(
                      particles: _particles,
                      isDark: isDark,
                    ),
                  ),
                );
              },
            ),
          ),
          // Content
          Container(
            padding: EdgeInsets.symmetric(
              horizontal: isWideScreen ? 40 : 20,
              vertical: isWideScreen ? 80 : 60,
            ),
            child: Column(
              children: [
                SlideInDown(
                  duration: const Duration(milliseconds: 800), // Reduced animation duration
                  child: Column(
                    children: [
                      Text(
                        'Featured Projects',
                        style: GoogleFonts.inter(
                          fontSize: isWideScreen ? 48 : 36,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : Colors.black87,
                          height: 1.1,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'A showcase of my best work in robotics and software development',
                        style: GoogleFonts.inter(
                          fontSize: isWideScreen ? 18 : 16,
                          color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
                          height: 1.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 60),
                _buildCategoryToggle(isDark),
                const SizedBox(height: 40),
                _buildProjectGrid(
                  _showHardwareProjects ? hardwareProjects : softwareProjects,
                  isDark,
                ),
                const SizedBox(height: 60),
                FadeInUp(
                  duration: const Duration(milliseconds: 800), // Reduced animation duration
                  child: Center(
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        final isMobile = constraints.maxWidth <= 600;
                        final buttonPadding = isMobile 
                          ? const EdgeInsets.symmetric(horizontal: 16, vertical: 12)
                          : const EdgeInsets.symmetric(horizontal: 24, vertical: 16);
                        final fontSize = isMobile ? 14.0 : 16.0;
                        final iconSize = isMobile ? 16.0 : 18.0;
                        final iconSpacing = isMobile ? 6.0 : 8.0;
                        
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
                            child: ElevatedButton(
                              onPressed: () => _launchUrl('https://github.com/Onnesok?tab=repositories'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                foregroundColor: Colors.white,
                                shadowColor: Colors.transparent,
                                padding: buttonPadding,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'View All Projects',
                                    style: GoogleFonts.inter(
                                      fontSize: fontSize,
                                      fontWeight: FontWeight.w600,
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                  SizedBox(width: iconSpacing),
                                  Icon(
                                    Icons.arrow_forward,
                                    size: iconSize,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
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
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          transform: Matrix4.identity()
            ..setEntry(3, 2, 0.001)
            ..rotateX(_hoveredIndex == index ? -0.05 : 0)
            ..rotateY(_hoveredIndex == index ? 0.05 : 0)
            ..translate(0.0, _hoveredIndex == index ? -8.0 : 0.0, 0.0),
          child: Container(
            constraints: BoxConstraints(
              maxHeight: isMobile ? 180 : 140,
              minHeight: isMobile ? 160 : 120,
            ),
            decoration: BoxDecoration(
              color: isDark ? Colors.grey[900] : Colors.white,
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: isDark ? Colors.black.withOpacity(0.3) : Colors.grey.withOpacity(0.2),
                  blurRadius: _hoveredIndex == index ? 16 : 8,
                  offset: Offset(0, _hoveredIndex == index ? 8 : 4),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Stack(
                children: [
                  // Background Image
                  Positioned.fill(
                    child: Image.asset(
                      project.imageUrl,
                      fit: BoxFit.cover,
                      alignment: Alignment.center,
                      frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
                        if (wasSynchronouslyLoaded) return child;
                        return AnimatedSwitcher(
                          duration: const Duration(milliseconds: 300),
                          child: frame != null
                            ? child
                            : Container(
                                color: isDark 
                                  ? Colors.grey[900]
                                  : Colors.grey[100],
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: isDark 
                                      ? Colors.blue.shade200 
                                      : Colors.blue.shade900,
                                  ),
                                ),
                              ),
                        );
                      },
                      errorBuilder: (context, error, stackTrace) => Container(
                        color: isDark 
                          ? Color.fromARGB(255, 28, 28, 28)
                          : Color.fromARGB(255, 240, 240, 240),
                        child: Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.broken_image, 
                                size: 24,
                                color: isDark ? Colors.white38 : Colors.black38,
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Image not available',
                                style: TextStyle(
                                  color: isDark ? Colors.white38 : Colors.black38,
                                  fontSize: 10,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  // Gradient Overlay
                  Positioned.fill(
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            isDark 
                              ? Colors.black.withOpacity(0.7)
                              : Colors.black.withOpacity(0.5),
                            isDark 
                              ? Colors.black.withOpacity(0.9)
                              : Colors.black.withOpacity(0.7),
                          ],
                        ),
                      ),
                    ),
                  ),
                  // Content
                  Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          project.title,
                          style: GoogleFonts.inter(
                            fontSize: isMobile ? 14 : 12,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            height: 1.2,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          project.description,
                          style: GoogleFonts.inter(
                            fontSize: isMobile ? 11 : 9,
                            color: Colors.white.withOpacity(0.8),
                            height: 1.2,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const Spacer(),
                        if (isMobile)
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              if (project.demoUrl != null) ...[
                                SizedBox(
                                  height: 24,
                                  child: TextButton.icon(
                                    onPressed: () => _launchUrl(project.demoUrl!),
                                    icon: const Icon(Icons.play_circle_outline, size: 12),
                                    label: Text(
                                      'Demo',
                                      style: TextStyle(
                                        fontSize: 10,
                                      ),
                                    ),
                                    style: TextButton.styleFrom(
                                      foregroundColor: Colors.white.withOpacity(0.9),
                                      minimumSize: Size.zero,
                                      padding: const EdgeInsets.symmetric(horizontal: 8),
                                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                              ],
                              if (project.githubUrl != null)
                                SizedBox(
                                  height: 24,
                                  child: TextButton.icon(
                                    onPressed: () => _launchUrl(project.githubUrl!),
                                    icon: const Icon(FontAwesomeIcons.github, size: 10),
                                    label: Text(
                                      'Code',
                                      style: TextStyle(
                                        fontSize: 10,
                                      ),
                                    ),
                                    style: TextButton.styleFrom(
                                      foregroundColor: Colors.white.withOpacity(0.9),
                                      minimumSize: Size.zero,
                                      padding: const EdgeInsets.symmetric(horizontal: 8),
                                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                    ),
                                  ),
                                ),
                            ],
                          )
                        else
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              if (project.demoUrl != null) ...[
                                IconButton(
                                  onPressed: () => _launchUrl(project.demoUrl!),
                                  icon: const Icon(Icons.play_circle_outline, size: 12),
                                  tooltip: 'Live Demo',
                                  color: Colors.white.withOpacity(0.9),
                                  padding: EdgeInsets.zero,
                                  constraints: const BoxConstraints(
                                    minWidth: 24,
                                    minHeight: 24,
                                  ),
                                ),
                                const SizedBox(width: 8),
                              ],
                              if (project.githubUrl != null)
                                IconButton(
                                  onPressed: () => _launchUrl(project.githubUrl!),
                                  icon: const Icon(FontAwesomeIcons.github, size: 10),
                                  tooltip: 'View Code',
                                  color: Colors.white.withOpacity(0.9),
                                  padding: EdgeInsets.zero,
                                  constraints: const BoxConstraints(
                                    minWidth: 24,
                                    minHeight: 24,
                                  ),
                                ),
                            ],
                          ),
                      ],
                    ),
                  ),
                  // Hover Overlay
                  if (_hoveredIndex == index)
                    Positioned.fill(
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.blue.withOpacity(0.2),
                              Colors.purple.withOpacity(0.2),
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
            crossAxisCount: isMobile ? 1 : (isWideScreen ? 4 : 2),
            childAspectRatio: isMobile ? 1.8 : (isWideScreen ? 1.4 : 1.2),
            mainAxisSpacing: isMobile ? 16 : 12,
            crossAxisSpacing: isMobile ? 0 : 12,
          ),
          itemCount: projects.length,
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