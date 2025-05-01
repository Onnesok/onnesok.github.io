import 'package:flutter/material.dart';
import 'package:portfolio/features/shared/widgets/header.dart';
import 'package:portfolio/widgets/about_section.dart';
import 'package:portfolio/widgets/projects_section.dart';
import 'package:portfolio/widgets/contact_section.dart';
import 'package:portfolio/widgets/footer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Theme.of(context).colorScheme.background,
              Theme.of(context).colorScheme.background.withOpacity(0.8),
            ],
          ),
        ),
        child: SingleChildScrollView(
          child: Column(
            children: [
              // Navigation Bar
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'RH',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    Row(
                      children: [
                        _buildNavItem(context, 'About', 0),
                        const SizedBox(width: 20),
                        _buildNavItem(context, 'Projects', 1),
                        const SizedBox(width: 20),
                        _buildNavItem(context, 'Contact', 2),
                        const SizedBox(width: 20),
                        IconButton(
                          onPressed: () {
                            final themeProvider = Theme.of(context).brightness == Brightness.dark;
                            // Toggle theme
                          },
                          icon: Icon(
                            Theme.of(context).brightness == Brightness.dark
                                ? Icons.light_mode
                                : Icons.dark_mode,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              // Content Sections
              const Header(),
              const AboutSection(),
              const ProjectsSection(),
              const ContactSection(),
              const Footer(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, String title, int index) {
    return TextButton(
      onPressed: () {
        // Add scroll to section functionality
      },
      style: TextButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 16,
          color: Theme.of(context).colorScheme.onBackground,
        ),
      ),
    );
  }
} 