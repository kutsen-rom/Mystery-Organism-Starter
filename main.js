// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
       
      const random = returnRandBase();
      const i  = Math.floor(Math.random() * 15);
   if (this.dna[i] !== random) {
     this.dna[i] = random;
   } else {
     while (this.dna[i] === random) {
       this.dna[i] = returnRandBase();
       
     }
   }
  },
  compareDNA(pAequor) {
    let count = 0;
    let sum = 0;
    for (let i=0; i<pAequor.dna.length; i++) {
      if (this.dna[i] === pAequor.dna[i]) {
        count += 1;
      }
     }
     sum = (count / this.dna.length) * 100;
     console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${sum.toFixed(2)}% DNA in common`)
    },
    /* version without console log with return value for findMostRelated()*/
    compareDNAReturn(pAequor) {
      let count = 0;
      let sum = 0;
      for (let i=0; i<pAequor.dna.length; i++) {
       
        
        if (this.dna[i] === pAequor.dna[i]) {
          count += 1;
           
        }
       
       }
       sum = (count / this.dna.length) * 100;
       
       return sum
      },
  willLikelySurvive() {
    let count = 0;
    for (let i=0; i<this.dna.length; i++) {
      if (this.dna[i] === 'C' || this.dna[i] === 'G'){
        count += 1;
      }
    }
      return (count/this.dna.length)*100 >= 60;
  },
  complementStrand() {
    const complementaryDNA = [];
    for (let i=0; i<this.dna.length; i++) {
      switch (this.dna[i]) {
        case 'A':
              complementaryDNA.push('T')
              break;
        case 'T': 
             complementaryDNA.push('A')
             break;
        case 'C':
              complementaryDNA.push('G')
              break;
        case 'G':
              complementaryDNA.push('C')
              break;
              default: console.log('Something gone wrong');
              break;
      }
      }
      return complementaryDNA;
    }
  }


}


const num1 = pAequorFactory(1, ['A', 'G', 'C', 'C', 'C', 'G', 'G', 'C', 'A', 'G', 'C', 'C', 'A', 'G', 'T']);
const num2 = pAequorFactory(2, ['A', 'T', 'T', 'G', 'A', 'G', 'T', 'C', 'A', 'G', 'T', 'C', 'A', 'G', 'T']);






const specimens = [];

 
  for (let i=0; specimens.length<30; i++){
    const object = (pAequorFactory(i, mockUpStrand()));
  if (object.willLikelySurvive()) {
    specimens.push(object)}
  }

  const findMostRelated = arr =>{
  let mostRelated = 0;
  let strand1 = [];
  let strand2 = [];
  for (let i=0; i<arr.length; i++) {
   
   for (let j=i+1; j<arr.length; j++){
     
    let minValue = arr[i].compareDNAReturn(arr[j]);
    if (minValue > mostRelated) {
      mostRelated = minValue;
      strand1 = arr[i];
      strand2 = arr[j];
    }   }
    }
     return `The most related strands are strand #${strand1.specimenNum} and strand #${strand2.specimenNum} with ${mostRelated.toFixed(2)}% of common DNA`
   }
console.log(findMostRelated(specimens))

  /*  
  1) чтоб compareDNA() оставлял свое значение в let mostRelated;
  2) if compareDNA > mostRelated 
      mostRelated = compareDNA
  


      ----

    1) функция которая ищет наибольшее число compareDNA
    2) создаются переменные mostRelated со значением 0
  */