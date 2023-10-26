<template>
	<div class="task-card">
		
		<div class="task-inner" @click="openModal">
			<div id="title" class="d-flex justify-content-between align-items-center">
				<h6 class="m-0">{{ task.title }}</h6>
				<div class="d-flex" v-if="task.title == 'Follow-up w/ Sarangly'">
					<button class="btn btn-primary blue" @click="sendTeleMsg()"><i class="bi bi-chat-left-dots"></i></button>
				</div>
			</div>

			<div class="avatar mt-2 is-size-7"
				v-for="person in task.assignees"
				v-bind:key="'avatar-'+person.fname">
				{{person.fname[0]}}{{person.lname[0]}}
			</div>

			<div class="info columns is-desktop" v-if="task.deadline || task.date">
				<div class="column d-flex justify-content-between">
					<p class="has-text-weight-bold" v-if="task.deadline">
						<i class="bi bi-clock"></i>
						{{ formatDate(task.deadline)}}
					</p>
					<p class="has-text-weight-bold" v-else>
						<i class="bi bi-clock"></i>
						{{ formatDate(task.date)}}
					</p>
					<div v-if="draggable" class="column status has-text-left-mobile">
						<span v-if="this.cardType === 'started'" class="is-uppercase text-warning">In progress</span>
						<span v-if="this.cardType === 'done'" class="is-uppercase text-success">Done</span>
						<span v-else-if="this.cardType === 'to do'"  class="is-uppercase text-danger">To do</span>
					</div>
				</div>

			</div>
		</div>

    <TaskModal
		v-bind:isModalActive="isModalActive"
		v-bind:isNewTask="false"
		:task="task"
		:cardType="cardType"
		:members="members"
		@close="isModalActive = false"
    />

	</div>
</template>
<script>
	import TaskModal from './TaskModal.vue'
	import moment from 'moment'
	//TODO: Call parent (TaskColumn) edit task function
	export default {
		name: 'TaskCard',
		components: {
			TaskModal
		},
		props: {
			task: Object,
			draggable: Boolean,
			cardType: String,
			members: Array,
		},
		data() {
			return {
				isModalActive: false
			}
		},
		methods: {
			editTask(updatedTask) {
				//TODO: call api to update task
				this.$emit('updateTask', updatedTask)
			},
			formatDate: (date) => {
				return moment(date).format('Do MMMM')
			},
			openModal() {
				if (this.cardType !== "meeting") {
					this.isModalActive = true
				}
			},
			removeTask() {
				this.$emit('removeTask')
			},
			async sendTeleMsg() {
				const botToken = import.meta.env.VITE_TELE_API;
				const chatId = import.meta.env.VITE_CHAT_ID;
				console.log(botToken, chatId)
				const telegramAPI = `https://api.telegram.org/bot${botToken}/sendMessage`;
				const response = await fetch(telegramAPI, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						chat_id: chatId,
						text: 'Hello Team, please remember to follow up with Sarangly about the confirmed media list as it has been 3 weeks! Thankss',
					}),
				});

				const data = await response.json();

				console.log(data)
			}
		}
	}
</script>
<style>
	.blue {
		background-color: #57C5F2 !important;
		border: 1px solid #57C5F2 !important;
	}

	.task-card {
		margin: 10px 0;
		background: #fff;
		padding: 10px;
		text-align: left;
		margin-right: 8px;
		border-radius: 5px;
		box-shadow: 2px 2px 2px #EBECF0;
	}

	.task-inner {
		cursor: pointer;
	}

	.info {
		font-size: 14px;
		margin-top: 5px;
	}

	.status {
		text-align: right;
		font-weight: bold;
	}
</style>
