import nlp from "compromise";

const extractEntities = (text) => {
  const peopleNames = nlp(text).people();
  //   const characterNames = new Set();
  //   const lines = text.split("\n");

  //   //   lines.forEach((line) => {
  //   //     const match = line.match(/^([A-Z]+)(\s*\((.*?)\))?(?=(\n|$))/);
  //   //     if (match) {
  //   //       characterNames.add(match[1].trim());
  //   //     }
  //   //   });
  //   const peopleNames = [];
  //   const names = [...new Set(pilot.match(/\b([A-Z]+[ ]?)+\b/g))];
  //   names.forEach((name) => {
  //     console.log(name);
  //     const doc = nlp(name);
  //     const people = doc.people().text();
  //     if (people) {
  //       peopleNames.push(`Entity: ${people}`);
  //     }
  //   });
  //   console.log(peopleNames);
  return peopleNames;
};

export default extractEntities;
