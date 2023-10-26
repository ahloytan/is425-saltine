<template>
	<div id="theTeamProject" class="corrector container">
		<div class="headerInfo">
			<div class="team-header ml-3">
				<h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Project Tasks (Sarangly)</h1>
				<!-- <h2 class="is-inline-block team-name is-size-5">
					{{ project.description }} (ID: {{project.project_id}})
				</h2> -->
				<!-- <div id="tooltip">
					<b-tooltip label="Send ID to members to join team">
						<i class="fas fa-info-circle"></i>
					</b-tooltip>
				</div> -->

				<div class="team-members">
					<div class="avatar avatar-small is-size-7"
						v-for="person in project.members"
						v-bind:key="'avatar-'+person.fname" v-bind:title="'' + person.fname + ' ' + person.lname">
						{{person.fname[0]}}{{person.lname[0]}}
					</div>
				</div>

				<h3 class="is-size-7 mb-3">
					{{ project.details }}
				</h3>

				<!-- <div class="is-inline-mobile">
					<b-button type="is-link is-light"  @click="isModalActive = true; teamModalType='cDesc'">
						<i class="far fa-edit"></i> Edit
					</b-button>
				</div> -->
			</div>
		</div>

		<!-- <ProjectModal
			v-bind:isModalActive="isModalActive"
			v-bind:teamModalType="teamModalType"
			@close ="isModalActive=false"
		></ProjectModal> -->
		<div class="container" id="task-board">
			<div class="row columns items">
				<div class="col item">
					<TaskColumn
						header="To do"
						:tasks="todo"
						:reachLimit = "this.todo.length < this.max"
						:members="project.members"
						cardType="to do"
						v-bind:draggable="true"
						@addTask="addTask"
						@moveTask="updateMove"
						@updateTask="updateTask"
						@removeTask="removeTask"
					/>
				</div>
				<div class="col item">
					<TaskColumn
						header="In progress"
						:tasks="inprogress"
						:reachLimit = "this.inprogress.length < this.max"
						:members="project.members"
						cardType="started"
						v-bind:draggable="true"
						@addTask="addTask"
						@moveTask="updateMove"
						@updateTask="updateTask"
						@removeTask="removeTask"
					/>
				</div>

				<div class="col item">
					<TaskColumn
						header="Done"
						:tasks="done"
						:reachLimit = "this.done.length < this.max"
						:members="project.members"
						cardType="done"
						v-bind:draggable="true"
						@addTask="addTask"
						@moveTask="updateMove"
						@updateTask="updateTask"
						@removeTask="removeTask"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import TaskColumn from '../components/Tasks/TaskColumn.vue'
import ProjectModal from '../components/Projects/ProjectModal.vue'
import draggable from "vuedraggable";

export default {
  name: 'TeamProject',
  components: {
  TaskColumn,
	ProjectModal,
	draggable
  },
	data() {
		return {
			isModalActive: false,
			teamModalType: "",
			isLoading: true,
			projectId: this.$route.params.slug,
			project: {
				project_id: "",
				details: "",
				description: "",
				members: [],
			},
			todo: [ { "task_id": 5, "project_id": 1, "title": "Craft Media Pitch", "description": "It often results in wheezing and shortness of breath.", "position": 0, "created_datetime": "2023-10-02 08:18:41", "deadline": "2023-10-04T00:18:41.000Z", "completion_status": "to do", "assignees": [ { "user_email": "admin@admin.com", "fname": "Larry", "lname": "Bird" } ] }, { "task_id": 9, "project_id": 1, "title": "Confirm Media Qwerky", "description": "Possible sprain after intensive basketball session", "position": 1, "created_datetime": "2023-09-28 08:55:14", "deadline": "2023-09-29T00:55:14.000Z", "completion_status": "to do", "assignees": [ { "user_email": "admin@admin.com", "fname": "Brant", "lname": "Neo" } ] } ],
			inprogress: [ { "task_id": 1, "project_id": 1, "title": "Onboarding", "description": "These respiratory infections are caused by viruses and are characterized by symptoms like Payment, sneezing, congestion, and fever.", "position": 0, "created_datetime": "2023-10-01 09:00:14", "deadline": "2023-10-02T01:00:14.000Z", "completion_status": "started", "assignees": [ { "user_email": "admin@admin.com", "fname": "Super", "lname": "Admin" } ] }, { "task_id": 7, "project_id": 1, "title": "Follow-up w/ Sarangly", "description": "Migrane after coming back from JB", "position": 1, "created_datetime": "2023-10-01 08:45:14", "deadline": "2023-10-02T00:45:14.000Z", "completion_status": "started", "assignees": [ { "user_email": "admin@admin.com", "fname": "Yu", "lname": "Xuan" } ] }, { "task_id": 6, "project_id": 1, "title": "Payment", "description": "Dry Payment for 2 days", "position": 2, "created_datetime": "2023-10-01 08:35:14", "deadline": "2023-10-02T00:35:14.000Z", "completion_status": "started", "assignees": [ { "user_email": "admin@admin.com", "fname": "Mark", "lname": "Spencer" } ] }, { "task_id": 2, "project_id": 1, "title": "Reminder Email", "description": "Onboarding occur when the immune system reacts to allergens", "position": 3, "created_datetime": "2023-10-01 08:15:14", "deadline": "2023-10-02T00:15:14.000Z", "completion_status": "started", "assignees": [ { "user_email": "admin@admin.com", "fname": "Super", "lname": "Admin" } ] } ],
			done: [ { "task_id": 8, "project_id": 1, "title": "Confirm Media List", "description": "Possible sprain after intensive basketball session", "position": 0, "created_datetime": "2023-10-01 08:55:14", "deadline": "2023-10-02T00:55:14.000Z", "completion_status": "done", "assignees": [ { "user_email": "admin@admin.com", "fname": "James", "lname": "Wilson" } ] }, { "task_id": 10, "project_id": 1, "title": "Confirm Media mulawear", "description": "Possible sprain after intensive basketball session", "position": 1, "created_datetime": "2023-09-28 08:55:14", "deadline": "2023-09-29T00:55:14.000Z", "completion_status": "done", "assignees": [ { "user_email": "admin@admin.com", "fname": "Grace", "lname": "Lui" } ] } ],
			state: "",
			max: 20
		}
	},
	methods: {
		async changeProjDetails(name, desc) {
			try {
				const change = await TeamService.changeProjDetails(this.projectId, name, desc)
				this.project.description = change.name
				this.project.details = change.desc

			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
			return this.joinedTeam
		},

		async addTask(completion_status, task) {
			let position;
			if (completion_status === "to do") {
				position = this.todo.length
				task["position"] = position
				this.todo.push(task)
				const addedTask = await this.createTask(task)
				this.todo[position]["task_id"] = addedTask.task_id

			} else if (completion_status === "started") {
				position = this.inprogress.length
				task["position"] = position
				this.inprogress.push(task)
				const addedTask = await this.createTask(task)
				this.inprogress[position]["task_id"] = addedTask.task_id

			} else if (completion_status === "done") {
				position = this.done.length
				task["position"] = position
				this.done.push(task)
				const addedTask = await this.createTask(task)
				this.done[position]["task_id"] = addedTask.task_id

			} else {
				this.$refs.toast.result(null, {data: {error: "invalid completion_status"}});
			}

		},
		async updateMove(newPosition, status) {
				let currentTaskId;

				if (status === "started") {
					currentTaskId = this.inprogress[newPosition].task_id;

				} else if (status === "done") {
					currentTaskId = this.done[newPosition].task_id;

				} else if (status === "to do") {
					currentTaskId = this.todo[newPosition].task_id;

				} else {
					this.$refs.toast.result(null, {data: {error: "invalid completion_status"}});
					return
				}
				try {
					const updateBody = {
						'project_id': this.projectId,
						'task_id': currentTaskId,
						'new_position': newPosition,
						'new_status': status,
					}
					await TaskService.updateTaskPosition(updateBody)
				} catch (error) {
					this.$refs.toast.result(null, error.response);
				}



		},
		async getProject(projectId) {
			try {
				const project = await ProjectService.getProject(projectId)
				this.project = project
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		async getProjectTasks(projectId) {
			try {
				const tasks = await TaskService.getProjectTasks(projectId)
				this.todo = tasks.tasks.todo
				this.inprogress = tasks.tasks.inprogress
				this.done = tasks.tasks.done
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		async createTask(task) {
			try {
				return await TaskService.addTask(this.projectId, task)
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		async updateTask(task) {
			try {
				await TaskService.updateTask(this.projectId, task)
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		async removeTask(taskId, position, status) {
			try {
				TaskService.deleteTask(taskId)
				if (status === "started") {
					this.$delete(this.inprogress, position)

				} else if (status === "done") {
					this.$delete(this.done, position)

				} else if (status === "to do") {
					this.$delete(this.todo, position)

				} else {
					console.log("unknown completion_status")
				}
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
	},
	mounted() {

		this.state = Math.random().toString(36).slice(2);
		// Promise.all([this.getProject(this.projectId), this.getProjectTasks(this.projectId)]).then(() => {
		// 	this.isLoading = false;
		// });
	}
}
</script>

<style>
	.team-header {
		text-align: left;

		.team-name {
			font-weight: bold;
			text-transform: uppercase;
		}

		.team-members {
			margin: 10px 0;
			/* @include breakpoint(tablet) {
				display: inline-block;
				margin: 0 0 0 10px;
			} */
		}
	}

	#task-board {
		margin: 15px auto;
		overflow-x: auto;
		overflow-y: hidden;
		min-height: 75vh;
	}

	.items {
		margin: auto;

		.item {
			align-items: center;
			margin: 5px;
			/* min-width: 350px; */
			/* width: 100%; */
		}
	}

	.container::-webkit-scrollbar{
		height:0px;
		width:0px;
		background: grey;
		margin: 0px 5px;
		border-radius: 10px;

		 /* @include breakpoint(tablet){
		 	height: 10px;
		 	width: 10px;
		 } */
	}

	.container::-webkit-scrollbar-thumb:horizontal{
		background: grey;
		border-radius: 10px;
	}

	#tooltip {
		position: relative;
		display: inline-block;
		top: -10px;
	}

	.corrector{
		margin-top:50px;
		 /* @include breakpoint(desktop){
		 	margin-left: 18%;
		 	margin-right: 5%;
		 } */
	}

	.headerInfo {
		position:relative;
		margin-top: 10px;
		 /* @include breakpoint(tablet){
		 	margin-top: 15px;
		 } */
	}

	.tooltip-content {
		z-index: 999;
	}

</style>
