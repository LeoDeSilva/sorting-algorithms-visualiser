

let i =10
let w 
let highlight

let states=[]
let selectStates = []

let quick = document.getElementById("q")
let bubbles = document.getElementById("b")
let shell = document.getElementById("s")
let heap = document.getElementById("h")
let select = document.getElementById("se")
let radixs = document.getElementById("r")
let insertion = document.getElementById("i")
let bogo = document.getElementById("bo")

let id = 0


function preload(){
  
  w = createSlider(1,20,5,1)
  w.position(20,windowHeight-35)
  button = createButton('Retry');
  button.position(180, windowHeight-70);
  button.style(' outline: none;border: none;color: white; width:70px;height:40px;border-radius:10px;')
  highlight = createSlider(0,1,1,1)
  highlight.position(160,windowHeight-70)



}

function setup() {

  createCanvas(windowWidth, windowHeight-100);
  values = new Array(floor(width/ w.value()));
  for (let i = 0; i < values.length; i++){
    values[i] = random(height);
    states[i] = -1;
    selectStates[i] = -1;
  }
  highlight.remove()
  if(id != 0){
    
      highlight.remove()
      button.position(180, windowHeight-47);
  }else{
    highlight = createSlider(0,1,1,1)
    highlight.position(160,windowHeight-35)
    button.position(320, windowHeight-47);
  }

  if(id == 0){
    
    quickSort(values,0,values.length-1)
  }else if (id == 2){
    shellSort(values)
  }else if (id == 3){
    heapsort(values)
  }else if (id == 4){
    selectionSort(values)
  }else if (id == 5){
    radixSortUint32(values)
  }else if (id == 6){
    insertionSort(values)
  }else if (id == 1){
    bubblesort(values)
  }

  w.changed(pri)
  button.mousePressed(pri);


}


async function shellSort(arr) {
	let n = arr.length;

	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))	{
    
		for (let i = gap; i < n; i += 1)  {
      await sleep(0)
			let temp = arr[i];
			
			let j;
			for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
        
        arr[j] = arr[j-gap];
        
			}
      
			arr[j] = temp;
		}
	}

	return arr;
}
function pri(){
  setup()
}
function draw() {
  background(51);

  
  if (id == 7){
    sorted = isSorted(values)
    console.log(sorted)
    if (sorted == false){
      shuffleArray(values)
    }
  }


  fill(51)
  rect(10,25,)
  noStroke();
  fill(255);
  textSize(20)

  if(id == 0){
    text("Quick sort",15,30);
  }else if (id == 1){
    text("Bubble sort",15,30);
  }else if (id == 2){
    text("Shell sort",15,30);
  }else if (id == 3){
    text("Heap sort",15,30);
  }else if (id == 4){
    text("Selection sort",15,30);
  }else if (id == 5){
    text("Radix sort",15,30);
  }else if (id == 6){
    text("Insertion sort",15,30);
  }else if (id == 7){
    text("Bogo sort",15,30);
  }


  for (let i = 0; i < values.length; i++){
    if (id == 1){
      if(highlight.value() == 0){
        stroke(0)
      }else{
        noStroke()
      }
    }else{
      noStroke()
    }
    
    fill(255)
    if(states[i] == 0 && id == 0){
      fill(255,0,0)
      // fill('#E0777D')
    }else if (states[i] == 1 && highlight.value() == 1  && id == 0){
      fill('#D6FFB7')
    }

    if(selectStates[i] == 0 ){
      console.log(selectStates)
      fill(255,0,0)
      rect(i*w.value(),height - values[i], w.value(), values[i])
      selectStates[i] = -1
      // fill('#E0777D')
    }
    rect(i*w.value(),height - values[i], w.value(), values[i])
  }
}
async function radix (){
  const maxNum = Math.max(...values) * 10;
  let divisor = 10;
  while (divisor < maxNum) {
  
     let buckets = [...Array(10)].map(() => []);
    for (let num of values) {
        buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
     }
     
     values = [].concat.apply([], buckets);
     divisor *= 10;
  }
}
async function bubbleswap(arr,a,b){
  await sleep(0)
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

async function swap(arr,a,b){
  await sleep(0);
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}


async function quickSort(arr,start,end){
  if(id == 0){

    if (start>=end){
      return;
    }
  
    
    let index = await partition(arr,start,end)
    states[index] = -1;
    await Promise.all([
      quickSort(arr,start,index-1),
      quickSort(arr,index+1,end)
    ]);
  
  }

}
async function partition(arr,start,end){

  for (let i = start; i < end; i++){
    states[i] = 1
  }


  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0
  for (let i = start; i < end; i++){
    if (arr[i] < pivotValue){
      await sleep(15)
      await swap(arr,i,pivotIndex);
      states[pivotIndex] = -1
      pivotIndex++;
      states[pivotIndex] = 0
    }
  }

  await swap(arr,pivotIndex,end);

  for (let i = start; i < end; i++){
    if ( i != pivotIndex){
      states[i] = -1
    }
  
  }

  return pivotIndex
}
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}
async function bubble(){
  i=0
  if (i < values.length){
    for (let j = 0; j < values.length - i - 1; j++){
      let a = values[j]
      let b = values[j+1]
      await sleep (10)
      if (a>b){
        
        await swap(values,j,j+1);
      }
    }
  }
}

function swap(a, i, j) {
  var tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

function max_heapify(a, i, length) {
  while (true) {
      var left = i*2 + 1;
      var right = i*2 + 2;
      var largest = i;

      if (left < length && a[left] > a[largest]) {
          largest = left;
      }

      if (right < length && a[right] > a[largest]) {
          largest = right;
      }

      if (i == largest) {
          break;
      }

      swap(a, i, largest);
      i = largest;
  }
}

async function heapify(a, length) {
  for (var i = Math.floor(length/2); i >= 0; i--) {
    await sleep(10)
      max_heapify(a, i, length);
  }
}

async function heapsort(a) {
 await heapify(a, a.length);

  for (var i = a.length - 1; i > 0; i--) {
    await sleep(30)
      swap(a, i, 0);

      max_heapify(a, 0, i-1);
  }
}

async function selectionSort(inputArr) { 
  let n = inputArr.length;
    console.log(selectStates)
  for(let i = 0; i < n; i++) {

      let min = i;
      await sleep(40  )
      for(let j = i+1; j < n; j++){
        
          if(inputArr[j] < inputArr[min]) {
              min=j; 
          }
          // selectStates[j] = 0

         
     
          
       }
       if (min != i) {
           let tmp = inputArr[i]; 
           inputArr[i] = inputArr[min];
           inputArr[min] = tmp;     
         
      }
  }
  return inputArr;
}

async function radixSortUint32(input) {
  const arrayConstr = input.length < (1 << 16) ?
    Uint16Array :
    Uint32Array;
  const numberOfBins = 256 * 4;
  let count = new arrayConstr(numberOfBins);

  let output = new Uint32Array(input.length);

  // count all bytes in one pass
  for (let i = 0; i < input.length; i++) {

    let val = input[i];
    count[val & 0xFF]++;
    count[((val >> 8) & 0xFF) + 256]++;
    count[((val >> 16) & 0xFF) + 512]++;
    count[((val >> 24) & 0xFF) + 768]++;
  }

  // create summed array
  for (let j = 0; j < 4; j++) {
    await sleep(10)
    let t = 0,
      sum = 0,
      offset = j * 256;
    for (let i = 0; i < 256; i++) {
      t = count[i + offset];
      count[i + offset] = sum;
      sum += t;
    }
  }

  for (let i = 0; i < input.length; i++) {
    let val = input[i];
    output[count[val & 0xFF]++] = val;
  }
  for (let i = 0; i < input.length; i++) {
    await sleep(10)
    let val = output[i];
    input[count[((val >> 8) & 0xFF) + 256]++] = val;
  }
  for (let i = 0; i < input.length; i++) {
    await sleep(10)
    let val = input[i];
    output[count[((val >> 16) & 0xFF) + 512]++] = val;
  }
  for (let i = 0; i < input.length; i++) {
    await sleep(10)
    let val = output[i];
    input[count[((val >> 24) & 0xFF) + 768]++] = val;
  }

  return input;
}
async function insertionSort(inputArr) {
  let n = inputArr.length;
      for (let i = 1; i < n; i++) {
        await sleep(20)
          let current = inputArr[i];
          let j = i-1; 
          while ((j > -1) && (current < inputArr[j])) {
            
              inputArr[j+1] = inputArr[j];
              j--;
          }
          inputArr[j+1] = current;
      }
  return inputArr;
}
async function gnomeSort(arr) 
{
    function moveBack(i){
        for( ; i > 0 && arr[i-1] > arr[i]; i--)
        {
            var t = arr[i];
            arr[i] = arr[i-1];
            arr[i-1] = t;
        }
    }
    for (var i = 1; i < arr.length; i++) 
    {
      await sleep(0)
        if (arr[i-1] > arr[i]) moveBack(i);
    }
    return arr;
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1])
          return false;
  }
  return true;
}

async function bubblesort(inputArr) {
  let n = inputArr.length;
  
  for(let i = 0; i < n; i++) {
    await sleep(35)
      for(let j = 0; j < n; j++) {
          if(inputArr[j] > inputArr[j+1]){
              let t = inputArr[j];
              inputArr[j] = inputArr[j+1];
              inputArr[j+1] = t;
          }
          

      }
      
  }
  return inputArr;
}
function updateId0(){
  id = 0
  console.log(id)
  quick.classList.add("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId1(){
  id = 1
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.add("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId2(){
  id = 2
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.add("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId3(){
  id = 3
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.add("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId4(){
  id = 4
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.add("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId5(){
  id = 5
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.add("selected")
  insertion.classList.remove("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId6(){
  id = 6
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.add("selected")
  bogo.classList.remove("selected")
  pri()
}
function updateId7(){
  id = 7
  console.log(id)
  quick.classList.remove("selected")
  bubbles.classList.remove("selected")
  shell.classList.remove("selected")
  heap.classList.remove("selected")
  select.classList.remove("selected")
  radixs.classList.remove("selected")
  insertion.classList.remove("selected")
  bogo.classList.add("selected")
  pri()
}
