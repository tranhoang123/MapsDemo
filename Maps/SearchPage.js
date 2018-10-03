'use strict';

import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

type Props = {};
function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}

export default class SearchPage extends Component<Props>{
  static navigationOptions = {
    title: "TÌM NHÀ",
  };
  constructor(props){
    super(props);
    this.state={
      searchString:"London",
      isLoading:false,
      message:"",
    }
  }
  _onSearchTextChanged = (event) =>{
    console.log("_onSearchTextChanged");
    this.setState({searchString: event.nativeEvent.text});
    console.log("Current: "+this.state.searchString+", Next"+event.nativeEvent.text);
  }
  _executeQuery = (query) =>{
    console.log(query);
    this.setState({isLoading:true});
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
      this.setState({
        isLoading: false,
        message: 'Có gì đó sai sai ' + error
   }));
  }
  _handleResponse = (response) => {
    this.setState({isLoading:false, message:""});
    if(response.application_response_code.substr(0,1) === "1"){ // nestoria có những application_response_code method https://www.nestoria.co.uk/help/api-return-codes bắt đầu với số 1 là trả về giá trị thành công
      this.props.navigation.navigate(          // chuyển qua màn hình Results
        'Results', {listings: response.listings});
    }else{
      this.setState({message: "Không xác định được vị trí, thử lại."});
    }
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1)
    this._executeQuery(query);
  };
  render(){
    const spinner = this.state.isLoading ?    // thêm vòng tròn spinner hiển thị việc đang tìm kiếm
      <ActivityIndicator size="small"/>:null;
    console.log('SearchPage.render ');
    return(
      <View style={styles.container}>
        <Text style={styles.description}>
          Tìm mua nhà
        </Text>
        <Text style={styles.description}>
          Tìm theo tên hoặc pastcode.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Tên pastcode (chỉ ở nước Anh)'/>
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Tìm'
          />
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}<Text style={styles.description}>{this.state.message}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  description:{
    "marginBottom":20,
    "fontSize":18,
    "textAlign":"center",
    "color":"#656565"
  },
  container:{
    "padding":30,
    "marginTop":65,
    "alignItems":"center"
  },
  flowRight:{
    "flexDirection":"row",
    "alignItems":"center",
    "alignSelf":"stretch",
  },
  searchInput:{
    "height":36,
    //"width":1,
    "padding":4,
    "marginRight":5,
    "flexGrow":1,
    "fontSize":18,
    "borderWidth":1,
    "borderColor":"#48BBEC",
    "borderRadius":30,
    "color":"#48BBEC"
  },
  image:{
    "width":217,
    "height":138,
  },
})
