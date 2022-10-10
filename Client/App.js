import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginUser from './src/view/LoginUser';
import CreateUser from './src/view/CreateUser';
import Home from './src/view/Home';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginUser'>
          <Stack.Screen
            name='LoginUser'
            component={LoginUser}
            options={{
              title: 'Iniciar Sesion',
              headerShown: false
            }}
          >
            <Stack.Screen
              name='CreateUser'
              component={CreateUser}
              options={{
                title: 'Crear Cuenta',
              }}
            ></Stack.Screen>


          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

