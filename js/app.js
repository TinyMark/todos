(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!

	var app = new Vue({
		el: "#app",
		data: {
			todoList: JSON.parse(localStorage.getItem('todo') || '[]'),
			newText: "",
			editIndex: null,
			current: "all"
		},
		watch: {
			todoList: {
				deep: true,
				handler(newValue) {
					localStorage.setItem("todo", JSON.stringify(newValue))
				}
			}
		},
		computed: {
			toggleAll: {
				set(value) {
					this.todoList.forEach(v => {
						v.isComplete = value
					})
				},
				get() {
					var flag = this.todoList.some(v => {
						return v.isComplete == false
					})
					return !flag
				}
			}
		},
		methods: {
			addList() {
				if (this.newText.trim()) {
					this.todoList.push({
						text: this.newText,
						isComplete: false
					})
				}
				this.newText = ""
			},
			editListDone(text, index) {
				this.editIndex = null
				if (!text.trim()) {
					this.todoList.splice(index, 1)
				}
			},
			delList(index) {
				this.todoList.splice(index, 1)
			},
			clearCompleted() {
				this.todoList = this.todoList.filter(v => {
					return !v.isComplete
				})
			},
			isShow(item) {
				switch (this.current) {
					case 'active':
						return !item.isComplete
						break;
					case 'completed':
						return item.isComplete
						break;
					default:
						return true
						break;
				}
			}
		},
		directives: {
			focus: {
				update(el) {
					el.focus()
				}
			}
		}
	})

})(window);
