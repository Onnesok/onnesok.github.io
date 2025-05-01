import 'package:flutter/material.dart';

class ThemeProvider extends ChangeNotifier {
  bool _isDarkMode = true;

  bool get isDarkMode => _isDarkMode;

  ThemeData get currentTheme => _isDarkMode ? darkTheme : lightTheme;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }

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

  static final ThemeData lightTheme = ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.light,
    scaffoldBackgroundColor: Colors.white,
    cardColor: Color(0xFFF6F6F6),
    dividerColor: Color(0xFFEAEAEA),
    colorScheme: ColorScheme.light(
      primary: Color(0xFF0070F3),
      secondary: Color(0xFF7928CA),
      surface: Colors.white,
      background: Colors.white,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: Color(0xFF111111),
      onBackground: Color(0xFF111111),
    ),
    textTheme: TextTheme(
      headlineLarge: TextStyle(
        color: Color(0xFF111111),
        fontSize: 48,
        fontWeight: FontWeight.bold,
        letterSpacing: -1,
      ),
      headlineMedium: TextStyle(
        color: Color(0xFF111111),
        fontSize: 32,
        fontWeight: FontWeight.bold,
        letterSpacing: -0.5,
      ),
      bodyLarge: TextStyle(
        color: Color(0xFF111111),
        fontSize: 18,
        letterSpacing: 0.2,
      ),
      bodyMedium: TextStyle(
        color: Color(0xFF666666),
        fontSize: 16,
        letterSpacing: 0.1,
      ),
    ),
  );
} 