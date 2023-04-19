const fs = require('fs');


//Use a menu to select missing cores, or all to see every double dip
const missingCores = ['Core Integrations :: Experiential Learning for Social Justice','Core Foundations :: Cultures and Ideas 3','Core Explorations :: Religion, Theology and Culture 2','Core Explorations :: Religion, Theology and Culture 3'];

//current courses downloaded from workday, has to be updated every quarter
//I ran the excel file through a website to make a json so its easier
const course_file = 'courses.json';

//read data in
const data = fs.readFileSync(course_file);
const df = JSON.parse(data);

//any class that has more than one core from missing cores is printed out
const classList = [];
for (let i = 0; i < df.length; i++) {
  try {
    //cores that the class fulfills
    const tempList = df[i]['Course Tags'].split("\n\n");
    let counter = 0;
    for (let j = 0; j < tempList.length; j++) {
      if (missingCores.includes(tempList[j])) {
        counter++;
      }
    }
    if (counter >= 2) {
      //course fulfills at least two cores so add to output
      classList.push(df[i]['Course Section']);
    }
  } catch (error) {
    //no cores fulfilled by this class
    //move on to next class
  }
}

console.log(classList);
