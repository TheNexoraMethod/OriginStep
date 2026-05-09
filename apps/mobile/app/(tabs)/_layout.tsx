import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a1008', borderTopColor: '#3d3018' },
        tabBarActiveTintColor: '#c8860a',
        tabBarInactiveTintColor: '#7a5a30',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
    </Tabs>
  )
}
