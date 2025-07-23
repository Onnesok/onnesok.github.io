// Only for Flutter web
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'dart:ui' as ui;
import 'package:flutter/foundation.dart';

void initializeYoutubePlayer(String viewType, String videoId) {
  // Register the view factory only on web
  // ignore: undefined_prefixed_name
  ui.platformViewRegistry.registerViewFactory(
    viewType,
    (int viewId) {
      final iframe = html.IFrameElement()
        ..width = '100%'
        ..height = '100%'
        ..src = 'https://www.youtube.com/embed/$videoId?autoplay=0&controls=1&rel=0'
        ..style.border = 'none'
        ..allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        ..allowFullscreen = true;

      // Add additional attributes for better compatibility
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; fullscreen');

      return iframe;
    },
  );
} 