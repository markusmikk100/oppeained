<template>
  <div class="app">
    <header class="header">
      <h1>Dashboard</h1>
      <div class="dashboard-button-container">
        <button class="main-button" @click="goBack">Tagasi</button>
      </div>
    </header>

    <main class="content">
      <div v-if="reviews.length === 0" class="panel-placeholder">
        <p>Andmed puuduvad...</p>
      </div>

      <div v-else class="class-list dashboard">
        <div
          class="dashboard-card"
          v-for="review in reviews"
          :key="review.id"
        >
          <h3>{{ review.subject }}</h3>
          <ul>
            <li><strong>Id:</strong> {{ review.id }}</li>
            <li><strong>StudentName:</strong> {{ review.studentname }}</li>
            <li><strong>Rating:</strong> {{ review.rating }} ★</li>
            <li><strong>Feedback:</strong> {{ review.feedback }}</li>
          </ul>
        </div>
      </div>

      <div class="avg-ratings" v-if="Object.keys(avgRatings).length">
        <h3>Keskmine hinne iga õppeaine kohta:</h3>
        <ul>
          <li v-for="(avg, subject) in avgRatings" :key="subject">
            {{ subject }}: {{ avg.toFixed(1) }} ★
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const reviews = ref([])
const avgRatings = ref({})

async function fetchDashboardData() {
  try {
    const res = await fetch('http://localhost:3000/api/hinnangud')
    const data = await res.json()
    reviews.value = data

    const grouped = {}
    data.forEach(r => {
      if (!grouped[r.subject]) grouped[r.subject] = []
      grouped[r.subject].push(r.rating || 0)
    })

    const averages = {}
    for (const subject in grouped) {
      const sum = grouped[subject].reduce((a, b) => a + b, 0)
      averages[subject] = sum / grouped[subject].length
    }
    avgRatings.value = averages
  } catch (err) {
    console.error(err)
  }
}

function goBack() {
  router.push('/')
}

onMounted(fetchDashboardData)
window.addEventListener('review-updated', fetchDashboardData)
</script>
