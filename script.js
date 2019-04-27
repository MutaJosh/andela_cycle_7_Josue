
	function balanceScale(){
		var weightInp = document.getElementById('input1').value;
		var availableWeight = document.getElementById('input2').value;

		var weightArr = weightInp.split(",");
		var avWeightArr = availableWeight.split(",");

		if (weightArr[0] == 8) {
			console.log(weightArr[0] + weightArr[1]);
		}


		// console.log(avWeightArr);
}
