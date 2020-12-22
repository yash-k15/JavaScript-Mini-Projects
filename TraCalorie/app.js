//Storage Controller
const StorageCtrl = (function(){
    
    // public methods
    return {
        storeItem: function(item) {
            let items;

            if(localStorage.getItem('items') === null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
        },

        getItemsFromStorage: function() {
            let items;

            if(localStorage.getItem('items') === null) {
                items = [];
            }
            else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },

        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();

// Item Controller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        // items: [
        //     // {
        //     //     id: 0, name: 'Steak Dinner', calories: 1200
        //     // },
        //     // {
        //     //     id: 1, name: 'Cookies', calories: 400
        //     // },
        //     // {
        //     //     id: 2, name: 'Eggs', calories: 300
        //     // }
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }


    // Public Methods
    return {
        getItems: function() {
            return data.items;
        },

        addItem: function(name, calories) {
            let ID;

            // Create id
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            }
            else {
                ID = 0;
            }

            // Calories to Number
            calories = parseInt(calories);

            // Create New Item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },

        getItemById: function(id) {
            let found = null;

            //loop through the items
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });

            return found;
        },

        updateItem: function(name, calories) {
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },

        deleteItem: function(id) {
            // Get ids

            ids = data.items.map(function(item) {
                return item.id;
            });

            // get index
            const index = ids.indexOf(id);

            //remove item
            data.items.splice(index,1);
        },

        clearAllItems: function() {
            data.items = [];
        },

        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        getCurrentItem: function() {
            return data.currentItem;
        },

        getTotalCalories: function() {
            let total = 0;

            data.items.forEach(function(item) {
                total += item.calories;
            });

            // Set total calories in data Structure
            data.totalCalories = total;
            
            return total;
        },

        logData: function() {
            return data;
        }
    }
})();



// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemName: '#item-name',
        itemCalorie: '#item-calories',
        totalCalories: '.total-calories',
        clearBtn: '.clear-btn'
    }
    
    
    // Public Methods
    return {
        populateItemLists: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>
                `;
            });

            // Insert List item
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getSelectors: function(){
            return UISelectors;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemName).value,
                calories: document.querySelector(UISelectors.itemCalorie).value
            }
        },

        addItemList: function(item) {
            // Show list
            document.querySelector(UISelectors.itemList).style.display = 'block';

            // Create li Element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;

            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                      <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },

        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();


        },

        clearInput: function() {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalorie).value = '';
        }, 

        addItemToForm: function() {
            document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalorie).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
        },

        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list to array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            });
        },
        
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        }, 

        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }, 

        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        }
    }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl){
    // Load Event Listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.key === 'Enter') {
                e.preventDefault();
                return false;
            }
        });

        // Edit item event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button Event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Clear Button
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    // Add Items from submit
    const itemAddSubmit = function(e) {

        // Get form input from UICtrl
        const input = UICtrl.getItemInput();
        
        // Check gor name and Calories
        if(input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to list
            UICtrl.addItemList(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in local Storage
            StorageCtrl.storeItem(newItem);

            // Clear input fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Click edit item
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // Get list item id (item-0, item-1...)
            const listId = e.target.parentElement.parentElement.id;
            
            // Break into array
            const listIdArr = listId.split('-');
            const ID = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(ID);
            
            //Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        
        e.preventDefault();
    }

    // Item update submit
    const itemUpdateSubmit = function(e) {
        // get item input
        const input = UICtrl.getItemInput();
        
        // update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update the Ui
        UICtrl.updateListItem(updatedItem);

        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update in the local Storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {
        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //Delete from data Structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from local Storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        const items = ItemCtrl.getItems();

            // check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            }

        e.preventDefault();
    }

    const clearAllItemsClick = function(e) {
        //Delete all item from data Structure
        ItemCtrl.clearAllItems();

        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // clear from UI
        UICtrl.removeItems();
        
        // Clear from local storage
        StorageCtrl.clearItemsFromStorage();

        UICtrl.hideList();
        
        e.preventDefault();
    }

    // Public Methods
    return {
        init: function(){
            // Set initial state
            UICtrl.clearEditState();

            // Fetch items from data Structure
            const items = ItemCtrl.getItems();

            // check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate lists with items
                UICtrl.populateItemLists(items);
            }

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);


            // Load Event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();