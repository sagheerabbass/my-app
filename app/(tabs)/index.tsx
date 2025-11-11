import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import DisplayAnImage from './images';
// import App from './Quiz';
import Todo from './Todo';
import App from './calculator';
export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
           
      {/* <View style={styles.Topcontainer}>
        <View style={styles.leftBox}>
          <Text>Red</Text>
        </View>
        <View style={styles.rightBox}>
          <Text>Green</Text>
        </View>
        <View style={styles.right2Box}>
          <Text>Blue</Text>
        </View>

      </View>

      <View style={styles.bottomContainer}>
        <Text>Pink</Text>

      </View> */}
      {/* <View>
        <DisplayAnImage/>
      </View> */}
      <View>
         <App/>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
  },

  Topcontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    
    
  },

  bottomContainer: {
    flex: 0.5, 
    flexDirection: 'row', 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'pink',
  },

  leftBox: {
    flex: 1, 
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height:300,
  },

  rightBox: {
    flex: 1, 
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height:300,
  },
  right2Box: {
    flex: 1, 
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height:300,
  },
});
