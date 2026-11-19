import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Palette } from '@/src/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Screen Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to CropConnect Marketplace</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF7F2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Palette.charcoal,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.forestGreen,
  },
});
