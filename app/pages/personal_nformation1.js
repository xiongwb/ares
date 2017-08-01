import React from 'react'
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
/*个人信息第一个页面
      张乐   2016-10-27*/


import { createForm } from 'rc-form'
import Button from 'antd-mobile/lib/button'
import List from 'antd-mobile/lib/list';
import  Toast from 'antd-mobile/lib/toast';
import Card from 'antd-mobile/lib/card'
import WhiteSpace from 'antd-mobile/lib/white-space'
import ImagePicker  from 'antd-mobile/lib/image-picker';
import TextareaItem from 'antd-mobile/lib/textarea-item'

import {
  BasePage,
  BackNavBar,
} from 'AresComponent'
import {
  COMMON_STYLES,
} from 'AresConstant'

var full_height = Dimensions.get('window').height
const styles = StyleSheet.create({
 root: {
   backgroundColor: COMMON_STYLES.MAIN_BACKGROUND_COLOR,/*页面的布局和颜色*/
    flex: 1,
  },
  confirm_btn_box:{

     marginTop: 38,
    paddingHorizontal: 38,
  },
  confirm_btn_bo:{

     marginTop: 20,
    paddingHorizontal: 38,
  },
  success_logo_box:{
   flex:1,
    justifyContent: "center",
    alignItems:'center',
  },
  next_btn: {
    marginTop: 10,
    marginHorizontal: 0,
    height:372,
    backgroundColor:'#888888',
  },

});
 class PersonalNformation1 extends BasePage {
 constructor() {
    super()
     this.state = {

    }
  }
	onChange(){
		return(
		<ImagePicker
          onChange={(files, type, index) => {
//            console.log(files);
 //           console.log(type);
  //          console.log(index);
            this.setState({
              files,
            });
          }}

          files={this.state.files}

        />);

	}

  render() {
  	const  getFieldProps  = this.props.form;
  	const Brief = List.Item.Brief;
    return(
    	<View style={styles.root}>
	    	<BackNavBar component={this}  >设置个人头像</BackNavBar>
        <Card style={styles.next_btn}  >
          <Card.Body  >
      	    <View style={styles.success_logo_box}>
        		  <Image source={require('ares/app/assets/image/head.png')} style={{width:100,height:100}}/>
        		 </View>
          </Card.Body>
        </Card>
		   	<View style={styles.confirm_btn_box}>
		      <Button>从相册选择一张</Button>
        </View>
        <View style={styles.confirm_btn_bo}>
		      <Button >拍一张图片 </Button>
	      </View>
      </View>
    );
  }
}
export default createForm()(PersonalNformation1)
