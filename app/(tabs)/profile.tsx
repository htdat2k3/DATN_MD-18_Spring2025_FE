import { StyleSheet, ScrollView } from "react-native";
import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { ThemedText } from "@/components/common/ThemedText";

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView>
      <ScrollView></ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
