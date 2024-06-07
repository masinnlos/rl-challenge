
import { RestObject } from '../types';

//post or put request to add and adjust objects
export async function onSubmit(formData: RestObject, update: boolean = false, id: string="") {
  let stringifyData = JSON.stringify(formData);
  console.log("Submitting data...")
  console.log(formData)
  //in case it's form update... 
  let index = id? `/${id}` : ""
  let url = 'https://api.restful-api.dev/objects' + index
  console.log(url)
  const response = await fetch(url, {
    method: update? 'PUT': 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringifyData,
  })


  // Handle response if necessary
  const data = await response.json()
  console.log("printing out my data response....")
  console.log(data)
  return data
}