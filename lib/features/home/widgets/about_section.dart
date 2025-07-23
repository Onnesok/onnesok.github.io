import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:math' as math;
import 'dart:ui';
import 'package:portfolio/features/home/widgets/projects_section.dart' show Particle, ParticlesPainter;

class AboutSection extends StatefulWidget {
  const AboutSection({super.key});

  @override
  State<AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection> with TickerProviderStateMixin {
  late AnimationController _shimmerController;
  late Animation<double> _shimmerAnimation;
  late AnimationController _backgroundController;
  late Animation<double> _backgroundAnimation;
  final List<Particle> _particles = List.generate(
    6,
    (index) => Particle(
      position: Offset(
        math.Random().nextDouble() * 1000,
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
    
    // Shimmer animation for steel-like effect
    _shimmerController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );
    
    _shimmerAnimation = Tween<double>(begin: -1.0, end: 2.0).animate(
      CurvedAnimation(
        parent: _shimmerController,
        curve: Curves.easeInOut,
      ),
    );
    
    // Start animation
    _shimmerController.repeat();

    _backgroundController = AnimationController(
      duration: const Duration(seconds: 18), // Slower for performance
      vsync: this,
    )..repeat();
    _backgroundAnimation = Tween<double>(
      begin: 0,
      end: 2 * math.pi,
    ).animate(_backgroundController);
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isWideScreen = MediaQuery.of(context).size.width > 800;
    final isSmall = MediaQuery.of(context).size.width < 600;
    final content = isWideScreen
        ? _buildWideLayout(context, colorScheme)
        : _buildNarrowLayout(context, colorScheme);

    return Stack(
      children: [
        RepaintBoundary(
          child: AnimatedBuilder(
            animation: _backgroundAnimation,
            builder: (context, child) {
              for (var particle in _particles) {
                particle.update(Size(MediaQuery.of(context).size.width, 800));
              }
              return CustomPaint(
                size: Size(MediaQuery.of(context).size.width, 800),
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
            horizontal: isWideScreen ? 40 : 20,
            vertical: isWideScreen ? 40 : 20,
          ),
          child: isSmall
              ? SingleChildScrollView(child: content)
              : content,
        ),
      ],
    );
  }

  Widget _buildWideLayout(BuildContext context, ColorScheme colorScheme) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 5,
          child: _buildContent(context, colorScheme),
        ),
        const SizedBox(width: 60),
        Expanded(
          flex: 4,
          child: _buildSkillsSection(context, colorScheme),
        ),
      ],
    );
  }

  Widget _buildNarrowLayout(BuildContext context, ColorScheme colorScheme) {
    return Column(
      children: [
        _buildContent(context, colorScheme),
        const SizedBox(height: 40),
        _buildSkillsSection(context, colorScheme),
      ],
    );
  }

  Widget _buildContent(BuildContext context, ColorScheme colorScheme) {
    return Card(
      color: colorScheme.surface,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'About Me',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: colorScheme.primary,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'I am a passionate developer and robotics enthusiast with a strong foundation in both software development and hardware integration. My journey in technology began with a curiosity about how things work, which led me to explore various aspects of computer science and robotics.',
              style: TextStyle(
                fontSize: 16,
                color: colorScheme.onSurface.withOpacity(0.85),
                height: 1.6,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Currently, I focus on:',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: colorScheme.primary,
              ),
            ),
            const SizedBox(height: 16),
            _buildFocusArea(context, colorScheme, FontAwesomeIcons.mobile, 'Mobile Development', 'Creating intuitive and responsive mobile applications using Flutter and native technologies.'),
            const SizedBox(height: 16),
            _buildFocusArea(context, colorScheme, FontAwesomeIcons.robot, 'Robotics', 'Developing autonomous systems and working on robotics projects that combine hardware and software.'),
            const SizedBox(height: 16),
            _buildFocusArea(context, colorScheme, FontAwesomeIcons.code, 'Web Development', 'Building modern web applications with a focus on performance and user experience.'),
          ],
        ),
      ),
    );
  }

  Widget _buildFocusArea(BuildContext context, ColorScheme colorScheme, IconData icon, String title, String description) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: colorScheme.surface.withOpacity(0.9),
        border: Border.all(
          color: colorScheme.primary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 24,
            color: colorScheme.primary,
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: colorScheme.primary,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 14,
                    color: colorScheme.onSurface.withOpacity(0.8),
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSkillsSection(BuildContext context, ColorScheme colorScheme) {
    return Card(
      color: colorScheme.surface,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Skills & Technologies',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: colorScheme.primary,
              ),
            ),
            const SizedBox(height: 20),
            _buildSkillCategory(
              context,
              colorScheme,
              'Programming Languages',
              ['Python', 'C/C++', 'JavaScript', 'MicroPython', 'HTML/CSS'],
            ),
            const SizedBox(height: 20),
            _buildSkillCategory(
              context,
              colorScheme,
              'Hardware & Design',
              ['Robotics', 'Circuit Design', '3D Modeling', 'Mechanical Design', 'Embedded Systems'],
            ),
            const SizedBox(height: 20),
            _buildSkillCategory(
              context,
              colorScheme,
              'Software & Systems',
              ['Linux Ecosystem', 'Cloud Computing', 'Server Administration', 'Cybersecurity', 'Version Control'],
            ),
            const SizedBox(height: 20),
            _buildSkillCategory(
              context,
              colorScheme,
              'Other Skills',
              ['Problem Solving', 'Project Management', 'Technical Writing', 'Team Leadership', 'Research'],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillCategory(BuildContext context, ColorScheme colorScheme, String title, List<String> skills) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: colorScheme.primary,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: skills.map((skill) => _buildSkillChip(context, colorScheme, skill)).toList(),
        ),
      ],
    );
  }

  Widget _buildSkillChip(BuildContext context, ColorScheme colorScheme, String skill) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: colorScheme.surface.withOpacity(0.9),
        border: Border.all(
          color: colorScheme.primary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Text(
        skill,
        style: TextStyle(
          fontSize: 14,
          color: colorScheme.onSurface.withOpacity(0.8),
        ),
      ),
    );
  }
} 