const fetch = require('node-fetch');
const axios = require('axios');

async function runTest() {
  const BASE_URL = 'http://localhost:3000';
  const testUser = {
    name: 'Test Student',
    email: `test_${Date.now()}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
    grade: 'Grade 9',
    interests: 'Math, Science'
  };

  const cookieJar = {};

  async function request(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    
    // Add cookies if we have them
    if (Object.keys(cookieJar).length > 0) {
      headers['Cookie'] = Object.entries(cookieJar).map(([k, v]) => `${k}=${v}`).join('; ');
    }

    const response = await axios({
      method: options.method || 'GET',
      url,
      data: options.body,
      headers,
      validateStatus: () => true
    });

    // Update cookie jar from set-cookie headers
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      setCookie.forEach(cookie => {
        const [pair] = cookie.split(';');
        const [key, value] = pair.split('=');
        cookieJar[key.trim()] = value.trim();
      });
    }

    return response;
  }

  try {
    console.log('🚀 Starting Onboarding Integration Test...');

    // 1. Registration
    console.log('Testing Registration...');
    const regRes = await request('/api/auth/register', {
      method: 'POST',
      body: testUser
    });
    console.log(`Registration Status: ${regRes.status} ${regRes.status === 201 ? '✅' : '❌'}`);

    // 2. Login
    console.log('Testing Login...');
    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      body: { email: testUser.email, password: testUser.password }
    });
    console.log(`Login Status: ${loginRes.status} ${loginRes.status === 200 ? '✅' : '❌'}`);

    // 3. Fetch Quiz
    console.log('Testing Quiz Fetch...');
    const quizRes = await request('/api/entry-quiz');
    console.log(`Quiz Fetch Status: ${quizRes.status} ${quizRes.status === 200 ? '✅' : '❌'}`);
    if (quizRes.status === 200) {
      console.log(`Questions received: ${quizRes.data.questions.length}`);
    }

    // 4. Submit Quiz
    console.log('Testing Quiz Submission...');
    const answers = {};
    quizRes.data.questions.forEach(q => {
      answers[q.id] = q.o[0]; // Pick first option for all
    });

    const submitRes = await request('/api/entry-quiz/submit', {
      method: 'POST',
      body: { answers, subject: 'General Knowledge' }
    });
    console.log(`Submission Status: ${submitRes.status} ${submitRes.status === 200 ? '✅' : '❌'}`);
    console.log(`Assigned Level: ${submitRes.data.level}`);

    // 5. Verify Profile
    console.log('Testing Final Profile Status...');
    const meRes = await request('/api/auth/me');
    console.log(`Profile Status: ${meRes.status} ${meRes.status === 200 ? '✅' : '❌'}`);
    console.log(`Has Completed Quiz: ${meRes.data.student.hasCompletedEntryQuiz}`);

    if (meRes.data.student.hasCompletedEntryQuiz) {
      console.log('\n🎉 ALL TESTS PASSED: Onboarding flow is fully functional!');
    } else {
      console.log('\n❌ TEST FAILED: Student was not marked as completed.');
    }

  } catch (error) {
    console.error('\n💥 TEST CRASHED:', error.message);
  }
}

runTest();
