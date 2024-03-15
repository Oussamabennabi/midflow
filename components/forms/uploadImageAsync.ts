import { Alert } from "react-native";

export async function uploadImageAsync(uri: string, apiUrl: string) {
    try {
        const fetchResponse = await fetch(uri);
        const blob = await fetchResponse.blob();
        return fetch(apiUrl, {
            method: "POST",
            body: blob,
            headers: {
                Accept: "application/json",
                "Content-Type": blob.type!,
            },
        });
    } catch (error) {
        Alert.alert(
            "There has been an error uploading the images (uploadImageAsync)"
        );
        console.log(error);
    }
}