const array = [23, 44, 12];
let myFunc = (a) => {
    console.log(`too: ${a}`);
}
const arr2 = [...array, 44, 223];
myFunc(array[1]);