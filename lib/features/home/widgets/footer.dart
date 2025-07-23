import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animate_do/animate_do.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isWideScreen = MediaQuery.of(context).size.width > 800;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isWideScreen ? 40 : 20,
        vertical: isWideScreen ? 60 : 40,
      ),
      color: colorScheme.background,
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: FadeInLeft(
                  duration: const Duration(milliseconds: 600),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      RepaintBoundary(
                        child: ShimmerText(
                          'Ratul Hasan',
                          style: GoogleFonts.inter(
                            fontSize: isWideScreen ? 24 : 20,
                            fontWeight: FontWeight.bold,
                            color: colorScheme.primary,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      FadeInLeft(
                        duration: const Duration(milliseconds: 600),
                        child: Text(
                          'Making stories for future',
                          style: GoogleFonts.inter(
                            fontSize: isWideScreen ? 16 : 14,
                            color: colorScheme.onSurface.withOpacity(0.7),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              if (isWideScreen) const SizedBox(width: 40),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Wrap(
                      alignment: WrapAlignment.end,
                      spacing: 0,
                      runSpacing: 4,
                      children: [
                        _buildSocialIconButton(FontAwesomeIcons.github, 'https://github.com/Onnesok', colorScheme),
                        _buildSocialIconButton(FontAwesomeIcons.linkedin, 'https://www.linkedin.com/in/ratul-hasan-45911b245/', colorScheme),
                        _buildSocialIconButton(FontAwesomeIcons.instagram, 'https://www.instagram.com/ratul.hasan.404', colorScheme),
                        _buildSocialIconButton(FontAwesomeIcons.solidEnvelope, 'mailto:ratul.hasan@g.bracu.ac.bd', colorScheme),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      '© 2024 Ratul Hasan. All rights reserved.',
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: colorScheme.onSurface.withOpacity(0.5),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSocialIconButton(IconData icon, String url, ColorScheme colorScheme) {
    return RepaintBoundary(
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => _launchUrl(url),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 8),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: colorScheme.surface,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: colorScheme.primary.withOpacity(0.08),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: FaIcon(
                icon,
                size: 16,
                color: colorScheme.primary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _FooterLink {
  final String title;
  final String url;

  const _FooterLink(this.title, this.url);
}

class ShimmerText extends StatefulWidget {
  final String text;
  final TextStyle style;

  const ShimmerText(this.text, {required this.style, Key? key}) : super(key: key);

  @override
  State<ShimmerText> createState() => _ShimmerTextState();
}

class _ShimmerTextState extends State<ShimmerText> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    )..repeat(reverse: true);
    
    _animation = Tween<double>(
      begin: 0.7,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Text(
          widget.text,
          style: widget.style.copyWith(
            color: widget.style.color?.withOpacity(_animation.value),
          ),
        );
      },
    );
  }
} 