const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 100);
  });

  const myPromise1  = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo1');
    }, 100);
  });


  myPromise
  .then((result)=>{
    console.log(result,"result")
  })

  myPromise1
  .then((result)=>{
    console.log(result,"result")
  })
  // .catch((reason) => {
  //   console.error("Had previously handled error");
  // }).finally((info) => console.log("All done"));








// async await 

function get1(){
    return myPromise
}

function get2(){
    return myPromise1
}

async function getData(){
    let name1 = await get1() //1000 ? foo
    console.log(name1)
    let name2 = await get2() //100 ? foo1
    console.log(name2)
}

getData()




  Promise.all([myPromise, myPromise1]).then((values) => {
    console.log(values);
  });








































  
//   .catch((reason) => {
//     if(reason === -999) {
//       console.error("Had previously handled error");
//     }
//     else {
//       console.error(`Trouble with promiseGetWord(): ${reason}`);
//     }
//    })
//   .finally((info) => console.log("All done"));


