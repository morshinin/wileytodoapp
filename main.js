const 
			// itemTitle = document.querySelector('#itemTitle'),
			deleteAllBtn = document.querySelector('#deleteAll'),
			todoForm = document.querySelector('#todoForm'),
			itemsList = document.querySelector('#itemsList');
let items = JSON.parse(localStorage.getItem('items')) || [];

// Listen to submit
todoForm.addEventListener('submit', setItem);

// Listen to delete or edit list
itemsList.addEventListener('click', operateItem);

// Listen to delete all button
deleteAllBtn.addEventListener('click', deleteAll);

// Create new item and append it to list
function setItem(e) {
	e.preventDefault();

	const title = this.querySelector('[name=itemTitle]').value,
				desc = this.querySelector('[name=itemDesc]').value;
				// duration = this.querySelector('#itemDuration').value,
				// difficulty = this.querySelector('#itemDifficulty').value,
				// importance = this.querySelector('#itemImportance').value;

	const item = {
		title,
		desc,
		// duration,
		// difficulty,
		// importance,
		done: false
	};

	// Push item to items array
	items.push(item);

	// Add item to items list
	appendItem(items, itemsList);

	// Save items to local storage
	localStorage.setItem('items', JSON.stringify(items));

	// Reset form inputs
	this.reset();
}

// Adding items to items list
function appendItem(items = [], itemsList) {
	itemsList.innerHTML = items.map((item, i) => {
		item.id = i;
		return `
		<li class="items-list__item">
	 		<label class="items-list__label cursor-pointer">
	 			<input type="checkbox" data-index="${i}" id="item-${i}" ${item.done ? "checked" : ""} />
	 			<span class="items-list__item-title">${item.title}</span>
	 			<input type="text" class="items-list__item-title-edit items-list__item-title-edit_isDisabled" value="${item.title}" />
	 			<span class="items-list__item-desc">${item.desc}</span>
	 			<!--
	 			<span class="badge">${item.duration}</span>
	 			<span class="badge">${item.difficulty}</span>
	 			<span class="badge">${item.importance}</span>
	 			-->
	 		</label>
	 			<i class="material-icons items-list__icon items-list__icon_delete">delete</i>
	 			<i class="material-icons items-list__icon items-list__icon_edit">edit</i>
		</li>
 	`;
	}).join('');
}

// Delete or edit item
function operateItem(e) {
	const el = e.target,
				deleteItem = el.querySelector('i.items-list__icon_delete'),
				editItem = el.querySelector('i.items-list__icon_edit');
				// itemTitle = el.querySelector('.items-list__item-title').textContent;

	// If clicked delete icon then delete current item,
	// if clicked edit then edit
	// else do nothing
	if (e.target.matches('.items-list__icon_delete')) {
		let itemTitle = e.target.parentElement.querySelector('.items-list__item-title').textContent;

		// itemId = itemId.split('-').pop();

		itemsList.removeChild(e.target.parentElement);
		localStorage.removeItem('items', itemTitle);
		// console.log(localStorage.getItem('items', itemId));

		// console.log(localStorage.key(itemId));

	} else if (e.target.matches('.items-list__icon_edit')) {
		editTask(e.target);
		
	} else {
		return;
	}
}

// Edit task function
function editTask(target) {
	const listItem = target.parentElement;
	const editInput = listItem.querySelector('input[type=text]');
	const label = listItem.querySelector('.items-list__item-title');
	const containsClass = listItem.classList.contains('edit-mode');

	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
	listItem.classList.toggle('edit-mode');
	console.log(listItem);
}

// Delete all items
function deleteAll(e) {
	e.preventDefault();

	while (itemsList.firstChild) {
		itemsList.removeChild(itemsList.firstChild);
	}

	localStorage.clear();
	items = [];
}

// Items list init
appendItem(items, itemsList);

// Sort items
// var listOptions = {
// 	valueNames: ['items-list__item-title']
// };

// var listItemsSort = new List('itemsList', listOptions);

// ToDo
// Remove item from localStorage when deleted
// Update localStorage when edit item
// Sort items
// Save checked items

// Done
// Edit item
// Add delete all button