import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { ThemedText } from "@/components/common/ThemedText";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
export default function HomeScreen() {

  const router = useRouter()
  return (
    <ThemedSafeAreaView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            {/* <Ionicons name="search" size={24} color="white" /> */}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
          <TouchableOpacity>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Phùng Tiến Dũng</Text>
            <Text style={styles.profileEmail}>phungtiendung211104@gmail.com</Text>
          </View>
        </View>

        {/* Options */}
        <ScrollView style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem} onPress={() => {
            router.push("/favorite")
          }}>
            <View>
              <Text style={styles.optionTitle}>Sản phẩm yêu thích</Text>
              <Text style={styles.optionSubtitle}>Đã có 10 đơn hàng</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => {
            router.push("/address")
          }}>
            <View>
              <Text style={styles.optionTitle}>Địa chỉ giao hàng</Text>
              <Text style={styles.optionSubtitle}>03 Địa chỉ</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => {
            router.push("/reviews")
          }}>
            <View>
              <Text style={styles.optionTitle}>Đánh giá của tôi</Text>
              <Text style={styles.optionSubtitle}>Đã đánh giá 5 mục</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => {
            router.push("/settings")
          }}>
            <View>
              <Text style={styles.optionTitle}>Cài đặt</Text>
              <Text style={styles.optionSubtitle}>Thông báo, Mật khẩu, FAQ, Liên hệ</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: 'green',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'gray',
    fontSize: 14,
  },
  optionsContainer: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    color: 'gray',
    fontSize: 14,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  }
});
