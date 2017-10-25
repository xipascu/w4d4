const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${argv}' OR last_name = '${argv}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
  console.log(result);

  //- 1: Abraham Lincoln, born '1809-02-12'
  
    console.log('Searching ...')
    console.log(`Found ${result.rows.length} person(s) by the name of ${argv}`)
    // // console.log(`this is another try: ", result.rows.id`);
    for (let person in result.rows) {
     const{id, first_name, last_name, birthdate} = result.rows[person];
     console.log(birthdate.length);
     const year = birthdate.getFullYear();
     let month = birthdate.getMonth()+1;
     month = (month > 9) ? month : '0' + month;
    //  let day = birthdate.getDay()+1;
    // if (month > 9) {

    }

//  -----FIX DAY

    //  const id = result.rows[person].id;
    //  const firstN = result.rows[person].first_name;
    //  const lastN = result.rows[person].last_name;
    //  const dob = result.rows[person].birthdate;
    
    console.log(`- ${id} - ${first_name} ${last_name} born '${year}-${month}-${day}'`);

    //  console.log("- " + id + " - " + first_name + " " + last_name + ", born '" + year + "'");
    }
    client.end();
  });
});