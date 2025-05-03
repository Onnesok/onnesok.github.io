import 'dart:math';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:portfolio/features/shared/utils/theme_provider.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter/rendering.dart';

class Header extends StatefulWidget {
  final VoidCallback onViewWorkPressed;
  final VoidCallback onContactPressed;

  const Header({
    super.key,
    required this.onViewWorkPressed,
    required this.onContactPressed,
  });

  @override
  State<Header> createState() => _HeaderState();
}

class _HeaderState extends State<Header> with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late Animation<double> _backgroundAnimation;
  late AnimationController _flickerController;
  bool _animationsStarted = false;
  final List<Particle> _particles = List.generate(
    50,
    (index) => Particle(
      position: Offset(
        Random().nextDouble() * 1000,
        Random().nextDouble() * 500,
      ),
      velocity: Offset(
        Random().nextDouble() * 1 - 0.5,
        Random().nextDouble() * 1 - 0.5,
      ),
      radius: Random().nextDouble() * 1.5 + 0.5,
    ),
  );

  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    )..repeat();

    _backgroundAnimation = Tween<double>(
      begin: 0,
      end: 2 * pi,
    ).animate(_backgroundController);

    _flickerController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() {
          _animationsStarted = true;
        });
        _flickerController.forward(from: 0);
      }
    });
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    _scrollController.dispose();
    _flickerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;
    final isSmall = screenWidth < 600;

    return Stack(
      children: [
        Positioned.fill(
          child: _buildAnimatedBackground(screenWidth, screenHeight, isDark),
        ),
        Positioned.fill(
          child: _buildGradientOverlay(isDark),
        ),
        Center(
          child: Container(
            constraints: BoxConstraints(
              maxWidth: 1200,
            ),
            padding: EdgeInsets.symmetric(
              horizontal: isSmall ? 20 : screenWidth * 0.06,
              vertical: 40,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: isSmall ? double.infinity : screenWidth * 0.6,
                  child: Column(
                    crossAxisAlignment: isSmall ? CrossAxisAlignment.center : CrossAxisAlignment.start,
                    children: [
                      _buildProfileSection(context, isDark, isSmall),
                      const SizedBox(height: 40),
                      _buildNameSection(context, isDark, isSmall),
                      const SizedBox(height: 24),
                      _buildSocialIcons(isDark, isSmall),
                      const SizedBox(height: 32),
                      // Typewriter effect before buttons
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: _animationsStarted ? Container(
                            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(18),
                              border: Border.all(
                                width: 2,
                                color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
                              ),
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  Theme.of(context).colorScheme.surface.withOpacity(0.7),
                                  Theme.of(context).colorScheme.background.withOpacity(0.5),
                                ],
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.08),
                                  blurRadius: 16,
                                  offset: Offset(0, 8),
                                ),
                              ],
                            ),
                            child: ShaderMask(
                              shaderCallback: (bounds) => LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  Theme.of(context).colorScheme.primary,
                                  Theme.of(context).colorScheme.secondary,
                                ],
                              ).createShader(bounds),
                              child: AnimatedTextKit(
                                animatedTexts: [
                                  TypewriterAnimatedText(
                                    'Robotics enthusiast',
                                    textStyle: TextStyle(
                                      fontSize: isSmall ? 22 : 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      shadows: [
                                        Shadow(
                                          blurRadius: 8,
                                          color: Colors.black.withOpacity(0.25),
                                          offset: Offset(2, 4),
                                        ),
                                      ],
                                    ),
                                    speed: Duration(milliseconds: 80),
                                  ),
                                  TypewriterAnimatedText(
                                    'Full stack developer',
                                    textStyle: TextStyle(
                                      fontSize: isSmall ? 22 : 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      shadows: [
                                        Shadow(
                                          blurRadius: 8,
                                          color: Colors.black.withOpacity(0.25),
                                          offset: Offset(2, 4),
                                        ),
                                      ],
                                    ),
                                    speed: Duration(milliseconds: 80),
                                  ),
                                  TypewriterAnimatedText(
                                    'UI/UX designer',
                                    textStyle: TextStyle(
                                      fontSize: isSmall ? 22 : 28,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      shadows: [
                                        Shadow(
                                          blurRadius: 8,
                                          color: Colors.black.withOpacity(0.25),
                                          offset: Offset(2, 4),
                                        ),
                                      ],
                                    ),
                                    speed: Duration(milliseconds: 80),
                                  ),
                                ],
                                repeatForever: true,
                                pause: Duration(milliseconds: 1200),
                                displayFullTextOnTap: true,
                                stopPauseOnTap: true,
                              ),
                            ),
                          ) : SizedBox.shrink(),
                        ),
                      ),
                      const SizedBox(height: 24),
                      _buildButtons(context, isDark, isSmall),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAnimatedBackground(double width, double height, bool isDark) {
    return Positioned.fill(
      child: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          for (var particle in _particles) {
            particle.update(Size(width, height));
          }
          return CustomPaint(
            size: Size(width, height),
            painter: ParticlesPainter(
              particles: _particles,
              isDark: isDark,
            ),
          );
        },
      ),
    );
  }

  Widget _buildGradientOverlay(bool isDark) {
    return Positioned.fill(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: isDark 
              ? [
                  Colors.black.withOpacity(0.8),
                  Colors.blue.shade900.withOpacity(0.1),
                  Colors.purple.shade900.withOpacity(0.1),
                ]
              : [
                  Colors.white.withOpacity(0.8),
                  Colors.blue.shade100.withOpacity(0.1),
                  Colors.purple.shade100.withOpacity(0.1),
                ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfileSection(BuildContext context, bool isDark, bool isSmall) {
    return Column(
      crossAxisAlignment: isSmall ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      children: [
        _buildProfileImage(context),
        const SizedBox(height: 24),
        Text(
          'Hello, I\'m',
          style: GoogleFonts.inter(
            fontSize: isSmall ? 28 : 32,
            color: Theme.of(context).colorScheme.primary,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
            height: 1.2,
          ),
          textAlign: isSmall ? TextAlign.center : TextAlign.start,
        ),
      ],
    );
  }

  Widget _buildProfileImage(BuildContext context) {
    return Container(
      width: 120,
      height: 120,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
          width: 3,
        ),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).colorScheme.primary.withOpacity(0.2),
            blurRadius: 25,
            spreadRadius: 8,
          ),
        ],
      ),
      child: ClipOval(
        child: Stack(
          children: [
            Image.network(
              'https://avatars.githubusercontent.com/u/66786636?v=4',
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                  child: Icon(
                    Icons.person,
                    size: 60,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                );
              },
            ),
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.blue.withOpacity(0.2),
                    Colors.purple.withOpacity(0.2),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNameSection(BuildContext context, bool isDark, bool isSmall) {
    return Column(
      crossAxisAlignment: isSmall ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      children: [
        _buildAnimatedName(context, isDark, isSmall),
        const SizedBox(height: 16),
        _buildAnimatedRole(context, isDark, isSmall),
      ],
    );
  }

  Widget _buildAnimatedName(BuildContext context, bool isDark, bool isSmall) {
    return ShaderMask(
      shaderCallback: (bounds) => LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          Theme.of(context).colorScheme.primary,
          Theme.of(context).colorScheme.secondary,
        ],
      ).createShader(bounds),
      child: DefaultTextStyle(
        style: GoogleFonts.inter(
          fontSize: isSmall ? 36 : 52,
          fontWeight: FontWeight.bold,
          color: Colors.white,
          height: 1.1,
        ),
        child: AnimatedTextKit(
          animatedTexts: [
            WavyAnimatedText(
              'Ratul Hasan',
              speed: Duration(milliseconds: 200),
            ),
          ],
          totalRepeatCount: 2,
          displayFullTextOnTap: true,
          stopPauseOnTap: true,
        ),
      ),
    );
  }

  Widget _buildAnimatedRole(BuildContext context, bool isDark, bool isSmall) {
    final fontSize = isSmall ? 14.0 : 18.0;
    return _animationsStarted
        ? Padding(
            padding: const EdgeInsets.only(top: 8, bottom: 8),
            child: Align(
              alignment: Alignment.centerLeft,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: ShaderMask(
                  shaderCallback: (bounds) => LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Colors.blueAccent,
                      Colors.purpleAccent,
                    ],
                  ).createShader(bounds),
                  child: AnimatedTextKit(
                    animatedTexts: [
                      TypewriterAnimatedText(
                        '</ Robotics Enthusiast & Dreamer />',
                        textStyle: GoogleFonts.montserrat(
                          fontSize: fontSize - 4,
                          fontWeight: FontWeight.normal,
                          letterSpacing: 0.7,
                          color: Colors.white,
                          shadows: [],
                        ),
                        speed: Duration(milliseconds: 60),
                      ),
                    ],
                    isRepeatingAnimation: false,
                  ),
                ),
              ),
            ),
          )
        : SizedBox.shrink();
  }

  Widget _buildSocialIcons(bool isDark, bool isSmall) {
    return Container(
      padding: EdgeInsets.only(
        left: isSmall ? 0 : 0,
      ),
      child: Row(
        mainAxisAlignment: isSmall ? MainAxisAlignment.center : MainAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          _socialIconButton(
            FontAwesomeIcons.github,
            'https://github.com/Onnesok',
            isDark,
            'GitHub',
          ),
          SizedBox(width: 16),
          _socialIconButton(
            FontAwesomeIcons.linkedin,
            'https://www.linkedin.com/in/ratul-hasan-45911b245/',
            isDark,
            'LinkedIn',
          ),
          SizedBox(width: 16),
          _socialIconButton(
            FontAwesomeIcons.instagram,
            'https://www.instagram.com/ratul.hasan.404',
            isDark,
            'Instagram',
          ),
          SizedBox(width: 16),
          _socialIconButton(
            FontAwesomeIcons.solidEnvelope,
            'mailto:ratul.hasan@g.bracu.ac.bd',
            isDark,
            'Email',
          ),
        ],
      ),
    );
  }

  Widget _buildButtons(BuildContext context, bool isDark, bool isSmall) {
    final buttons = [
      _buildButton(
        onPressed: widget.onViewWorkPressed,
        text: 'View My Work',
        icon: Icons.arrow_forward,
        isPrimary: true,
        isDark: isDark,
        context: context,
      ),
      SizedBox(width: isSmall ? 0 : 16, height: isSmall ? 12 : 0),
      _buildButton(
        onPressed: widget.onContactPressed,
        text: 'Contact Me',
        icon: Icons.mail_outline,
        isPrimary: false,
        isDark: isDark,
        context: context,
      ),
    ];

    return Container(
      padding: EdgeInsets.only(
        left: isSmall ? 0 : 0,
      ),
      child: isSmall
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: buttons,
            )
          : Row(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: buttons,
            ),
    );
  }

  Widget _buildButton({
    required VoidCallback onPressed,
    required String text,
    required IconData icon,
    required bool isPrimary,
    required bool isDark,
    required BuildContext context,
  }) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.3),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          boxShadow: isPrimary ? [
            BoxShadow(
              color: Theme.of(context).colorScheme.primary.withOpacity(0.3),
              blurRadius: 12,
              offset: Offset(0, 4),
            ),
          ] : null,
          border: !isPrimary ? Border.all(
            color: isDark ? Colors.grey[700]! : Colors.grey[300]!,
            width: 1,
          ) : null,
        ),
        child: isPrimary
            ? ElevatedButton(
                onPressed: onPressed,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  textStyle: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(text),
                    SizedBox(width: 8),
                    Icon(icon, size: 18),
                  ],
                ),
              )
            : TextButton(
                onPressed: onPressed,
                style: TextButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  textStyle: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(text),
                    SizedBox(width: 8),
                    Icon(icon, size: 18),
                  ],
                ),
              ),
      ),
    );
  }

  Widget _socialIconButton(IconData icon, String url, bool isDark, String tooltip) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Tooltip(
        message: tooltip,
        child: InkWell(
          onTap: () async {
            final uri = Uri.parse(url);
            if (await canLaunchUrl(uri)) {
              await launchUrl(uri, mode: LaunchMode.externalApplication);
            }
          },
          borderRadius: BorderRadius.circular(8),
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isDark ? Colors.blue.shade900.withOpacity(0.2) : Colors.blue.shade50,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              icon,
              size: 22,
              color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
            ),
          ),
        ),
      ),
    );
  }
}

class Particle {
  Offset position;
  Offset velocity;
  final double radius;

  Particle({
    required this.position,
    required this.velocity,
    required this.radius,
  });

  void update(Size size) {
    if (size.width <= 0 || size.height <= 0) return; // Skip update if size is invalid

    position += velocity;

    // Bounce off edges with size check
    if (position.dx < 0 || position.dx > size.width) {
      velocity = Offset(-velocity.dx, velocity.dy);
      position = Offset(
        position.dx < 0 ? 0 : size.width,
        position.dy,
      );
    }
    if (position.dy < 0 || position.dy > size.height) {
      velocity = Offset(velocity.dx, -velocity.dy);
      position = Offset(
        position.dx,
        position.dy < 0 ? 0 : size.height,
      );
    }
  }
}

class ParticlesPainter extends CustomPainter {
  final List<Particle> particles;
  final bool isDark;

  ParticlesPainter({required this.particles, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    if (size.width <= 0 || size.height <= 0) return; // Skip painting if size is invalid

    final paint = Paint()
      ..color = (isDark ? Colors.white : Colors.black).withOpacity(0.1)
      ..style = PaintingStyle.fill;

    // Draw particles
    for (var particle in particles) {
      if (particle.position.dx >= 0 && 
          particle.position.dx <= size.width &&
          particle.position.dy >= 0 && 
          particle.position.dy <= size.height) {
        canvas.drawCircle(particle.position, particle.radius, paint);
      }
    }

    // Draw connections with bounds checking
    paint.strokeWidth = 0.5;
    paint.style = PaintingStyle.stroke;

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        if (particles[i].position.dx >= 0 && 
            particles[i].position.dx <= size.width &&
            particles[i].position.dy >= 0 && 
            particles[i].position.dy <= size.height &&
            particles[j].position.dx >= 0 && 
            particles[j].position.dx <= size.width &&
            particles[j].position.dy >= 0 && 
            particles[j].position.dy <= size.height) {
          final distance = (particles[i].position - particles[j].position).distance;
          if (distance < 100) {
            paint.color = (isDark ? Colors.white : Colors.black)
                .withOpacity((1 - distance / 100) * 0.2);
            canvas.drawLine(particles[i].position, particles[j].position, paint);
          }
        }
      }
    }

    // Draw gradient overlay
    final gradient = RadialGradient(
      center: Alignment.topRight,
      radius: 1.8,
      colors: [
        (isDark ? Color(0xFF0070F3) : Color(0xFF0070F3)).withOpacity(0.15),
        Colors.transparent,
      ],
    ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Paint()..shader = gradient,
    );
  }

  @override
  bool shouldRepaint(ParticlesPainter oldDelegate) => true;
} 