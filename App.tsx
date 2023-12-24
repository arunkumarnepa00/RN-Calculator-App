/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';


function App(): React.JSX.Element {

  const data=['1','2','3','+','4','5','6','-','7','8','9','*','0','.','/','=']
  const { width }=Dimensions.get("window");
  console.log('Total width:',Number(width));
  const numberWidth=Number(width)/4;
  console.log('each width:',numberWidth);
  
  //const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};


  const [input1,setInput1]=useState('');
  const [input2,setInput2]=useState('');
  const [operation,setoperation]=useState('');
  const [isOpSet,setisOpSet]=useState(false);
  const [calcRequested,setCalcrequested]=useState(false);
  const [result,setresult]=useState('');
  console.log('input1:',input1);
  console.log('isOpSet:',isOpSet);
  console.log('input2:',input2);
  console.log('operation:',operation);
  console.log('calcRequested:',calcRequested);
  console.log('result:',result);

  const handlepress=(item: any)=>{
    if(item==='+' || item==='-' || item==='*' || item==='/'){
        setoperation(item);
        setisOpSet(true);
    }else if(item==='='){
      setCalcrequested(true);

      let result;
        switch (operation) {
          case '+':
            result=Number(input1)+Number(input2);
            break;
          case '-':
            result=Number(input1)-Number(input2);
            break;
          case '*':
            result=Number(input1)*Number(input2);
            break;
          case '/':
            result=Number(input1)/Number(input2);
            break;
          default:
            console.log('invalid operation')
            break;
        }
        
        setresult(String(result));
        setInput1(String(result));
        setoperation('');
        setInput2('');
        setisOpSet(false);
        setCalcrequested(false);

    }else {
        
        if(isOpSet){
          let tmp=input2+item;
          setInput2(tmp); 
        }else{
          let tmp=input1+item;
          setInput1(tmp);
        }
    }
  }
  const handleClear=()=>{
     setInput1('');
     setInput2('');
     setisOpSet(false);
     setoperation('');
     setCalcrequested(false);
     setresult('');
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={ require('./assets/calcBg2.jpg')}
      blurRadius={5}
      resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.container}>
         <Text style={styles.heading}>Calculator</Text>
         <View style={styles.numpad}>
            <Text style={styles.board}>{calcRequested?result:(!isOpSet?input1:input2)}</Text>
            <FlatList
            data={data}
            //keyExtractor={item => item.id}
            numColumns={4}
            renderItem={({item})=>
            <>
                
                <TouchableOpacity onPress={()=>{
                  handlepress(item)
                }}>
                  <Text style={[styles.number, {width:numberWidth}]}>{item}</Text>
                </TouchableOpacity>

            </>}
            />
            <TouchableOpacity onPress={()=>{
                handleClear()
            }}>
                <Text style={styles.clear}>CLEAR ALL</Text>
            </TouchableOpacity>          
         </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
     
  },
  container:{
    //backgroundColor:'pink',
    //width:'100%' 
  },
  heading:{
    fontSize:50,
    textAlign:'center',
    fontWeight:'bold'
  },
  numpad:{
    marginTop:150
  },
  board:{
    padding:10,
    fontSize:48,
    textAlign:'right',
    color:'#331a00',
    fontWeight:'bold',
  },
  number:{
    fontSize:32,
    fontWeight:'bold',
    borderColor:'black',
    borderWidth:1.5,
    textAlign:'center',
    backgroundColor:'transparent',
    color:'#331a00',
    flex:1,
    paddingVertical:20
  },
  clear:{
    fontSize:32,
    backgroundColor:'#b35900',
    color:'white',
    margin:20,
    textAlign:'center'
  },image:{
      height:'100%'
  }
});

export default App;
