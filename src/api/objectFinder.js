var _ = require('lodash');
// const objs 

const southEastAsia = ["Thailand","Myanmar","Cambodia" , "Lao People's Democratic Republic", "Viet Nam",
"Malaysia", "Indonesia" , "Philippines" , "Singapore", "Brunei Darussalam" , "Timor-Leste"].sort();


function filterCountries(filterArray , sex="Both sexes"){
     const southEastAsiaCountries =  _.filter(objs , (o) => _.includes(filterArray , o.Location) && o.Dim1 === sex)
     return southEastAsiaCountries
}


// ? Get All Location Array
const southEastAsiaCountries = filterCountries(southEastAsia)
const period = _.reduce(southEastAsiaCountries , (a , b) => {
     if(! _.includes(a , b.Period)){
          a.push(b.Period)
     }
     return a
     },[])


const selected = _.reduce(period , (a , b) => {
     const filterByYear = _.filter(southEastAsiaCountries , (country) => {
          return country.Period === b
     })

     const zipData = _.reduce(filterByYear , (a , b) => {
          a.name = b.Period
          a.data = []
          _.forEach(filterByYear , item => a.data.push(item['First Tooltip']))
     return a
     }, {})

     a.push(zipData)
   return a
},[])

// console.log(countries);
console.log(selected);
    
