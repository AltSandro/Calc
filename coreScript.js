
/*начало ядра вычислений */
function calculate2 (str) {

  let zamenazapyatoy = str.replace(/,/, '.') //для чтения запятой как дроби
  let str1 = zamenazapyatoy.replace(/\s/g, '');//удаление пробелов если они есть и возврат строки
 
  //console.log(JSON.stringify( symbolBeforeBracket(str1) )) ;      
  let nullSymb = ["^","**","*","/"]; //для пров zeroErrorElemetCheck();  

  
 
  //==>Алгоритм подготовки массива к операциям(степень, умножение, деление и т.д)<==
  let  separateAlgoritm = {

      x: function(str) { return str.split('') },//превращение в массив

      y: function(str) { return ( this.x(str) ).slice().map((item, index, array) => {  
          return (item === "^") ? "↑^↑" : (item === "**") ? "↑**↑" :
          (item === "*") ? "↑*↑" : (item === "/") ? "↑/↑" :
          (item === "+") ? "↑+↑" : (item === "-") ? "↑-↑" :
          (item === "(") ? "(↑" : (item === ")") ? "↑)" :
          item;  
          })},

      z: function(str) { return ( this.y(str) ).join("").split("↑") },
  };
  //

  //Алгоритм вставки симвроа "*". Надо через массив однозначно

 /* str1 = symbolBeforeBracket(str1); 
          function symbolBeforeBracket(str) { 
              let a = str;
              let b = a;
              if ( str.includes("(") || str.includes(")") ) {
                  for ( let i = 0; i < str.length; i++ ) {
                      if ( (str[i] === "(") && ( str[i-1] === 0||1||2||3||4||5||6||7||8||9 ) || 
                      ( (str[i] === "(") && ( (str[i-1]) === ")") ) ) {
                          
                          a = a.slice(0,i) + "*" + a.slice(i);
                      };
              };   
              };
             
              return a;
          };
          console.log(JSON.stringify(str1) );*/
         


   //              ==>Алгоритм скобочек: <==
 
  function deystvieSoSkobkT(arr) {
      do {  
      for (let i = 0; i < arr.length; i++) {
          if ( (arr[i] === ")") ) {
           let levsobkaIndex = arr.lastIndexOf ("(", i);
             // console.log(JSON.stringify(levsobkaIndex));
              let massiveVnytriSkob = arr.slice(levsobkaIndex+1, i); // получение содержания скоб, не включая скобки;
              // console.log(JSON.stringify(massiveVnytriSkob));
              let elemDelete = massiveVnytriSkob["length"]+2;  //количество элементов massiveVnytriSkob, шоб потом удалить их, в формате понятному дальнейшему синтаксису;
             // console.log(JSON.stringify(elemDelete));
              let resultVichislVnytrSkob = String( calculate2(massiveVnytriSkob.join("")) ); //шоб дальше багов небыло юзаем string метод
              // console.log(JSON.stringify(resultVichislVnytrSkob));
          
              arr.splice(levsobkaIndex, elemDelete, resultVichislVnytrSkob); //помнить про нюанс синтаксиса splice с оформлением под переменную
          };
      }; 
      } while (arr.includes(")")); 
      return arr; 
  };
//

  //Реализация скобочек:
      let operandSkob = separateAlgoritm.z(str1);
  //
      if ( str1.includes(")")  ) {
      operandSkob = deystvieSoSkobkT(separateAlgoritm.z(str1));
  //
      //console.log(JSON.stringify(operandSkob));
  };
  // 

  /*Поприоритетная проходка ПО ЗНАКАМ:*/
/*1) *///Подготовка [^]:
       //
       let operandStepen = operandSkob; 
      // let operandStepen = operandSkob; //перенаправление, так сказать
      // console.log(JSON.stringify(operandSkob));

// Удаление БАГА возведение в отрицательную степень:
  for (let key = 0; key < operandStepen.length; key++ ) {
      if ( (operandStepen[key] === "") && 
      ( (operandStepen[key-1] === "^") || (operandStepen[key-1] === "**") )  &&
      (operandStepen[key+1] === "-") ) {

          operandStepen[key+2] = String(-1*operandStepen[key+2]); 
          operandStepen.splice(key,2);
      };
  };

/*1)Выполнение[^]: */
          //
  let vozvedStepen = {
      stepen: function(arr) { do {  
           for (let i = 0; i < arr.length; i++) {
              if ( (arr[i] === "^") || (arr[i] === "**") ) {
                  let mas = arr.slice( i-1, i+2 ); 
                 // console.log(JSON.stringify(mas));
                  let result = String( (+mas[0]) ** (+mas[2]) );
                //  console.log(JSON.stringify(result));
                  arr.splice((i-1), 3, result); //ниже аналог данной строчки
                 // arr.splice( (i-1), 3, ( String( +(arr[i-1]) ** (+(arr[i+1])) ) ) );
              };
           }; 
      } while ( arr.includes("^") || arr.includes("**") ); 
      return arr.join(""); 
      },
  };

      let e3 = vozvedStepen.stepen(operandStepen);

    //Уже не нужен  // ==>Алгоритм пост очистки после работы "по действиям" (деление, умножение и т.д)
    /* let posto4istka = {
          g: function(arr) { let a = arr;
              a.map((item, index, arr) => { return (typeof arr[index] === "number")  ?
              (arr[index+1] = "↑" && (arr[index-1] = "↑") ) : (arr[index]); });

              let b = a.slice().filter((item)=> {return item !== "↑" } ).join("");
              return b; 
            },
      };*/

      //
      //let e3 = posto4istka.g(e1); 
       //let e3 = e1.join(""); //
       


/*2) *///Подготовка [/]:
      //
      let operandDelenie = separateAlgoritm["z"](e3); //- присваивание действию переменной шоб не теряться в коде
      //console.log(JSON.stringify(separateAlgoritm["z"](e3))); //контоль

      // Удаление БАГА ДЕЛЕНИЯ на отрицательное число:
      for (let key = 0; key < operandDelenie.length; key++ ) {
          if ( (operandDelenie[key] === "") && (operandDelenie[key-1] === "/") &&
              (operandDelenie[key+1] === "-") ) {

                  operandDelenie[key+2] = String(-1*operandDelenie[key+2]); 
                  operandDelenie.splice(key,2);
              };
      };

/*2) *///Выполнение [/]:
      //
  let delenie = {
      del: function(arr) { do {  
           for (let i = 0; i < arr.length; i++) {
              if ( (arr[i] === "/") ) {
                  let mas = arr.slice( i-1, i+2 ); 
                 // console.log(JSON.stringify(mas));
                  let result = String( (+mas[0]) / (+mas[2]) );
                //  console.log(JSON.stringify(result));
                  arr.splice((i-1), 3, result); //ниже аналог данной строчки
                 // arr.splice( (i-1), 3, ( String( +(arr[i-1]) / (+(arr[i+1])) ) ) );
              };
           }; 
      } while (arr.includes("/")); 
      return arr.join("");
      },
  };

  let delen3 = delenie.del(operandDelenie);
      
  //let delen3 = posto4istka.g(delen1);
  //let delen3 = delen1.join(""); 
      
      //
/*3) *///Подготовка [*]: 
           //
  let operandDymnog = separateAlgoritm["z"](delen3); //- присваивание действию переменной шоб не теряться в коде

  //console.log(JSON.stringify(separateAlgoritm["z"](delen3))); //контоль
      //

  // Удаление БАГА УМНОЖЕНИЯ на отрицательное число:
      for (let key = 0; key < operandDymnog.length; key++ ) 
          {
              if ( (operandDymnog[key] === "") && (operandDymnog[key-1] === "*") &&
              (operandDymnog[key+1] === "-") ) {

                  operandDymnog[key+2] = String(-1*operandDymnog[key+2]); 
                  operandDymnog.splice(key,2);
              };
          };
  //
      //
/*3)Выполнение[*]: */
  // 
 let ymnogenie = {
      ymn: function(arr) { do {  
           for (let i = 0; i < arr.length; i++) {
              if ( (arr[i] === "*") ) {
                  let mas = arr.slice( i-1, i+2 ); 
                 // console.log(JSON.stringify(mas));
                  let result = String( (+mas[0]) * (+mas[2]) );
                //  console.log(JSON.stringify(result));
                  arr.splice((i-1), 3, result); //ниже аналог данной строчки
                 // arr.splice( (i-1), 3, ( String( +(arr[i-1]) * (+(arr[i+1])) ) ) );
              };
           }; 
      } while (arr.includes("*")); 
      return arr.join(""); 
      },
  };
  

  //console.log(JSON.stringify(operandDymnog))
  let ymnog3 = ymnogenie.ymn(operandDymnog);
  //console.log(JSON.stringify(ymnog1))

  //let ymnog3 = posto4istka.g(ymnog1);
  //let ymnog3 = ymnog1.join(""); 
  //

/*4) *///Подготовка [-]: 
     //

     let operandMinus = separateAlgoritm["z"](ymnog3); //- присваивание действию переменной шоб не теряться в коде
     // console.log(JSON.stringify(operandMinus)); //контоль
     //
          
      //Удаления бага, когда +- или -+ идет подряд, либо скобки типа -(1-2):
      for (let key = 0; key < operandMinus.length; key++ ) 
          {
              if ( (operandMinus[key] === "") && (operandMinus[key-1] === "-") &&
               (operandMinus[key+1] === "+") ) {

                  operandMinus[key+1] = "-"; 
                  operandMinus[key-1] = " ";

              } else if ( (operandMinus[key] === "") && (operandMinus[key-1] === "+") &&
               (operandMinus[key+1] === "-") ) {

                  operandMinus[key-1] = " ";

              } else if ( (operandMinus[key] === "") && (operandMinus[key-1] === "-") && //для раскрытия скобок с минусом перед скобками
               (operandMinus[key+1] === "-") ) {

                  operandMinus[key+1] = "+";
                  operandMinus[key-1] = " ";
              };
          };
          //console.log(JSON.stringify(operandMinus) )

      //Затем,удаления бага при подряд вычитании(из отрицательного вычесть элемент с отрицанием но не в кач пред элемента, а внутри элемента когда типа намбер -1 например):
         for (let key = 0; key < operandMinus.length; key++ ) 
          {
              if ((operandMinus[key+1] === "-") && (operandMinus[key-1] === "-" ) ) 
              {
                  operandMinus[key+1] = operandMinus[key+2] * (-1);
                  operandMinus[key+2] = "0"; //или "" 
              };
          };
          //console.log(JSON.stringify(operandMinus) );
      //

/*4) *///Выполнение [-]: 
      //
      let vichitanie = {
          minus: function(arr) { return arr.slice().map((item, index, arr) => {  
                  return (item === "-") ? ((+arr[index-1]) - (+arr[index+1]) ) : 
                  arr[index];
          } ) },
      };

      let minus1 = vichitanie.minus(operandMinus);

      //console.log(JSON.stringify(minus1) )
      let chistkaMinusa = {
          m: function(arr) { let a = arr;
              a.map( (item, index, minus2) => {
                  return (typeof minus2[index] === "number")  ? 
                  (minus2[index+1] = "↑" && (minus2[index-1] = "↑") ) :
                  (minus2[index]) } );

              let b = a.slice().filter( (item) => { return item !== "↑" } );
              return b;
              },
      };

      let minus3 = chistkaMinusa.m(minus1);
      console.log(JSON.stringify(minus3) );
      // 

/*5)[Итоговое число - cложение (положительных и отрицательных) чисел) ]:*/
      //
      let sumAndMinusMass = [];
      for (let elem of minus3) { 
      (elem !== "+") ? ( sumAndMinusMass.push(elem) ) : false;          
      }; 
      let Resultat = sumAndMinusMass.reduce( (sum,item) => sum + +item, 0);

      //Проверка на корректность нулевого сивмола:
      zeroErrorElemetCheck(); 
          function zeroErrorElemetCheck() {
              if ( (str1[0] === nullSymb[0] ) || (str1[0] === nullSymb[1] ) ||
              ( str1[0] === nullSymb[2] ) || ( str1[0] === nullSymb[3] ) ) {
             Resultat = "Некорректный ввод"; 
              };
          };  
      //
          //вариант когда в примере идет --2 пока не трогаем

             /* ПРОВЕРКА ПО ДЕЙСТВИЯМ:  **/
      
  /*[^]:*/  
         //console.log(JSON.stringify(e1));
          //console.log(JSON.stringify(e3) );
         
  /*[*]:*/ 
         //console.log(JSON.stringify(ymnog1) );
            //console.log(JSON.stringify(ymnog3) );

  /*[/]:*/ 
          
         //console.log(JSON.stringify(delen1) );
        //console.log(JSON.stringify(delen3) );

  /*[-]:*/ 
         //console.log(JSON.stringify(operandMinus) );
         //console.log(JSON.stringify(minus1) );
         //console.log(JSON.stringify(minus3) );

  /*[Итоговые значение суммы и разности]:*/
         //console.log(JSON.stringify(sumAndMinusMass) ); 
       console.log(JSON.stringify(Resultat) );


return Resultat;   //конец глобальной функции      
};
/*конец ядра вычислений */


