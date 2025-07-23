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
    final colorScheme = Theme.of(context).colorScheme;
    final width = MediaQuery.of(context).size.width;
    final isWideScreen = width > 800;
    final isSmall = width < 600;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: EdgeInsets.symmetric(
        vertical: isSmall ? 32 : 60,
        horizontal: isSmall ? 8 : 20,
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              FadeInDown(
                duration: const Duration(milliseconds: 600),
                child: Column(
                  children: [
                    Text(
                      'Get in Touch',
                      style: Theme.of(context).textTheme.displaySmall?.copyWith(
                            color: colorScheme.primary,
                            fontWeight: FontWeight.bold,
                            fontSize: isSmall ? 28 : null,
                          ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: 48,
                      height: 4,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(2),
                        gradient: LinearGradient(
                          colors: [
                            colorScheme.primary,
                            colorScheme.secondary,
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      "Let's work together or just say hi!",
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: colorScheme.onSurface.withOpacity(0.7),
                            fontWeight: FontWeight.w400,
                            fontSize: isSmall ? 15 : null,
                          ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
              SizedBox(height: isSmall ? 24 : 40),
              isWideScreen
                  ? Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(child: _buildContactInfo(colorScheme, isDark, isSmall)),
                        Container(
                          width: 1.5,
                          height: 340,
                          margin: const EdgeInsets.symmetric(horizontal: 32),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                colorScheme.primary.withOpacity(0.18),
                                Colors.transparent,
                              ],
                            ),
                          ),
                        ),
                        Expanded(child: _buildContactForm(colorScheme, isDark, isSmall)),
                      ],
                    )
                  : Column(
                      children: [
                        _buildContactInfo(colorScheme, isDark, isSmall),
                        SizedBox(height: isSmall ? 20 : 32),
                        Container(
                          height: 1.5,
                          width: 120,
                          margin: const EdgeInsets.symmetric(vertical: 16),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                colorScheme.primary.withOpacity(0.18),
                                Colors.transparent,
                              ],
                            ),
                          ),
                        ),
                        _buildContactForm(colorScheme, isDark, isSmall),
                      ],
                    ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildContactInfo(ColorScheme colorScheme, bool isDark, bool isSmall) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(isSmall ? 12 : 20)),
      child: Container(
        width: isSmall ? double.infinity : null,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(isSmall ? 12 : 20),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              colorScheme.primary.withOpacity(0.08),
              colorScheme.secondary.withOpacity(0.06),
            ],
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(isSmall ? 16 : 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildContactInfoItem(
                icon: Icons.email,
                text: 'ratul.hasan@g.bracu.ac.bd',
                colorScheme: colorScheme,
                isSmall: isSmall,
              ),
              SizedBox(height: isSmall ? 12 : 18),
              _buildContactInfoItem(
                icon: Icons.phone,
                text: '+8801700595246',
                colorScheme: colorScheme,
                isSmall: isSmall,
              ),
              SizedBox(height: isSmall ? 12 : 18),
              _buildContactInfoItem(
                icon: Icons.location_on,
                text: 'Dhaka, Bangladesh',
                colorScheme: colorScheme,
                isSmall: isSmall,
              ),
              SizedBox(height: isSmall ? 18 : 28),
              Wrap(
                spacing: 14,
                runSpacing: 10,
                children: [
                  _buildSocialButton(
                    icon: FontAwesomeIcons.github,
                    url: 'https://github.com/Onnesok',
                    tooltip: 'GitHub',
                  ),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.linkedin,
                    url: 'https://www.linkedin.com/in/ratul-hasan-45911b245/',
                    tooltip: 'LinkedIn',
                  ),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.instagram,
                    url: 'https://www.instagram.com/ratul.hasan.404',
                    tooltip: 'Instagram',
                  ),
                  _buildSocialButton(
                    icon: FontAwesomeIcons.solidEnvelope,
                    url: 'mailto:ratul.hasan@g.bracu.ac.bd',
                    tooltip: 'Email',
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildContactInfoItem({
    required IconData icon,
    required String text,
    required ColorScheme colorScheme,
    required bool isSmall,
  }) {
    return Row(
      children: [
        Icon(
          icon,
          size: isSmall ? 18 : 20,
          color: colorScheme.primary,
        ),
        SizedBox(width: isSmall ? 7 : 10),
        Flexible(
          child: Text(
            text,
            style: TextStyle(
              fontSize: isSmall ? 14 : 16,
              color: colorScheme.onSurface.withOpacity(0.8),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildContactForm(ColorScheme colorScheme, bool isDark, bool isSmall) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(isSmall ? 12 : 20)),
      child: Padding(
        padding: EdgeInsets.all(isSmall ? 16 : 28),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              FadeInUp(
                duration: const Duration(milliseconds: 400),
                child: TextFormField(
                  controller: _nameController,
                  decoration: _buildInputDecoration('Name', isDark, isSmall),
                  validator: (value) => value == null || value.isEmpty ? 'Please enter your name' : null,
                ),
              ),
              SizedBox(height: isSmall ? 12 : 18),
              FadeInUp(
                duration: const Duration(milliseconds: 450),
                child: TextFormField(
                  controller: _emailController,
                  decoration: _buildInputDecoration('Email', isDark, isSmall),
                  validator: (value) => value == null || value.isEmpty || !_emailRegex.hasMatch(value)
                      ? 'Please enter a valid email'
                      : null,
                ),
              ),
              SizedBox(height: isSmall ? 12 : 18),
              FadeInUp(
                duration: const Duration(milliseconds: 500),
                child: TextFormField(
                  controller: _subjectController,
                  decoration: _buildInputDecoration('Subject', isDark, isSmall),
                  validator: (value) => value == null || value.isEmpty ? 'Please enter a subject' : null,
                ),
              ),
              SizedBox(height: isSmall ? 12 : 18),
              FadeInUp(
                duration: const Duration(milliseconds: 550),
                child: TextFormField(
                  controller: _messageController,
                  maxLines: 5,
                  decoration: _buildInputDecoration('Message', isDark, isSmall),
                  validator: (value) => value == null || value.isEmpty ? 'Please enter your message' : null,
                ),
              ),
              SizedBox(height: isSmall ? 18 : 28),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: _isSubmitting ? null : _submitForm,
                      icon: _isSubmitting
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                              ),
                            )
                          : const Icon(Icons.send),
                      label: const Text(
                        'Send Message',
                        style: TextStyle(fontSize: 16),
                      ),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: isSmall ? 12 : 16),
                        backgroundColor: colorScheme.primary,
                        foregroundColor: colorScheme.onPrimary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(isSmall ? 8 : 12)),
                        elevation: 2,
                      ),
                    ),
                  ),
                  SizedBox(width: isSmall ? 8 : 12),
                  IconButton(
                    onPressed: _isSubmitting
                        ? null
                        : () {
                            _formKey.currentState?.reset();
                            _nameController.clear();
                            _emailController.clear();
                            _subjectController.clear();
                            _messageController.clear();
                          },
                    icon: const Icon(Icons.clear),
                    tooltip: 'Clear Form',
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
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

  InputDecoration _buildInputDecoration(String label, bool isDark, bool isSmall) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(
        color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
        fontSize: isSmall ? 14 : null,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(isSmall ? 8 : 12),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(isSmall ? 8 : 12),
        borderSide: BorderSide(
          color: isDark ? Colors.grey.shade700 : Colors.grey.shade300,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(isSmall ? 8 : 12),
        borderSide: BorderSide(
          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
        ),
      ),
      filled: true,
      fillColor: isDark ? Colors.grey.shade800 : Colors.grey.shade50,
      contentPadding: EdgeInsets.symmetric(
        vertical: isSmall ? 10 : 14,
        horizontal: isSmall ? 12 : 18,
      ),
    );
  }
} 