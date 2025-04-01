import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const AddAddressScreen = () => {
    const [isDefault, setIsDefault] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [fullName, setFullName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");

    const handleSave = () => {
        // Xử lý hành động lưu dữ liệu
        console.log({
            fullName,
            zipCode,
            selectedCountry,
            selectedCity,
            selectedDistrict,
            address,
            isDefault,
        });
        alert("Địa chỉ đã được lưu thành công!");
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Bruno Pham"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Text style={styles.label}>Mã ZIP (mã bưu chính)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 123456"
                    keyboardType="numeric"
                    value={zipCode}
                    onChangeText={setZipCode}
                />
                <Text style={styles.label}>Country</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(itemValue) =>
                            setSelectedCountry(itemValue)
                        }>
                        <Picker.Item label="Chọn Quốc gia" value="" />
                        <Picker.Item label="Vietnam" value="Vietnam" />
                        <Picker.Item label="USA" value="USA" />
                    </Picker>
                </View>
                <Text style={styles.label}>City</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedCity}
                        onValueChange={(itemValue) =>
                            setSelectedCity(itemValue)
                        }>
                        <Picker.Item label="Chọn Thành phố" value="" />
                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                        <Picker.Item label="TP. Hồ Chí Minh" value="TP. Hồ Chí Minh" />
                    </Picker>
                </View>
                <Text style={styles.label}>District</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedDistrict}
                        onValueChange={(itemValue) =>
                            setSelectedDistrict(itemValue)
                        }>
                        <Picker.Item label="Chọn Quận huyện" value="" />
                        <Picker.Item label="Bắc Từ Liêm" value="Bắc Từ Liêm" />
                        <Picker.Item label="Cầu Giấy" value="Cầu Giấy" />
                    </Picker>
                </View>
                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 25 Robert Latouche Street"
                    value={address}
                    onChangeText={setAddress}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Chọn làm mặc định</Text>
                    <Switch
                        value={isDefault}
                        onValueChange={(value) => setIsDefault(value)}
                    />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#2DCC70",
        padding: 15,
        textAlign: "center",
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 14,
    },
    dropdown: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
        overflow: "hidden",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 14,
        color: "#555",
    },
    saveButton: {
        backgroundColor: "#2DCC70",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddAddressScreen;
