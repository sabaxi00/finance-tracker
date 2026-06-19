let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];



function save(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}




function addTransaction(){


let title =
document.getElementById("title").value;


let amount =
Number(document.getElementById("amount").value);


let type =
document.getElementById("type").value;



if(title=="" || amount<=0){

alert("Enter valid details");

return;

}




let transaction={

id:Date.now(),

title:title,

amount:amount,

type:type

};



transactions.push(transaction);


save();


display();


document.getElementById("title").value="";
document.getElementById("amount").value="";


}




function display(){


let list =
document.getElementById("list");


list.innerHTML="";



let income=0;

let expense=0;



transactions.forEach(t=>{


let li=document.createElement("li");


li.className=t.type;



li.innerHTML=

`
${t.title}

<br>

₹${t.amount}

<button onclick="deleteTransaction(${t.id})">
❌
</button>

`;



list.appendChild(li);



if(t.type=="income"){

income+=t.amount;

}

else{

expense+=t.amount;

}



});




document.getElementById("income")
.innerHTML="₹"+income;


document.getElementById("expense")
.innerHTML="₹"+expense;


document.getElementById("balance")
.innerHTML=
"₹"+(income-expense);



}




function deleteTransaction(id){


transactions =
transactions.filter(
t=>t.id!==id
);


save();

display();


}




document
.getElementById("darkBtn")
.onclick=function(){


document.body.classList.toggle("dark");


};




display();