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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isWideScreen = MediaQuery.of(context).size.width > 800;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isWideScreen ? 40 : 20,
        vertical: isWideScreen ? 60 : 40,
      ),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: isDark 
            ? [
                Colors.grey.shade900,
                Colors.grey.shade900.withOpacity(0.9),
              ]
            : [
                Colors.grey.shade100,
                Colors.white,
              ],
        ),
        border: Border(
          top: BorderSide(
            color: isDark ? Colors.grey.shade800 : Colors.grey.shade300,
            width: 1,
          ),
        ),
        boxShadow: [
          BoxShadow(
            color: isDark 
              ? Colors.black.withOpacity(0.2)
              : Colors.grey.withOpacity(0.1),
            offset: const Offset(0, -4),
            blurRadius: 16,
          ),
        ],
      ),
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
                            color: Theme.of(context).colorScheme.primary,
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
                            color: isDark ? Colors.grey.shade400 : Colors.grey.shade700,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              if (isWideScreen) const SizedBox(width: 40),
              if (isWideScreen)
                Expanded(
                  child: FadeInRight(
                    duration: const Duration(milliseconds: 600),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildFooterLinks(
                          'Social',
                          [
                            _FooterLink('GitHub', 'https://github.com/Onnesok'),
                            _FooterLink('LinkedIn', 'https://linkedin.com/in/ratul-hasan-45911b245'),
                            _FooterLink('YouTube', 'https://youtube.com/Onnesok'),
                          ],
                          context,
                        ),
                        _buildFooterLinks(
                          'Resources',
                          [
                            _FooterLink('Blog', '#'),
                            _FooterLink('Projects', '#'),
                            _FooterLink('Contact', '#'),
                          ],
                          context,
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
          if (!isWideScreen) ...[
            const SizedBox(height: 40),
            FadeInUp(
              duration: const Duration(milliseconds: 600),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildFooterLinks(
                    'Social',
                    [
                      _FooterLink('GitHub', 'https://github.com/Onnesok'),
                      _FooterLink('LinkedIn', 'https://linkedin.com/in/ratul-hasan-45911b245'),
                      _FooterLink('YouTube', 'https://youtube.com/Onnesok'),
                    ],
                    context,
                  ),
                  _buildFooterLinks(
                    'Resources',
                    [
                      _FooterLink('Blog', '#'),
                      _FooterLink('Projects', '#'),
                      _FooterLink('Contact', '#'),
                    ],
                    context,
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(height: 40),
          FadeInUp(
            duration: const Duration(milliseconds: 600),
            delay: const Duration(milliseconds: 300),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    '© ${DateTime.now().year} Ratul Hasan. All rights reserved.',
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      color: isDark ? Colors.grey.shade400 : Colors.grey.shade700,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _buildSocialIconButton(
                      FontAwesomeIcons.github,
                      'https://github.com/Onnesok',
                      isDark,
                    ),
                    _buildSocialIconButton(
                      FontAwesomeIcons.linkedin,
                      'https://linkedin.com/in/ratul-hasan-45911b245',
                      isDark,
                    ),
                    _buildSocialIconButton(
                      FontAwesomeIcons.youtube,
                      'https://youtube.com/Onnesok',
                      isDark,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooterLinks(String title, List<_FooterLink> links, BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : Colors.black,
          ),
        ),
        const SizedBox(height: 16),
        ...links.map((link) => Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: RepaintBoundary(
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: InkWell(
                onTap: () => _launchUrl(link.url),
                child: AnimatedDefaultTextStyle(
                  duration: const Duration(milliseconds: 150),
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: isDark ? Colors.grey.shade400 : Colors.grey.shade700,
                    decoration: TextDecoration.none,
                  ),
                  child: Text(link.title),
                ),
              ),
            ),
          ),
        )),
      ],
    );
  }

  Widget _buildSocialIconButton(IconData icon, String url, bool isDark) {
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
                color: isDark ? Colors.grey.shade800 : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: isDark 
                      ? Colors.black.withOpacity(0.2)
                      : Colors.grey.withOpacity(0.1),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: FaIcon(
                icon,
                size: 16,
                color: isDark ? Colors.grey.shade200 : Colors.grey.shade800,
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