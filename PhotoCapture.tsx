import * as React from 'react';
import {
    Button,
    Image,
    Text,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

const includeExtra = true;

const PhotoCapture = () => {


    const [response, setResponse] = React.useState<any>(null);

    const onButtonPress = React.useCallback((type, options) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, setResponse);
        } else {
            ImagePicker.launchImageLibrary(options, setResponse);
        }
    }, []);

    return (
        <View>
            <Text>Gái Xinh Chỉ Để Ngắm Thôi</Text>
            <ScrollView>
                <View style={styles.buttonContainer}>{actions.map(({ title, type, options }) => {
                    return (
                        // <Button key={title} title={title} onPress={() => onButtonPress(type, options)}></Button>
                        <TouchableOpacity key={title} onPress={() => onButtonPress(type, options)} style={{ margin: 10, backgroundColor: 'orange', width: 100, height: 40, borderRadius: 20, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{title}</Text>
                        </TouchableOpacity>
                    )
                })}
                </View>
                <View>
                    <Text>{JSON.stringify(response)}</Text>
                </View>
                {response?.assets &&
                    response?.assets.map(({ uri }: { uri: string }) => (
                        <View key={uri} style={styles.imageContainer}>
                            <Image
                                resizeMode="cover"
                                resizeMethod="scale"
                                style={styles.image}
                                source={{ uri: uri }}
                            />
                        </View>
                    ))}
            </ScrollView>
        </View>

    )
}

export default PhotoCapture

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        marginVertical: 24,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
})

interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
    {
        title: 'Take Image',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra,
        },
    },
    {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra,
        },
    },
]