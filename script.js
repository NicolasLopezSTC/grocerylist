import peadb from 'https://cdn.skypack.dev/peadb';
import shortid from 'https://cdn.skypack.dev/shortid';

const db = new localDB('grocery-List-db')
const groceries = db.getAll() || []



const groceryList = document.getElementById('groceryList')
const newGroceryInput = document.getElementById('newGrocery')
const addBtn =  document.getElementById('addBtn')

const createGroceryElement = grocery => {
    const GroceryElement = document.createElement('li')
    groceryElement.innerText = grocery.value
    groceryElement.classList.add('groceryItem')
    groceryElement.addEventList('click', () =>{
    groceryElement.remove()  
    db.delete(grocery.key)
    
    })
    return groceryElement
}

const addGrocery = newGrocery => {
    groceryList.appendChild(createGroceryElement(newGrocery))
}

addBtn.addEventList('click', e => {
    e.preventDefault()
    const value = newGroceryInput.value
    const key = shortid.generate()
    if (value) {
    addGrocery({key, value})
    db.set(key, value)
    newGroceryInput.value = null      
    }
})

groceries.map(grocery => addGrocery(grocery))

