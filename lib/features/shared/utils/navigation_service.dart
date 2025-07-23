import 'package:flutter/material.dart';

class NavigationService {
  final ScrollController scrollController = ScrollController();
  final Map<String, GlobalKey> _sectionKeys = {
    'About': GlobalKey(),
    'Projects': GlobalKey(),
    'Contact': GlobalKey(),
  };

  GlobalKey? getKeyForSection(String section) {
    return _sectionKeys[section];
  }

  void scrollToSection(String section) {
    final key = _sectionKeys[section];
    if (key?.currentContext != null) {
      Scrollable.ensureVisible(
        key!.currentContext!,
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
      );
    }
  }

  void scrollToTop() {
    scrollController.animateTo(
      0,
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeInOut,
    );
  }

  void dispose() {
    scrollController.dispose();
  }
} 