import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';

class Loader extends StatefulWidget {
  const Loader({super.key});

  @override
  State<Loader> createState() => _LoaderState();
}

class _LoaderState extends State<Loader> with TickerProviderStateMixin {
  late AnimationController _arcController;
  late AnimationController _pulseController;
  late Animation<double> _arcAnimation;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _arcController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();

    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    )..repeat(reverse: true);

    _arcAnimation = CurvedAnimation(
      parent: _arcController,
      curve: Curves.easeInOut,
    );
    _pulseAnimation = Tween<double>(begin: 0.92, end: 1.08).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _arcController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final primaryColor = colorScheme.primary;
    final secondaryColor = colorScheme.secondary;
    final backgroundColor = colorScheme.background;
    
    return AnimatedOpacity(
      opacity: 1.0,
      duration: const Duration(milliseconds: 400),
      child: Material(
        color: Colors.transparent,
        child: Container(
          color: backgroundColor,
          child: Center(
            child: FadeIn(
              duration: const Duration(milliseconds: 500),
              child: SizedBox(
                width: 100,
                height: 100,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Animated arc
                    AnimatedBuilder(
                      animation: _arcAnimation,
                      builder: (context, child) {
                        return CustomPaint(
                          size: const Size(80, 80),
                          painter: _ArcPainter(
                            startAngle: _arcAnimation.value * 2 * 3.1416,
                            primary: primaryColor,
                            secondary: secondaryColor,
                          ),
                        );
                      },
                    ),
                    // Pulsing glowing logo/initial
                    AnimatedBuilder(
                      animation: _pulseAnimation,
                      builder: (context, child) => Transform.scale(
                        scale: _pulseAnimation.value,
                        child: Container(
                          width: 38,
                          height: 38,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: RadialGradient(
                              colors: [
                                secondaryColor.withOpacity(0.7),
                                primaryColor.withOpacity(0.9),
                                Colors.transparent,
                              ],
                              stops: const [0.0, 0.7, 1.0],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: primaryColor.withOpacity(0.25),
                                blurRadius: 18,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              'R', // Use your initial or logo here
                              style: TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                letterSpacing: 1.5,
                              ),
                            ),
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
      ),
    );
  }
}

class _ArcPainter extends CustomPainter {
  final double startAngle;
  final Color primary;
  final Color secondary;
  _ArcPainter({required this.startAngle, required this.primary, required this.secondary});

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 7
      ..strokeCap = StrokeCap.round
      ..shader = SweepGradient(
        startAngle: 0,
        endAngle: 6.28319,
        colors: [primary, secondary, primary],
        stops: const [0.0, 0.5, 1.0],
        transform: GradientRotation(startAngle),
      ).createShader(rect);
    // Draw a 270-degree arc
    canvas.drawArc(
      Rect.fromCircle(center: size.center(Offset.zero), radius: size.width / 2 - 3.5),
      startAngle,
      4.71239, // 270 degrees in radians
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(_ArcPainter oldDelegate) => oldDelegate.startAngle != startAngle;
} 