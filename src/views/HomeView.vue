<template>
  <div class="app">
    <header class="header">
      <h1>Õppeainete hindamine</h1>
       <div class="dashboard-button-container">
        <button class="main-button" @click="goToDashboard">Dashboard</button>
      </div>
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
          <button class="main-button" @click="submitReview">Salvesta hinnang</button>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const subjects = ref([
  { name: 'Matemaatika | Hanna Toom' },
  { name: 'Eesti keel | Terie Varul' },
  { name: 'Füüsika | Julia Kähri' },
  { name: 'Keemia | Liivia Agu' },
  { name: 'Ajalugu | Hilja Kattagu' },
  { name: 'Bioloogia | Liivia Agu' },
  { name: 'Riistvaralähedane programmeerimine | Md Raknuzzaman' },
  { name: 'Individuaalne valikaine (Arvutimängude loomine) | Kevin Otto Koit' },
  { name: 'Tarkvaraarenduse meetodid | Henry Edward Aimre' },
  { name: 'Blockchain | Aleksandr Kormiltsõn' },
  { name: 'Testimise alused ja testimisplaan | Tatjana Kirotar' },
  { name: 'Hajusrakenduste alused II | Timo Triisa' },
  { name: 'Serveripoolsed tehnoloogiad veebirakenduste loomiseks | Kaspar Martin Suursalu' },
  { name: 'Küberturbe alused | Anu Baum' },
  { name: 'Projekt I | Henry Edward Aimre , Kuldar Kaasik , Timo Triisa' },
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

async function submitReview() {
  if (!selectedSubject.value) {
    alert('Vali õppeaine')
    return
  }

  const payload = {
    subject: selectedSubject.value.name,
    studentname: studentname.value,
    rating: rating.value,
    feedback: feedback.value,
  }

  try {
    const res = await fetch('http://localhost:3000/api/hinnangud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      alert('Hinnang salvestatud!')
      rating.value = 0
      studentname.value = ''
      feedback.value = ''

      window.dispatchEvent(new Event('review-updated'))
    } else {
      const txt = await res.text()
      alert('Viga: ' + txt)
    }
  } catch (err) {
    console.error(err)
    alert('Serveriga ei saa ühendust')
  }
}

function goToDashboard() {
  router.push('/dashboard')
}
</script>
