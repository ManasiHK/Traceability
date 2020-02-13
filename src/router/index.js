import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import TextDetection from "../screens/TextDetection";
import TraceDetails from "../screens/TraceDetails";
import MainScreen from "../screens/MainScreen";
import SignIn from "../screens/signIn";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";

const AppNavigator = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false
      }
    },

    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false
      }
    },

    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false
      }
    },

    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false
      }
    },

    TextDetection: {
      screen: TextDetection,
      navigationOptions: {
        title: 'Traceability',
        headerStyle: {
            backgroundColor: '#03125e',
            elevation: 0,
            shadowOpacity: 0
        },
        headerLeft: null,
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: '100',
            fontFamily: 'SegoePro-Light',
            color: '#ffffff'
        }
      }
    },

    TraceDetails: {
      screen: TraceDetails,
      navigationOptions: {
        title: 'Trace Code',
        headerStyle: {
            backgroundColor: '#03125e',
            elevation: 0,
            shadowOpacity: 0
        },
        // headerLeft: null,
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: '100',
            fontFamily: 'SegoePro-Light',
            color: '#ffffff'
        }
      }
    },
  }
);

const App = createAppContainer(AppNavigator);

export default App;