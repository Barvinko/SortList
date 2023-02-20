let dataJson = `{"data":[{"user": "tom@gmail.com", "age": "18", "rating": "17", "disabled": false},
                    {"user": "mike@gmail.com", "age": "18", "rating": "20", "disabled": false},
                    {"user": "greg@gmail.com", "age": "18", "rating": "14", "disabled": false},
                    {"user": "josh@gmail.com", "age": "18", "rating": "25", "disabled": true},
                    {"user": "pol@gmail.com", "age": "17", "rating": "11", "disabled": false}],
            "condition": {"include": [{"disabled": false},{"age": "18"}], "sort_by": ["rating"], "exclude": [{"rating": "25"}]}}`
dataJson = JSON.parse(dataJson);
console.log(dataJson);

// Get keys "condition" for understand what needs to be done with data
let conditionKey = Object.keys(dataJson.condition);
console.log(conditionKey);
let data = {...dataJson}

//Numbers of cycles depends on number of keys of "condition", that is from number of types of operations 
for (let i = 0; i < conditionKey.length; i++) {
    //Set name needed operations from "conditionKey", so operations will be fulfill which were written to object "dataJson"
    switch (conditionKey[i]) {
        case 'include':
            //Numbers of cycles depends on number columns for processing. Example: 
                //"include": [{"disabled": false},{"age": "18"}], so we have two fields(colums), this means will be two cycle
            for (let i = 0; i < data.condition.include.length; i++) {
                //Get name fields(colums) whose values will be processed
                let includeKey = Object.keys(data.condition.include[i]);
                //with help built-in function filter, which create array with element which passed check
                data.data = data.data.filter((field) => field[includeKey[0]] == data.condition.include[i][includeKey[0]]); 
            }
            break;
        case 'sort_by':
            //I did not create cycle for sort, because sort can only one fields(colums), if who wants to writ more one field to "sort_by", code will use only first field    
            //function "sort" sort fields of object, from min to max values
            data.data.sort((a,b) =>{
                return a[data.condition.sort_by[0]] > b[data.condition.sort_by[0]] ? 1 : -1;
            });
            break;
        case 'exclude':

            for (let i = 0; i < data.condition.exclude.length; i++) {
                let excludeKey = Object.keys(data.condition.exclude[i]);
                data.data = data.data.filter((field) => field[excludeKey[0]] != data.condition.exclude[i][excludeKey[0]]); 
            }
            break;
        default:
            console.log('There is no processing module for this "condition"')
            break;
    }    
}
let feetback = new Object();
feetback.result = [...data.data];

//create HTML
let boxThead = document.querySelector('thead tr');
let columns = Object.keys(feetback.result[0]);
//create header with names of columns
for (let i = 0; i < columns.length; i++) {
   boxThead.innerHTML += `<th scope="col">${columns[i].toUpperCase()}</th>` 
}

let boxTbody = document.querySelector('tbody');
//filling <tbody> us data
for (let i = 0; i < feetback.result.length; i++) {
    //create cell with unique "id"
    boxTbody.innerHTML += `
        <tr id = "tr${i}">
        </tr>`
    //create filling to cell
    for (let j = 0; j < columns.length; j++) {
        let TbodyIn = document.querySelector(`#tr${i}`);
        TbodyIn.innerHTML += `<td>${feetback.result[i][columns[j]]}</td>`
    }    
}

console.log(feetback);
feetback = JSON.stringify(feetback);
console.log(feetback);





