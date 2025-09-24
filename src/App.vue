<template>
  <div class="app">
    <header class="header">
      <h1>Õppeainete hindamine</h1>
    </header>

    <main class="content">
      <section class="class-list">
        <div
          v-for="(subject, index) in subjects"
          :key="index"
          class="class-item"
          @click="selectSubject(subject)"
        >
          {{ subject.name }}
        </div>
      </section>

      <section class="rating-panel">
        <div class="panel-content" v-if="selectedSubject">
          <h2>{{ selectedSubject.name }}</h2>
          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ active: star <= rating }"
              @click="rating = star"
            >
              ★
            </span>
          </div>
          <textarea v-model="studentname" placeholder="Sinu nimi" rows="1"></textarea>
          <textarea v-model="feedback" placeholder="Tagasiside..." rows="5"></textarea>
          <button @click="submitReview">Salvesta hinnang</button>
        </div>
        <div v-else class="panel-placeholder">
          <p>Vali vasakult õppeaine, et hinnata</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const subjects = ref([
  { name: 'Matemaatika' },
  { name: 'Eesti keel' },
  { name: 'Füüsika' },
  { name: 'Keemia' },
  { name: 'Ajalugu' },
  { name: 'Bioloogia' },
])

const selectedSubject = ref(null)
const rating = ref(0)
const studentname = ref('')
const feedback = ref('')

function selectSubject(subject) {
  selectedSubject.value = subject
  rating.value = 0
  studentname.value = ''
  feedback.value = ''
}

//SEND TO DATABASE
function submitReview() {
  alert(
    `Õppeaine: ${selectedSubject.value.name}\nHinnang: ${rating.value}\nÕpilase nimi: ${studentname.value}\nTagasiside: ${feedback.value}`,
  )
}
</script>
