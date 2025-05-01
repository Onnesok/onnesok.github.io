import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactSection extends StatefulWidget {
  const ContactSection({super.key});

  @override
  State<ContactSection> createState() => _ContactSectionState();
}

class _ContactSectionState extends State<ContactSection> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();
  bool _isSubmitting = false;

  // Email validation regex - Optimized for better performance
  static final _emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;
    
    setState(() => _isSubmitting = true);
    
    try {
      final emailBody = '''
From: ${_nameController.text}
Email: ${_emailController.text}

Message:
${_messageController.text}
''';

      final Uri emailLaunchUri = Uri(
        scheme: 'mailto',
        path: 'ratul.hasan@g.bracu.ac.bd',
        queryParameters: {
          'subject': _subjectController.text,
          'body': emailBody,
        },
      );

      if (await canLaunchUrl(emailLaunchUri)) {
        await launchUrl(emailLaunchUri);
        
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Email client opened successfully!')),
          );
          _formKey.currentState!.reset();
          _nameController.clear();
          _emailController.clear();
          _subjectController.clear();
          _messageController.clear();
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Could not open email client')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('An error occurred while sending the message')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isSubmitting = false);
      }
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 60, horizontal: 20),
      color: isDark ? Colors.grey.shade900 : Colors.white,
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isWideScreen = constraints.maxWidth > 800;
          
          return Column(
            children: [
              FadeInDown(
                duration: const Duration(milliseconds: 600), // Reduced animation duration
                child: Text(
                  'Get in Touch',
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                        color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
                        fontWeight: FontWeight.bold,
                      ),
                ),
              ),
              const SizedBox(height: 40),
              isWideScreen
                ? Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(child: _buildContactInfo(isDark)),
                      const SizedBox(width: 40),
                      Expanded(child: _buildContactForm(isDark)),
                    ],
                  )
                : Column(
                    children: [
                      _buildContactInfo(isDark),
                      const SizedBox(height: 40),
                      _buildContactForm(isDark),
                    ],
                  ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildContactInfo(bool isDark) {
    return FadeInLeft(
      duration: const Duration(milliseconds: 600), // Reduced animation duration
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Contact Information',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : Colors.black,
            ),
          ),
          const SizedBox(height: 20),
          _buildContactInfoItem(
            icon: Icons.location_on,
            text: 'Dhaka, Bangladesh',
            isDark: isDark,
          ),
          const SizedBox(height: 15),
          _buildContactInfoItem(
            icon: Icons.email,
            text: 'ratul.hasan@g.bracu.ac.bd',
            isDark: isDark,
          ),
          const SizedBox(height: 30),
          FadeInUp(
            duration: const Duration(milliseconds: 600), // Reduced animation duration
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildSocialButton(
                    icon: FontAwesomeIcons.facebook,
                    url: 'https://facebook.com/Onnesok.94',
                    tooltip: 'Facebook',
                  ),
                  const SizedBox(width: 20),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.linkedin,
                    url: 'https://linkedin.com/in/ratul-hasan-45911b245',
                    tooltip: 'LinkedIn',
                  ),
                  const SizedBox(width: 20),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.youtube,
                    url: 'https://youtube.com/Onnesok',
                    tooltip: 'YouTube',
                  ),
                  const SizedBox(width: 20),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.github,
                    url: 'https://github.com/Onnesok',
                    tooltip: 'GitHub',
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactForm(bool isDark) {
    return FadeInRight(
      duration: const Duration(milliseconds: 600), // Reduced animation duration
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Send a Message',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white : Colors.black,
              ),
            ),
            const SizedBox(height: 20),
            RepaintBoundary(
              child: TextFormField(
                controller: _nameController,
                decoration: _buildInputDecoration('Name', isDark),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(height: 20),
            RepaintBoundary(
              child: TextFormField(
                controller: _emailController,
                decoration: _buildInputDecoration('Email', isDark),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your email';
                  }
                  if (!_emailRegex.hasMatch(value)) {
                    return 'Please enter a valid email address';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(height: 20),
            RepaintBoundary(
              child: TextFormField(
                controller: _subjectController,
                decoration: _buildInputDecoration('Subject', isDark),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a subject';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(height: 20),
            RepaintBoundary(
              child: TextFormField(
                controller: _messageController,
                decoration: _buildInputDecoration('Message', isDark),
                maxLines: 5,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your message';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isSubmitting ? null : _submitForm,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: isDark ? Colors.blue.shade700 : Colors.blue,
                  foregroundColor: Colors.white,
                ),
                child: _isSubmitting
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : const Text(
                      'Send Message',
                      style: TextStyle(fontSize: 16),
                    ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContactInfoItem({
    required IconData icon,
    required String text,
    required bool isDark,
  }) {
    return Row(
      children: [
        Icon(
          icon,
          size: 20,
          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
        ),
        const SizedBox(width: 10),
        Text(
          text,
          style: TextStyle(
            fontSize: 16,
            color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
          ),
        ),
      ],
    );
  }

  Widget _buildSocialButton({
    required IconData icon,
    required String url,
    required String tooltip,
  }) {
    return RepaintBoundary(
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Tooltip(
          message: tooltip,
          child: InkWell(
            onTap: () => _launchUrl(url),
            borderRadius: BorderRadius.circular(30),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.blue.shade700,
              ),
              child: FaIcon(
                icon,
                size: 20,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }

  InputDecoration _buildInputDecoration(String label, bool isDark) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(
        color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: isDark ? Colors.grey.shade700 : Colors.grey.shade300,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
        ),
      ),
      filled: true,
      fillColor: isDark ? Colors.grey.shade800 : Colors.grey.shade50,
    );
  }
} 