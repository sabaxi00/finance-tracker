
let balance = 0;

let transactions = 
JSON.parse(localStorage.getItem("transactions")) || [];



function update(){


let list=document.getElementById("list");


list.innerHTML="";


balance=0;



transactions.forEach((item,index)=>{


if(item.type=="income"){

balance += item.amount;

}

else{

balance -= item.amount;

}



let li=document.createElement("li");


li.innerHTML=

`
${item.name}
₹${item.amount}

<button class="delete"
onclick="deleteTransaction(${index})">
X
</button>

`;



list.appendChild(li);


});



document.getElementById("balance").innerHTML=balance;



localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);



}



function addTransaction(){


let name=
document.getElementById("text").value;


let amount=
Number(document.getElementById("amount").value);



let type=
document.getElementById("type").value;



if(name=="" || amount==""){

alert("Enter details");

return;

}



transactions.push({

name:name,

amount:amount,

type:type

});



update();



document.getElementById("text").value="";

document.getElementById("amount").value="";


}




function deleteTransaction(index){


transactions.splice(index,1);


update();


}




function darkMode(){


document.body.classList.toggle("dark");


}



update();
