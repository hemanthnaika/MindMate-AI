import Feather from "@expo/vector-icons/Feather";

import { Tabs } from "expo-router";
import React from "react";
const TabBarIcon = ({
  name,
  focused,
  icon: Icon,
}: {
  name: string;
  focused: boolean;
  icon: React.ComponentType<any>;
}) => <Icon name={name} size={24} color={focused ? "#5144EA" : "#DDD9FF"} />;

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#25123F",
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          borderTopWidth: 0,
          borderTopColor: "#25123F",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" icon={Feather} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          headerShown: false,
          title: "Habits",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="repeat" icon={Feather} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          headerShown: false,
          title: "Analysis",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bar-chart-2" icon={Feather} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" icon={Feather} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
