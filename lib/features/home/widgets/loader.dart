import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';

class Loader extends StatefulWidget {
  const Loader({super.key});

  @override
  State<Loader> createState() => _LoaderState();
}

class _LoaderState extends State<Loader> with TickerProviderStateMixin {
  late AnimationController _rotationController;
  late AnimationController _pulseController;
  late Animation<double> _rotationAnimation;
  late Animation<double> _pulseAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _rotationController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat();

    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _rotationAnimation = CurvedAnimation(
      parent: _rotationController,
      curve: Curves.easeInOut,
    );

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _opacityAnimation = Tween<double>(
      begin: 0.5,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _rotationController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primaryColor = isDark ? Colors.blue.shade200 : Colors.blue.shade900;
    final secondaryColor = isDark ? Colors.blue.shade900 : Colors.blue.shade100;
    
    return Material(
      color: Colors.transparent,
      child: Container(
        color: isDark ? Colors.black : Colors.white,
        child: Center(
          child: FadeIn(
            duration: const Duration(milliseconds: 500),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    // Outer rotating ring
                    RotationTransition(
                      turns: _rotationAnimation,
                      child: AnimatedBuilder(
                        animation: _pulseAnimation,
                        builder: (context, child) => Transform.scale(
                          scale: _pulseAnimation.value,
                          child: Container(
                            width: 80,
                            height: 80,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: primaryColor.withOpacity(_opacityAnimation.value),
                                width: 3,
                              ),
                              gradient: SweepGradient(
                                colors: [
                                  secondaryColor.withOpacity(0.1),
                                  primaryColor.withOpacity(0.8),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    // Middle ring
                    RotationTransition(
                      turns: ReverseAnimation(_rotationAnimation),
                      child: Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: primaryColor.withOpacity(0.5),
                            width: 2,
                          ),
                        ),
                      ),
                    ),
                    // Inner dot
                    AnimatedBuilder(
                      animation: _pulseAnimation,
                      builder: (context, child) => Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: primaryColor.withOpacity(_opacityAnimation.value),
                          boxShadow: [
                            BoxShadow(
                              color: primaryColor.withOpacity(0.3),
                              blurRadius: 10,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                // Animated text
                DefaultTextStyle(
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color: primaryColor,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('Loading'),
                      AnimatedBuilder(
                        animation: _pulseController,
                        builder: (context, child) {
                          final dotCount = ((_pulseController.value * 3) + 1).floor();
                          return Text('.' * dotCount);
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                FadeIn(
                  delay: const Duration(milliseconds: 500),
                  child: Text(
                    'Preparing something amazing',
                    style: TextStyle(
                      fontSize: 14,
                      color: primaryColor.withOpacity(0.7),
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
} 