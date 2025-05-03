import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:math' as math;

class AboutSection extends StatefulWidget {
  const AboutSection({super.key});

  @override
  State<AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection> with TickerProviderStateMixin {
  late AnimationController _shimmerController;
  late Animation<double> _shimmerAnimation;

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
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final screenSize = MediaQuery.of(context).size;
    final isWideScreen = screenSize.width > 800;

    return Container(
      decoration: BoxDecoration(
        color: isDark ? Colors.black : Colors.white,
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
      child: Column(
        children: [
          Container(
            height: 200,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: isDark 
                  ? [Colors.black87, Colors.black]
                  : [Colors.white, Colors.grey[50]!],
              ),
            ),
            child: AnimatedBuilder(
              animation: _shimmerAnimation,
              builder: (context, child) {
                return ShaderMask(
                  shaderCallback: (bounds) => LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    stops: [
                      0.0,
                      _shimmerAnimation.value - 0.5,
                      _shimmerAnimation.value,
                      _shimmerAnimation.value + 0.5,
                      1.0,
                    ],
                    colors: isDark ? [
                      Colors.grey[400]!,
                      Colors.grey[300]!,
                      Colors.white,
                      Colors.grey[300]!,
                      Colors.grey[400]!,
                    ] : [
                      Colors.grey[700]!,
                      Colors.grey[900]!,
                      Colors.black,
                      Colors.grey[900]!,
                      Colors.grey[700]!,
                    ],
                  ).createShader(bounds),
                  child: Text(
                    'About Me',
                    style: TextStyle(
                      fontSize: isWideScreen ? 40 : 32,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : Colors.black,
                    ),
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
            child: isWideScreen
                ? _buildWideLayout(context, isDark)
                : _buildNarrowLayout(context, isDark),
          ),
        ],
      ),
    );
  }

  Widget _buildWideLayout(BuildContext context, bool isDark) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 5,
          child: _buildContent(context, isDark),
        ),
        const SizedBox(width: 60),
        Expanded(
          flex: 4,
          child: _buildSkillsSection(context, isDark),
        ),
      ],
    );
  }

  Widget _buildNarrowLayout(BuildContext context, bool isDark) {
    return Column(
      children: [
        _buildContent(context, isDark),
        const SizedBox(height: 40),
        _buildSkillsSection(context, isDark),
      ],
    );
  }

  Widget _buildContent(BuildContext context, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AnimatedBuilder(
          animation: _shimmerAnimation,
          builder: (context, child) {
            return ShaderMask(
              shaderCallback: (bounds) => LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                stops: [
                  0.0,
                  _shimmerAnimation.value - 0.5,
                  _shimmerAnimation.value,
                  _shimmerAnimation.value + 0.5,
                  1.0,
                ],
                colors: isDark ? [
                  Colors.blue[400]!,
                  Colors.blue[300]!,
                  Colors.white,
                  Colors.blue[300]!,
                  Colors.blue[400]!,
                ] : [
                  Colors.blue[700]!,
                  Colors.blue[900]!,
                  Colors.black,
                  Colors.blue[900]!,
                  Colors.blue[700]!,
                ],
              ).createShader(bounds),
              child: Text(
                'Who am I?',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : Colors.black,
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 20),
        Text(
          'I am a passionate developer and robotics enthusiast with a strong foundation in both software development and hardware integration. My journey in technology began with a curiosity about how things work, which led me to explore various aspects of computer science and robotics.',
          style: TextStyle(
            fontSize: 16,
            color: isDark ? Colors.grey[300] : Colors.grey[800],
            height: 1.6,
          ),
        ),
        const SizedBox(height: 20),
        Text(
          'Currently, I focus on:',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : Colors.black,
          ),
        ),
        const SizedBox(height: 16),
        _buildFocusArea(
          context,
          isDark,
          FontAwesomeIcons.mobile,
          'Mobile Development',
          'Creating intuitive and responsive mobile applications using Flutter and native technologies.',
        ),
        const SizedBox(height: 16),
        _buildFocusArea(
          context,
          isDark,
          FontAwesomeIcons.robot,
          'Robotics',
          'Developing autonomous systems and working on robotics projects that combine hardware and software.',
        ),
        const SizedBox(height: 16),
        _buildFocusArea(
          context,
          isDark,
          FontAwesomeIcons.code,
          'Web Development',
          'Building modern web applications with a focus on performance and user experience.',
        ),
      ],
    );
  }

  Widget _buildFocusArea(BuildContext context, bool isDark, IconData icon, String title, String description) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: isDark ? Colors.grey[900]!.withOpacity(0.3) : Colors.grey[100]!,
        border: Border.all(
          color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
          width: 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 24,
            color: Theme.of(context).colorScheme.primary,
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
                    color: isDark ? Colors.white : Colors.black,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 14,
                    color: isDark ? Colors.grey[400] : Colors.grey[600],
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

  Widget _buildSkillsSection(BuildContext context, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AnimatedBuilder(
          animation: _shimmerAnimation,
          builder: (context, child) {
            return ShaderMask(
              shaderCallback: (bounds) => LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                stops: [
                  0.0,
                  _shimmerAnimation.value - 0.5,
                  _shimmerAnimation.value,
                  _shimmerAnimation.value + 0.5,
                  1.0,
                ],
                colors: isDark ? [
                  Colors.purple[400]!,
                  Colors.purple[300]!,
                  Colors.white,
                  Colors.purple[300]!,
                  Colors.purple[400]!,
                ] : [
                  Colors.purple[700]!,
                  Colors.purple[900]!,
                  Colors.black,
                  Colors.purple[900]!,
                  Colors.purple[700]!,
                ],
              ).createShader(bounds),
              child: Text(
                'Skills & Technologies',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : Colors.black,
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 20),
        _buildSkillCategory(
          context,
          isDark,
          'Programming Languages',
          ['Python', 'C/C++', 'JavaScript', 'MicroPython', 'HTML/CSS'],
        ),
        const SizedBox(height: 20),
        _buildSkillCategory(
          context,
          isDark,
          'Hardware & Design',
          ['Robotics', 'Circuit Design', '3D Modeling', 'Mechanical Design', 'Embedded Systems'],
        ),
        const SizedBox(height: 20),
        _buildSkillCategory(
          context,
          isDark,
          'Software & Systems',
          ['Linux Ecosystem', 'Cloud Computing', 'Server Administration', 'Cybersecurity', 'Version Control'],
        ),
        const SizedBox(height: 20),
        _buildSkillCategory(
          context,
          isDark,
          'Other Skills',
          ['Problem Solving', 'Project Management', 'Technical Writing', 'Team Leadership', 'Research'],
        ),
      ],
    );
  }

  Widget _buildSkillCategory(BuildContext context, bool isDark, String title, List<String> skills) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : Colors.black,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: skills.map((skill) => _buildSkillChip(context, isDark, skill)).toList(),
        ),
      ],
    );
  }

  Widget _buildSkillChip(BuildContext context, bool isDark, String skill) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: isDark ? Colors.grey[900]!.withOpacity(0.3) : Colors.grey[100]!,
        border: Border.all(
          color: isDark ? Colors.grey[800]! : Colors.grey[300]!,
          width: 1,
        ),
      ),
      child: Text(
        skill,
        style: TextStyle(
          fontSize: 14,
          color: isDark ? Colors.grey[300] : Colors.grey[800],
        ),
      ),
    );
  }
} 