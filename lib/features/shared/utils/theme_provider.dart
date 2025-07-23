import 'package:flutter/material.dart';

class ThemeProvider extends ChangeNotifier {
  // Only dark mode
  ThemeData get currentTheme => darkTheme;

  static final ThemeData darkTheme = ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: Color(0xFF000000),
    cardColor: Color(0xFF111111),
    dividerColor: Color(0xFF333333),
    colorScheme: ColorScheme.dark(
      primary: Color(0xFF0070F3),
      secondary: Color(0xFF7928CA),
      surface: Color(0xFF111111),
      background: Color(0xFF000000),
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: Colors.white,
      onBackground: Colors.white,
    ),
    textTheme: TextTheme(
      headlineLarge: TextStyle(
        color: Colors.white,
        fontSize: 48,
        fontWeight: FontWeight.bold,
        letterSpacing: -1,
      ),
      headlineMedium: TextStyle(
        color: Colors.white,
        fontSize: 32,
        fontWeight: FontWeight.bold,
        letterSpacing: -0.5,
      ),
      bodyLarge: TextStyle(
        color: Colors.white,
        fontSize: 18,
        letterSpacing: 0.2,
      ),
      bodyMedium: TextStyle(
        color: Color(0xFFAAAAAA),
        fontSize: 16,
        letterSpacing: 0.1,
      ),
    ),
  );
} 