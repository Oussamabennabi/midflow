import { ScrollView } from '@/components/Themed';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function TabOneScreen() {
 
    return <ScrollView>
        <Button label='go to map' onPress={()=>router.push("/welcome")}/>
    </ScrollView>
}