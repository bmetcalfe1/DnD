(function() {
	var items = document.querySelectorAll('.projects li');
	var el = null;
	var del = document.querySelector('.delete');
	var add = document.querySelector('.add');
	var ul = document.querySelector('ul');
	var form = document.querySelector('form');

	function addListeners() {
		[].forEach.call(items, function(item) {
			item.setAttribute('draggable', 'true');
			item.addEventListener('dragstart', dragStart, false);
			item.addEventListener('dragenter', dragEnter, false);
			item.addEventListener('dragover', dragOver, false);
			item.addEventListener('dragleave', dragLeave, false);
			item.addEventListener('drop', dragDrop, false);
			item.addEventListener('dragend', dragEnd, false);
		});
	}

	del.addEventListener('dragover', delOver, false);
	del.addEventListener('dragenter', delEnter, false);
	del.addEventListener('dragleave', delLeave, false);
	del.addEventListener('drop', deleteItem, false);

	add.addEventListener('click', addItem, false);

	function dragStart(e) {
		this.style.opacity = '0.4';
		el = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
	}

	function dragOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	function dragEnter(e) {
		this.classList.add('over');
	}

	function dragLeave(e) {
		this.classList.remove('over');
	}

	function dragDrop(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (el != this) {
			el.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
		}
		return false;
	}

	function delOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	function delEnter(e) {
		this.style.borderColor = 'red';
	}

	function delLeave(e) {
		this.style.borderColor = '#ccc';
	}

	function deleteItem(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		el.parentNode.removeChild(el);
		this.style.borderColor = '#ccc';
		return false;
	}

	function dragEnd(e) {
		this.style.opacity = '1';
		[].forEach.call(items, function(item) {
			item.classList.remove('over');
		});
	}

	function changeColor() {
	//add an event listener that calls changeColor() when the menu selection changes
		document.getElementById('colorChanger').addEventListener('change', changeColor);
	    //store the menu's value (which is the value of the chosen option)
	    var color = document.getElementById('colorChanger').value;
	    //store the list of all <li> elements
	    var list = document.getElementsByTagName('li');
	    //loop through the list and apply the color to each <li> element
	    var len = list.length;     
	    for (var i=0; i<len; i++) {
	        list[len-1].style.color = color;
	    }
	}

	function addItem(e) {
		e.preventDefault();
		var newItem = document.createElement('li');
		var title = form.elements['project'].value;
		if (title === '') {
			return false;
		}

		var newContent = title;
		newItem.innerHTML = newContent;

		var list = document.getElementsByTagName('li');
		if (list.length < 10) {
			ul.appendChild(newItem);
			changeColor();
			items = document.querySelectorAll('.projects li');
			addListeners();
			form.elements['project'].value = '';
		}
		else {
			console.log("max 10 choices!");
		}
		
	}

	addListeners();

})();