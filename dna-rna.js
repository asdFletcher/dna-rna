const start_codon = "AUG";
const stop_codon = "STOP";
const codon_to_amino_acid = {
  AUG: "Met",
  CAA: "Gln",
  CAG: "Gln",
  GGU: "Gly",
  GCG: "Ala",
  UUU: "Phe",
  UUC: "Phe",
  UGG: "Trp",
  UAA: stop_codon,
  UAG: stop_codon,
  UGA: stop_codon,
};

/*
 * Complete the functions below.
 */

const isStartCodon = (testDNA) => {
  if (testDNA === start_codon) {
    return true;
  }
  return false;
};

const getStartCodonIndex = (dna) => {
  let startCodonIndex = undefined;
  const sequenceLength = 3;

  // add first 3 pairs and check
  let runningTriplet = dna.slice(0, 3);
  // add to end, remove from front, test if start_codon
  for (let i = sequenceLength; i < dna.length; i++) {
    if (isStartCodon(runningTriplet)) {
      startCodonIndex = i - sequenceLength;
      return startCodonIndex;
    }
    currentPair = dna[i];
    // add next pair to end
    runningTriplet = runningTriplet.concat(currentPair);
    // remove fist pair from start
    runningTriplet = runningTriplet.slice(1);
    // check
  }
  return startCodonIndex;
};

const translateGnaToRna = (dna) => {
  let rna = "";
  for (let i = 0; i < dna.length; i++) {
    rna = rna.concat(translatePairFromDnaToRna(dna[i]));
  }
  return rna;
};

const translatePairFromDnaToRna = (pair) => {
  if (pair.toUpperCase() === "T") {
    return "U";
  }
  return pair;
};

const removeIntrons = (dna) => {
  // a 97
  // t 116
  // c 99
  // g 103
  let res = "";
  for (let i = 0; i < dna.length; i++) {
    const letter = dna[i];
    if (
      letter.charCodeAt(0) !== 97 &&
      letter.charCodeAt(0) !== 116 &&
      letter.charCodeAt(0) !== 99 &&
      letter.charCodeAt(0) !== 103
    ) {
      res = res.concat(letter);
    }
  }
  return res;
};

const protein_synthesis_part_one = (dna) => {
  let aminoAcids = "";

  if (dna.length < 3) {
    return "INVALID";
  }

  // let dnaWithoutIntrons = removeIntrons(dna);
  const rna = translateGnaToRna(dna);
  const startIndex = getStartCodonIndex(rna);

  for (let i = startIndex; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    const aminoAcid = codon_to_amino_acid[codon];

    if (aminoAcid === stop_codon) {
      return aminoAcids;
    } else {
      aminoAcids = aminoAcids.concat(" " + aminoAcid);
    }
  }
  return "INVALID";
};

let input = "CAAATGCAGGCGTAA";
console.log(protein_synthesis_part_one(input));
