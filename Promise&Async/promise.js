// // 创建promise对象
// const promise = new Promise((resolve,reject)=>{
//     fetch('http://jsonplaceholder.typicode.com/posts').then(response=>{
//         // console.log(response)
//         return response.json()
//     }).then(data=>{
//         resolve(data)
//         console.log(data)
//     }).catch(err=>{
//         reject(err)
//     })
// })

async function asyncFn (){
    const promiseItem = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('second')
        }, 2000);
    })

    console.log('first');
    await promiseItem.then(res=>console.log(res))
    console.log('three')
}


asyncFn();

