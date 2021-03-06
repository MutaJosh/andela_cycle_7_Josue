
      /*                      =========================
                            |                       |
                            |   Scale balancing     |
                        	|                       |
                            =========================                   

                                                                                                    */
function ScaleBalancing(arrBoth) { 

		const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift());


		var weightInp = document.getElementById('input1').value;
		var availableWeight = document.getElementById('input2').value;

		var myAr1 = weightInp.split(",").map(Number);
		var myAr2 = availableWeight.split(",").map(Number);

		var arrBoth = new Array();
		arrBoth[0] = format('[%s]',myAr1);
		arrBoth[1] = format('[%d]', myAr2);

    let objects = arrBoth[0].substr(1, arrBoth[0].length-2).split(',').map(object => parseInt(object));
    let weights = arrBoth[1].substr(1, arrBoth[1].length-2).split(',').map(weight => parseInt(weight));
    
    /*
        Generate all possible combinations of weights AND permutations of left/right - 3^n time
        0 - Weight not in use
        1 - Weight on left side
        2 - Weight on right side
    */

    let combos = [];

    for (let i = 0, max = Math.pow(3, weights.length); i < max; i++) {
        let combo = i.toString(3);
        let numWeights = combo.split('').reduce((a,v) => a + (parseInt(v) > 0 | 0), 0);
                                                                                                                   
        if (numWeights > 2) {
            continue;
        }

        while (combo.length < weights.length) {
            combo = '0' + combo;
        }
        
        combos.push(combo);
    }
    
    
    // Test combos
    let goodCombos = [];

    combos.forEach(function(combo){
        let left = objects[0];
        let right = objects[1];
        
        for (let i = 0; i < combo.length; i++) {
            if (combo[i] === '1') {  // Left
                left += weights[i];
            }

            if (combo[i] === '2') {  // Right
                right += weights[i];
            }
        }
        
        if (left === right) {
            goodCombos.push(combo);
        }
    });
    
    if (goodCombos.length === 0) {
        console.log('Scale Imbalanced!');
    }
    
    // Sort first by number of physical weights used, then by total weight if there are multiple sets
    goodCombos.sort(function(a, b){
        let aCount = a.split('').reduce((ac,v) => ac + (parseInt(v) > 0 | 0), 0);
        let bCount = b.split('').reduce((ac,v) => ac + (parseInt(v) > 0 | 0), 0);
        
        if (aCount < bCount) {
            return -1;
        }
        if (aCount > bCount) {
            return 1;
        }
        // aCount === bCount -> must check weights and use lesser weight total
        
        let aTotal = 0;
        let bTotal = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== '0') {
                aTotal += weights[i];
            }
            if (b[i] !== '0') {
                bTotal += weights[i];
            }
        }
        return aTotal - bTotal;
    });
    console.log(goodCombos);
    
    let theCombo = goodCombos[0];
    let finalWeights = [];
    theCombo.split('').map(function(value, index) {
        if (value !== '0') {
            finalWeights.push(weights[index]);
        }
    });
         
    document.getElementById('results').innerHTML = finalWeights.sort((a,b) => a-b).join(',');
    console.log("Balanced!"); 

}
   