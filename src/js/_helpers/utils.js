// export const MyUtils=class MySet{
//     constructor() {
//         this.arr=[]
//     }
//     add(obj){
//         if(!this.arr.includes(obj)){
//             this.arr.push(obj)
//         }
//     }
//
//     get arr(){
//         return this.arr;
//     }
// }

export function MyUtils(){
    function MySet(){
        let obj=new Object();
        obj.arr=[]
        obj.add=function (element) {
            if(!this.arr.includes(obj)){
            this.arr.push(obj)
            }
        }
        return obj;
    }
}

