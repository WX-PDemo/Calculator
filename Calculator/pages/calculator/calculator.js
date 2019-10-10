Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1:"clear",
    id2:"back",
    id3: "history",
    id4: "div",
    id5: "num_7",
    id6: "num_8",
    id7: "num_9",
    id8: "mul",
    id9: "num_4",
    id10: "num_5",
    id11: "num_6",
    id12: "sub",
    id13: "num_1",
    id14: "num_2",
    id15: "num_3",
    id16: "add",
    id17: "num_0",
    id18: "dot",
    id19: "equals",

    result:"0",
    dotFlag:false,
  },

  buttonClick:function(e){
    var id = e.target.id;
    var res = this.data.result;
    var newDotFlag = this.data.dotFlag;
    if (id >= "num_0" && id <= "num_9"){
        var num = id.split('_')[1];
      if (res == "0" || res.charAt(res.length - 1) == "误" 
         ){
          res = num;
        }else{
          res += num;
        }
    }else{
      if(id == "dot"){
        if (!newDotFlag){
          res += '.';
          newDotFlag = true
        }
      }else if(id == "clear"){
        res = "0";
        newDotFlag = false;
      }else if(id == "back"){
        var length = res.length;
        if(length > 1){
          res = res.substr(0,length-1);
        }else{
          res = "0";
        }
      }else if(id == "add" || id == "sub" || id == "mul" || id == "div"){
        newDotFlag = false;
        var sign;
        switch(id){
          case "add":
            sign = "+";
            break;
          case "sub":
            sign = "-";
            break;
          case "mul":
            sign = "*";
            break;
          case "div":
            sign = "/";
            break;
        }
        if(!isNaN(res.charAt(res.length-1))){//最后一位不是数字
          res = res + sign;
        }
      }
    }

    this.setData({
      result:res,
      dotFlag:newDotFlag,
    })
  },

  equalsClick:function(){
    var str = this.data.result;
    console.log("str:"+str);
    var dataArr = [];
    var item = '';
    var index = 0;
    for(var i = 0;i<=str.length;i++){
      var ch = str.charAt(i);
      if(ch == '='){
        continue;
      }
      if((ch != '' && ch >= '0' && ch <= '9') || ch == '.'){
        item += ch;
      }else{
        dataArr[index] = item;
        if(ch != ''){
          index++;
          dataArr[index] = ch;
          index++;
        }
        item = '';
      }
    }
    if(isNaN(dataArr[dataArr.length -1])){
      dataArr.pop();
    }

    var res = dataArr[0] * 1;
    var num;
    for(var i = 0;i<dataArr.length;i++){
      if(res == "错误"){
        break;
      }
      num = dataArr[i + 1] * 1;
      switch (dataArr[i]) {
        case "+":
          res += num;
          break;
        case "-":
          res -= num;
          break;
        case "*":
          res *= num;
          break;
        case "/":
          if (num != 0) {
            res /= num;
          } else {
            res = "错误";
          }
      }
    }
    this.setData({
      result:"="+res
    })
  }
})