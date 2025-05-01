import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:visibility_detector/visibility_detector.dart';
import 'features/shared/utils/theme_provider.dart';
import 'features/home/widgets/header.dart';
import 'features/home/widgets/about_section.dart';
import 'features/home/widgets/projects_section.dart';
import 'features/home/widgets/contact_section.dart';
import 'features/home/widgets/footer.dart';
import 'features/home/widgets/loader.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    return MaterialApp(
      title: 'Portfolio',
      debugShowCheckedModeBanner: false,
      theme: themeProvider.currentTheme,
      home: const PortfolioPage(),
    );
  }
}

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  bool _isLoading = true;
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _projectsKey = GlobalKey();
  final GlobalKey _contactKey = GlobalKey();
  bool _showScrollToTop = false;

  @override
  void initState() {
    super.initState();
    _loadData();
    _scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    final showScrollToTop = _scrollController.offset > 300;
    if (showScrollToTop != _showScrollToTop) {
      setState(() => _showScrollToTop = showScrollToTop);
    }
  }

  Future<void> _loadData() async {
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _scrollToSection(GlobalKey key) {
    final context = key.currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Loader(),
      );
    }

    return Scaffold(
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
            Header(
              onViewWorkPressed: () => _scrollToSection(_projectsKey),
              onContactPressed: () => _scrollToSection(_contactKey),
            ),
            VisibilityDetector(
              key: const Key('about'),
              onVisibilityChanged: (info) {
                if (info.visibleFraction > 0.3) {
                  // Animation will be handled internally by AboutSection
                }
              },
              child: const AboutSection(),
            ),
            VisibilityDetector(
              key: const Key('projects'),
              onVisibilityChanged: (info) {
                if (info.visibleFraction > 0.3) {
                  // Trigger animation in ProjectsSection
                }
              },
              child: ProjectsSection(key: _projectsKey),
            ),
            VisibilityDetector(
              key: const Key('contact'),
              onVisibilityChanged: (info) {
                if (info.visibleFraction > 0.3) {
                  // Trigger animation in ContactSection
                }
              },
              child: ContactSection(key: _contactKey),
            ),
            VisibilityDetector(
              key: const Key('footer'),
              onVisibilityChanged: (info) {
                if (info.visibleFraction > 0.3) {
                  // Trigger animation in Footer
                }
              },
              child: const Footer(),
            ),
          ],
        ),
      ),
      floatingActionButton: AnimatedOpacity(
        opacity: _showScrollToTop ? 1.0 : 0.0,
        duration: const Duration(milliseconds: 200),
        child: FloatingActionButton(
          onPressed: () {
            _scrollController.animateTo(
              0,
              duration: const Duration(milliseconds: 800),
              curve: Curves.easeInOut,
            );
          },
          child: const Icon(Icons.arrow_upward),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }
}
