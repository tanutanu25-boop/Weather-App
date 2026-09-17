fetch(" https://jsonplaceholder.typicode.com/users")
.then((response)=>response.json())
.then((data)=>{console.log(data)})



async function getData() {

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/"
    );

    const data = await response.json();

    console.log(data);

  } catch(error) {

    console.log("something went wrong");

  }

}

getData();