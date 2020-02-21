// Function to check if (i, j) is valid matrix coordinate
function isvalid(i, j, mat) {
  return i >= 0 && i < mat.length && j >= 0 && j < mat.length;
}

function findPaths(mat, path, i, j) {
  // if we have reached the last cell, print the route
  if (i == mat.length - 1 && j == mat.length - 1) {
	// console.log("path: ", path);
	let p = []
	path.forEach(element => {
		p.push(element)
	});
	p.push({value : mat[i][j], row : i, col : j})
	pathObj.push(p)
    return;
  }

  // include current cell in path
  	path.push({value : mat[i][j], row : i, col : j});
//   path.push(mat[i][j]);

  // move right
  if (isvalid(i, j + 1, mat)) findPaths(mat, path, i, j + 1);

  // move down
  if (isvalid(i + 1, j, mat)) findPaths(mat, path, i + 1, j);

  // remove current cell from the path
  path.pop();
}

// Paths with locations information
var pathObj = [];
// Matrix to pass
let mat = [
  [1, -1, 1],
  [-1, 1, 1],
  [1, 1, 1]
];

// path object to pass in function
let path = [];

// start from (0, 0) cell
let x = 0,
  y = 0;

// Find all possible paths in Matrix
findPaths(mat, path, x, y);

// Paths score in array
let pathScore = []
// Total score in Matrix
let totalScore = 0
// Path for going to airport
let goingPath 


console.log(pathObj);

// Remove restricted paths
removeResitrictedPaths()

// Riders while going to airport
goingScore()

// Riders while comming back from airport
backScore()

// Total Riders Picked
console.log("Totel Riders: ",totalScore);

// console.log(pathObj);

function goingScore(){
	getGoingScore()
	console.log(pathScore);
	if (pathObj.indexOf(goingPath)!== -1) 
		totalScore = Math.max(...pathScore)
	console.log("Riders While Going: ", totalScore);
	goingPath = pathScore.indexOf(Math.max(...pathScore))
	let elm =pathObj[goingPath]
	if (pathObj.indexOf(goingPath)!== -1) 
	for (const v of elm) {
		v.value = 0
	}
	if (pathObj !== []) {
		pathObj[pathScore.indexOf(Math.max(...pathScore))] = elm	
	}
	// Removing Overlaping paths
	removeOverlapingPaths()
	console.log(pathObj);
}

function removeOverlapingPaths() {
	pathObj = pathObj.filter(function(value, index, arr){
		let flag = true 
		let elm =pathObj[goingPath]
		for (let i = 1; i < value.length-1 ; i++) {
			let node = value[i]
			for (let j = 1; j < elm.length-1 ; j++) {
					let elmNode = elm[j]
				if (node.row === elmNode.row && node.col === elmNode.col ) 
					flag = false 
			}
		}
		return flag
	});
}


function backScore(){
	pathScore = []
	getBackScore()
	if (pathScore.indexOf(1)!== -1) 
		totalScore += Math.max(...pathScore)
	console.log("Riders While comming Back: ", totalScore);
}

// Pick riders while going to airport
function getGoingScore (){
	pathObj.forEach(element => {
		let sum  = 0
		for (const node of element) {
			sum += node.value
		}
		pathScore.push(sum)	
	});
}

// Pick riders while comming back from airport
function getBackScore (){
	pathObj.forEach(element => {
		let sum  = 0
		for (let i = 1; i < element.length-1 ; i++) {
			sum += element[i].value
		}
		pathScore.push(sum)	
	});
}

// Omit the restricted paths
function removeResitrictedPaths(){
	pathObj = pathObj.filter(function(value, index, arr){
		let flag = true 
		for (const node of value) {
			if (node.value < 0 ) 
				flag = false 
		}
		return flag
	});
}

