
 function loadQuestions()
 {

     let xmlRe = new XMLHttpRequest();
     xmlRe.onreadystatechange = Questions;
     xmlRe.open('GET', '/questionsFile',true);
     xmlRe.send();
 }

 function Questions()
 {
     if(this.readyState == 4 && this.status == 200)
     {
         let questionPage = document.getElementById('questionsPage');
         let questionList = JSON.parse(this.responseText);
         let content = "";
         let questionNum = 0;
         content+='<h2>Good Luck</h2><br/>'
         content += '<form action=javascript:CalcGrade()>';

         for(qNum of questionList)
         {
             content += '<p>' + qNum.stem + '</p>';

             let aNum = 0;
             
             for(num of qNum.options)
             {
                 content += '<input type="radio" id="answer ' + num + '" name="' + qNum.stem + '" onclick=Checks(' + questionNum + ',' + aNum + ')>';
                 content += '<label for="answer ' + num + '">' + num + '</label></br>';
                 aNum++;
             }
             
             content += '</br><div id=\'answerT' + questionNum + '\' name=answers></div>';
             questionNum++;
         }

         content += '</br><input type="submit" value="Submit" id="submitButton">';
         content += '</form>';
         content += '<div id=\'mark\'></div></br>';
         questionPage.innerHTML = content;
    }
 }

 function Checks(questionIndex,answerIndex)
 {
     let xmlRe = new XMLHttpRequest();
     xmlRe.onreadystatechange =Solutions;
     xmlRe.open('GET', `/solutions?ques=${questionIndex}&ans=${answerIndex}`,true);
     xmlRe.send();

 }

 function Solutions()
 {
     if(this.readyState == 4 && this.status == 200)
     {
         const myAnswer = this.responseText.split(" ")
         let answerT = document.getElementById('answerT' + myAnswer[1]);
         answerT.innerHTML = myAnswer[0];

     }

 }


 function Grade()
 {
     if(this.readyState == 4 && this.status == 200)
     {
         let mark = document.getElementById('mark');
         let correctAns = 0;

         let answerButtons = document.getElementsByName("answers");
         for(let count = 0; count<5; count++)
         {
             if(answerButtons[count].innerHTML == "Correct!")
             {
                correctAns++;
             }
         }

         if(correctAns>=3)
         {
            mark.innerHTML = "You Passed and your grade is: " + correctAns +"/5";

         }
         else
         {
            mark.innerHTML = "You Failed and your grade is: " + correctAns +"/5";

         }

     }
 }

 function CalcGrade()
 {
     let submitButton = document.getElementById('submitButton');
     submitButton.remove();
     let xReq = new XMLHttpRequest();
     xReq.onreadystatechange = Grade;
     xReq.open('GET', `/`, true);
     xReq.send();
 }


