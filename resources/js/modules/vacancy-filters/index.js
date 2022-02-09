require('dotenv').config();
import $$ from '@utilities/selectors';
import config from '../../../../site/globals/config';


const vacancyFilters = function vacancyFilters(){
    if (!$$.vacancies) return;

    const url = `https://${config.PROJECTID}.api.sanity.io/v${config.apiVersion}/<path>`
    console.log(config)
}();

// const filterOptions = document.querySelector('.filterOptions')
// const resetIcon = document.querySelector('.resetIcon')
// const singleAd = Array.from(document.querySelectorAll('.singleAd'))
// const sortSelect = document.querySelector('.sort')
// const gridIcon = document.querySelector('.gridView')
// const listIcon = document.querySelector('.listView')
// const noresults = document.querySelector('.no-results')
// //const url = `https://${process.env.PROJECTID}.api.sanity.io/v${process.env.API_VERSION}/<path>`


// listIcon.addEventListener('click', toggleGrid)
// gridIcon.addEventListener('click', toggleGrid)


// filterOptions.addEventListener('change', e => {
//   //filter options is the container div for all the checkboxes.the event listener listens for any change, check/uncheck
//     if(e.target.classList.contains('location')){
//       let selectedLocation = join(e.target.value)
//         if(e.target.checked) {
//           locationArray.push(selectedLocation)
//         } else if (!e.target.checked){
//           let index = locationArray.indexOf(selectedLocation)
//           locationArray.splice(index, 1)
//         }
//     } else if(e.target.classList.contains('disability-confident-employer')){
//         let checkboxValue = join(e.target.value);

//         if(e.target.checked){
//         disabilityArray.push(checkboxValue)
//         } else if(!e.target.checked) {
//             let index = disabilityArray.indexOf(checkboxValue)
//             disabilityArray.splice(index, 1)
//         }
//     } else if(e.target.classList.contains('apprentince-standard')){
//         let checkboxValue = join(e.target.value);

//         if(e.target.checked){
//         standardArray.push(checkboxValue)
//         } else if(!e.target.checked) {
//             let index = standardArray.indexOf(checkboxValue)
//             standardArray.splice(index, 1)
//         }
//     }

//     singleAd.forEach(job => {
//       if(locationArray.length > 0 && disabilityArray.length > 0 && standardArray.length > 0){
//         ('triple array filter')
//         filtertriplearray(standardArray, disabilityArray, standardArray, job)
//       }

//       if(locationArray.length < 1 && disabilityArray.length > 0 && standardArray.length > 0){
//         ('double array filter')
//         filterdoublearray(disabilityArray, standardArray, job)
//       }

//       if(locationArray.length > 0 && disabilityArray.length < 1 && standardArray.length > 0){
//         ('double array filter')
//         filterdoublearray(locationArray, standardArray, job)
//       }

//       if(locationArray.length > 0 && disabilityArray.length > 0 && standardArray.length < 1){
//         ('double array filter')
//         filterdoublearray(locationArray, disabilityArray, job)
//       }

//       if(locationArray.length >= 1 && disabilityArray.length < 1 && standardArray.length < 1){
//         ('single array filter')
//         filterSingleArray(locationArray, job)
//       }

//       if(disabilityArray.length >= 1 && locationArray.length < 1 && standardArray.length < 1){
//         ('single array filter')
//         filterSingleArray(disabilityArray, job)
//       }

//       if(standardArray.length >= 1 && disabilityArray.length < 1 && locationArray.length < 1){
//         ('single array filter')
//         filterSingleArray(standardArray, job)
//       }

//       if(locationArray.length < 1 && disabilityArray.length < 1 && standardArray.length < 1){
//         reset()
//       }
//     })
// })

// resetIcon.addEventListener('click', reset);

// /* searchBar.addEventListener('keyup', e => {
// const searchString = e.target.value
// const jobs = document.querySelectorAll('.singleAd.flex');

//   jobs.forEach(job => {
//     if(!job.classList.includes(searchString)){
//       job.classList.add('hidden')
//       job.classList.remove('flex')
//     } else {
//       job.classList.add('flex')
//       job.classList.remove('hidden')
//     }
//   })

//   displayNumVacancies()

// }) */

// function toggleGrid(){
//   const jobs = document.querySelectorAll('.singleAd.flex')
//   const jobChildEl = jobs[0];
//   jobChildEl.parentNode.classList.toggle('flex-col')
//   jobChildEl.parentNode.classList.toggle('flex-row')
//   jobChildEl.parentNode.classList.toggle('flex-wrap')

//   jobs.forEach(job => {
//     job.classList.toggle('w-5/12')
//     job.classList.toggle('mx-auto')
//     job.firstElementChild.classList.toggle('h-full')

//   })
// }

// function filtertriplearray(arr1, arr2, arr3, el){
//     if(arr1.some(item=>Array.from(el.classList).includes(item)) && arr2.some(item=>Array.from(el.classList).includes(item)) && arr3.some(item=>Array.from(el.classList).includes(item))){
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }

//     displayNumVacancies()
// }

// function filterdoublearray(arr1, arr2, el){
//     if(arr1.some(item=>Array.from(el.classList).includes(item)) && arr2.some(item=>Array.from(el.classList).includes(item))){
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }

//     displayNumVacancies()
// }

// function filterSingleArray(arr, el){
//     if(arr.some(item=>Array.from(el.classList).includes(item))){
//     (arr, el)
//       el.classList.remove('hidden')
//       el.classList.add('flex')
//     } else {
//     (arr, el)
//       el.classList.add('hidden')
//       el.classList.remove('flex')
//     }

//     displayNumVacancies()
// }

// function join(string){
//     return string.replace(/\s+/g, '-').toLowerCase()
// }

// function reset(){
//   disabilityArray = []
//   locationArray = []

//   singleAd.forEach(ad => {
//     ad.classList.remove('hidden')
//     ad.classList.add('flex')
//   })

//   standardCheckbox.forEach(box => {
//     box.checked = false
//   })

//   locationCheckbox.forEach(box => {
//     box.checked = false
//   })

//   disabilityCheckbox.forEach(box => {
//     box.checked = false
//   })
//   displayNumVacancies()
// }

// function displayNumVacancies(){
//   const ads = document.querySelectorAll('.singleAd.flex');
//   const display = document.querySelector('.showing')

//   display.innerHTML = ads.length;

//   if(ads.length === 0){
//     noresults.classList.add('block')
//     noresults.classList.remove('hidden')
//   } else {
//     noresults.classList.remove('block')
//     noresults.classList.add('hidden')
//   }
// }

// displayNumVacancies()