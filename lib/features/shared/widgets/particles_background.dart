import 'dart:math' as math;
import 'package:flutter/material.dart';

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
        isDark ? particle.radius * 2.5 : particle.radius * 1.7,
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
              ..strokeWidth = 2.0;
            canvas.drawLine(particle.position, otherParticle.position, linePaint);
          }
        }
      }
    }
  }

  @override
  bool shouldRepaint(ParticlesPainter oldDelegate) => true;
}

class ParticlesBackground extends StatefulWidget {
  final int particleCount;
  final bool isDark;
  final double? height;
  final double? width;

  const ParticlesBackground({
    Key? key,
    this.particleCount = 30,
    this.isDark = true,
    this.height,
    this.width,
  }) : super(key: key);

  @override
  State<ParticlesBackground> createState() => _ParticlesBackgroundState();
}

class _ParticlesBackgroundState extends State<ParticlesBackground> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Particle> _particles;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 18),
      vsync: this,
    )..repeat();
    final isMobile = (WidgetsBinding.instance.window.physicalSize.width / WidgetsBinding.instance.window.devicePixelRatio) < 600;
    final radiusMultiplier = isMobile ? 0.7 : 1.2;
    _particles = List.generate(
      widget.particleCount,
      (index) => Particle(
        position: Offset(
          math.Random().nextDouble() * (widget.width ?? 2000),
          math.Random().nextDouble() * (widget.height ?? 800),
        ),
        velocity: Offset(
          math.Random().nextDouble() * 1.2 - 0.6,
          math.Random().nextDouble() * 1.2 - 0.6,
        ),
        radius: math.Random().nextDouble() * radiusMultiplier + 0.3,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        for (var particle in _particles) {
          particle.update(Size(widget.width ?? size.width, widget.height ?? size.height));
        }
        return CustomPaint(
          size: Size(widget.width ?? size.width, widget.height ?? size.height),
          painter: ParticlesPainter(
            particles: _particles,
            isDark: widget.isDark,
          ),
        );
      },
    );
  }
} 