var obj1, obj2, allText;
var outText = [];
var direcList = [];
var mRat= [];

function readTextFile(file)
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				allText = rawFile.responseText;
				alert(allText);
				outText = JSON.parse(allText);


				for(i=0; i<250; i++) {
					obj1 = outText[i];
					var indD = direcList.indexOf(obj1["director"]);
					if (indD<0) {
						direcList.push(obj1["director"]);
					}
				}

				for(var i=0; i < direcList.length ; i++){
					var Dname = direcList[i];
					//console.log(direcList[i])

					for(var j=0; j < outText.length ; j++){
						obj2 = outText[j];
						var movies = {
							rat : 0,
							name : ""
						};
						var currentDirec = obj2["director"];
						if(Dname === currentDirec){

							movies.rat = parseFloat(obj2["rating"]);
							movies.name = obj2["title"];

							mRat.push(movies);
						}

					}

					function sortRating(a, b) {
						return b.rat - a.rat;
					}


					mRat.sort(sortRating);
					var movieName =[];
					for( var  k=0; k < mRat.length; k++){
						movieName.push(mRat[k].name);

					}
					// console.log(movies);
					console.log( movieName.shift() + " : " , movieName);




					console.log(mRat);
					mRat = [];
				}




			}
		}
	}
	rawFile.send(null);
}

readTextFile("input.json");


