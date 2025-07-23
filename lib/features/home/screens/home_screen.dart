import 'package:flutter/material.dart';
import '../widgets/header.dart';
import '../widgets/about_section.dart';
import '../widgets/projects_section.dart';
import '../widgets/contact_section.dart';
import '../widgets/footer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isWideScreen = MediaQuery.of(context).size.width > 900;
    return Scaffold(
      appBar: AppBar(
        elevation: 4,
        backgroundColor: Theme.of(context).colorScheme.background,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CircleAvatar(
            backgroundImage: AssetImage('assets/projects/default.jpg'), // Replace with your avatar
            radius: 20,
          ),
        ),
        title: Text(
          'Ratul Hasan',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.primary,
            fontSize: 22,
          ),
        ),
        actions: [
          const SizedBox(width: 12),
        ],
      ),
      drawer: isWideScreen ? null : Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircleAvatar(
                    backgroundImage: AssetImage('assets/projects/default.jpg'),
                    radius: 32,
                  ),
                  const SizedBox(height: 12),
                  Text('Ratul Hasan', style: TextStyle(color: Colors.white, fontSize: 18)),
                ],
              ),
            ),
            _buildNavItem(context, 'About', 0, isDrawer: true),
            _buildNavItem(context, 'Projects', 1, isDrawer: true),
            _buildNavItem(context, 'Contact', 2, isDrawer: true),
          ],
        ),
      ),
      body: Row(
        children: [
          if (isWideScreen)
            NavigationRail(
              selectedIndex: 0,
              onDestinationSelected: (int index) {
                // Implement scroll to section
              },
              labelType: NavigationRailLabelType.all,
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.person),
                  label: Text('About'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.work),
                  label: Text('Projects'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.mail),
                  label: Text('Contact'),
                ),
              ],
            ),
          Expanded(
            child: Container(
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
                    Header(
                      onViewWorkPressed: () {},
                      onContactPressed: () {},
                    ),
                    AboutSection(),
                    ProjectsSection(),
                    ContactSection(),
                    Footer(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, String title, int index, {bool isDrawer = false}) {
    return ListTile(
      title: Text(title, style: TextStyle(fontSize: 16)),
      leading: index == 0
          ? Icon(Icons.person)
          : index == 1
              ? Icon(Icons.work)
              : Icon(Icons.mail),
      onTap: () {
        // Implement scroll to section
        if (isDrawer) Navigator.pop(context);
      },
    );
  }
} 