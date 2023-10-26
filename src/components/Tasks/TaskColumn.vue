<template>
  <div class="task-container">
    <div class="header">
      <h3 class="is-size-6 has-text-weight-bold">{{ header }}</h3>
    </div>

    <!-- <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
            {{ element.name }}
          </div>
        </template>
      </draggable> -->

    <div class="tasks">
      <draggable
        class="list-group"
        :list="tasks"
        group="people"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div>
            <TaskCard
              :key="element.task_id"
              :task="element"
              :members="members"
              :cardType="cardType"
              v-bind:draggable="true"

            />
          </div>
        </template>
      </draggable>
      <!-- <draggable
        v-if="draggable"
        item-key="id"
        :list="tasks" 
        :group="{name: 'tasks', put: reachLimit}"
        :options="{delayOnTouchOnly:true, delay: 400, animation: 250}"
        @change="updateStatus($event, cardType)">
        <template #item="{ element }">
          <TaskCard v-for="(task, index) in tasks"
            :key="task.task_id"
            :task="task"
            :members="members"
            :cardType="cardType"
            v-bind:isModalActive="isModalActive"
            v-bind:draggable="true"
            @start="drag=true" 
            @end="drag=false"
            @updateTask="updateTask"
            @removeTask="removeTask(index, task.task_id)"
          />
        </template>
      </draggable> -->

      <!-- <TaskCard
        v-else
        v-for="task in tasks"
        :key="task.task_id"
        :task="task"
        :cardType="cardType"
        v-bind:isModalActive="isModalActive"
        v-bind:draggable="false"
      /> -->

    </div>

    <div v-if="draggable && reachLimit" class="add" id="add-task">
      <p @click="isModalActive = true; isNewTask = true" class="m-0"><i class="bi bi-plus-circle"></i>  Add an task!</p>
    </div>


    <!-- <TaskModal
      v-bind:isModalActive="isModalActive"
      v-bind:isNewTask="true"
      :cardType="cardType"
			:members="members"
      @close="isModalActive = false"
    /> -->

  </div>
</template>

<script>
// @ is an alias to /src
import TaskCard from './TaskCard.vue'
import TaskModal from './TaskModal.vue'
import draggable from "vuedraggable";

export default {
  name: 'TaskColumn',
  components: {
    TaskCard,
    TaskModal,
    draggable
  },
  props: {
    header: String,
    tasks: Array,
    draggable: Boolean,
    cardType: String,
    members: Array,
    projectid: String,
    reachLimit: Boolean
  },
  data() {
    return {
			list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      dragging: false,
      drag: false,
      isModalActive: false
    }
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    addTask(status, task) {
      this.$emit("addTask", status, task)
    },
    updateStatus(event, status) {
      console.log(event, status)
      if (event.added) {
        this.$emit("moveTask", event.added.newIndex, status)
      } else if (event.moved){
        this.$emit("moveTask", event.moved.newIndex, status)
      }

    },
    updateTask(task) {
      this.$emit("updateTask", task)
    },
    removeTask(position, taskId) {
      this.$emit("removeTask", taskId, position, this.cardType)
    }
  }

}
</script>

<style>
  .header {
    margin: 5px;
  }

  .task-container {
    background-color: #EBECF0;
    border-radius:5px;
    padding: 10px;
    max-width: 380px;
    margin: auto;
  }

  .add {
    color: grey;
    margin-top: 10px;
    cursor: pointer;
  }

  .tasks {
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

</style>
