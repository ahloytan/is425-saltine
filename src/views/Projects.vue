<template>
	<div class="corrector container">
		<h1 class="pt-4 mb-4 flex-column d-flex align-items-center fw-bolder">Projects</h1>
		<div class="headerInfo">
			<div id="spaces" v-if="projects.length===0">
				<br>
			</div>
			<div id="new" v-bind:align="projects.length===0 ? 'center' : '' ">
					<button type="button" class="btn btn-info mb-2 mb-sm-0 me-md-3" @click="isModalActive = true; teamModalType = 'cProj'">
						Create New Project
					</button>
					<button type="button" class="btn btn-info" @click="isModalActive = true; teamModalType = 'jProj'">
						Join Project Team
					</button>
				</div>
			<div class="container mt-3" id="team-list" style="margin-top: 15px"
				v-for="(project, index) in projects"
				v-bind:key="index+'-'+project.description"
				@click="redirect(project.project_id)"
			>
				<div class="columns items">
					<div class="column item">
						<ProjectRow
							:description="project.description"
							:last_modified="project.last_modified"
							:members="project.members"

						/>
					</div>
				</div>
			</div>
		</div>
		
		<!-- <ProjectModal
			v-bind:isModalActive="isModalActive"
			v-bind:availableProjects="availableProjects"
			v-bind:teamModalType="teamModalType"
			@close ="isModalActive=false"
		></ProjectModal> -->
	</div>
</template>

<script>
import ProjectRow from '../components/Projects/ProjectRow.vue'
import ProjectModal from '../components/Projects/ProjectModal.vue'
// import ProjectService from '@/api/services/ProjectService'
// import TeamService from '@/api/services/TeamService'

export default {
	name: 'ProjectsPage',
	components: {
		ProjectRow,
		ProjectModal,
	},
	props: {
	},
	data() {
		return {
			email: "",
			teamModalType: "",
			isModalActive: false,
			isLoading: true,
			joinedTeam: false,
			noProjects: false,
			buttonsAlign: "",
			projects: [
				{
					created_at: "2023-10-13T08:00:00",
					creator: "UserA",
					description: "Saltine",
					last_modified: "24/10/2023 3.30pm",
					project_id: 1,
					members: [{ "user_email": "admin@admin.com", "fname": "Super", "lname": "Admin" }, { "user_email": "larry@hotmail.com", "fname": "Larry", "lname": "Bird" }, { "user_email": "john@gmail.com", "fname": "John", "lname": "Cena" }, { "user_email": "mark@hotmail.com", "fname": "Marks", "lname": "Spencer" }, { "user_email": "susan@hotmail.com", "fname": "Susan", "lname": "Davis" }, { "user_email": "james@gmail.com", "fname": "James", "lname": "Wilson" }]
				},
				{
					created_at: "2023-10-14T09:15:00",
					creator: "UserB",
					description: "Qwerky",
					last_modified: "23/10/2023 12.45pm",
					project_id: 2,
					members: [{ "user_email": "admin@admin.com", "fname": "Super", "lname": "Admin" }, { "user_email": "john@yahoo.com", "fname": "John", "lname": "Wilson" }, { "user_email": "peter@gmail.com", "fname": "Peter", "lname": "Young" }, { "user_email": "alice@yahoo.com", "fname": "Alice", "lname": "Johnson" }, { "user_email": "mike@gmail.com", "fname": "Mike", "lname": "Williams" }, { "user_email": "lisa@hotmail.com", "fname": "Lisa", "lname": "Anderson" }, { "user_email": "steve@yahoo.com", "fname": "Steve", "lname": "Miller" }, { "user_email": "sarah@gmail.com", "fname": "Sarah", "lname": "Thompson" } ]
				},
				{
					created_at: "2023-10-15T10:30:00",
					creator: "UserC",
					description: "Aliwear",
					last_modified: "23/10/2023 2.00pm",
					project_id: 3,
					members: [{ "user_email": "admin@admin.com", "fname": "Super", "lname": "Admin" }, { "user_email": "laura@hotmail.com", "fname": "Laura", "lname": "Moore" }, { "user_email": "jessica@gmail.com", "fname": "Jessica", "lname": "Taylor" }, { "user_email": "kevin@hotmail.com", "fname": "Kevin", "lname": "Martin" }, { "user_email": "bob@gmail.com", "fname": "Bob", "lname": "Smith" } ]
				}
			],
			projectIds: [],
			availableProjects: [],
		}
	},
	computed: {
	},
	methods: {
        async getTeams(email) {
			try {
				const teams = await TeamService.getTeams(email)
                for (let i in teams) {
                    this.projects.push(teams[i])
					this.projectIds.push(teams[i]['project_id'])
                }
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
        async joinTeam(teamId) {
			try {
                const joinTeam = await TeamService.joinTeam(this.email, teamId)
                this.projects.push(joinTeam)
				this.availableProjects.splice(this.availableProjects.indexOf(parseInt(teamId)), 1)
				this.joinedTeam = true
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
			return this.joinedTeam
		},
		async getAllProjectTeams() {
			try {
				let project = await ProjectService.getAllProjects()
				for (let id of project){
					if (!this.projectIds.includes(parseInt(id))){
						this.availableProjects.push(parseInt(id))
					}
				}
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		async createProject(description) {
			try {
				const project = await ProjectService.addProject(this.email, description)
				this.projects.push(project)
			} catch (error) {
				this.$refs.toast.result(null, error.response);
			}
		},
		redirect(projectId) {
			this.$router.push(`/project/${projectId}`)
		}
	},
	async mounted() {
		// this.email = this.$cookies.get("user")['userEmail'];
        // await this.getTeams(this.email);
		// await this.getAllProjectTeams();
		if (this.projects.length == 0){
			this.noProjects = true
			this.buttonsAlign = "center"
		}
		// console.log('Teams I can join: ',this.availableProjects);

		this.isLoading = false;
	}
}
</script>

<style scoped>

	.corrector{
		padding: 0 15px;
		/* @include breakpoint(desktop){
			margin-left: 18%;
			margin-right: 5%;
		} */
	}

	.headerInfo {
		position:relative;
		margin-top: 10px;
		/* @include breakpoint(tablet2){
			margin-top: 15px;
		} */
	}

	#buttons {
		text-align: center;
		/* @include breakpoint(tablet2){
			text-align: right;
		} */
	}
</style>
