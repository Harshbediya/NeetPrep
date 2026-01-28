// Dashboard Logic using REAL Data and LocalStorage

// 1. DATA MANAGEMENT
let userState = {
    tasks: [],
    mocks: [],
    plan: []
};

// Initialize Data
function initData() {
    const saved = localStorage.getItem('neet_dashboard_data');
    if (saved) {
        // Load from local storage if exists
        const parsed = JSON.parse(saved);
        userState = parsed;

        // Backward compatibility: if new fields missing in old save
        if (!userState.plan) userState.plan = NEET_DATA.weekly_plan;

    } else {
        // First Load: Use data.js defaults
        if (typeof NEET_DATA === 'undefined') {
            console.error("Data source missing");
            return;
        }
        userState.tasks = NEET_DATA.daily_tasks;
        userState.plan = NEET_DATA.weekly_plan;
        saveData();
    }
}

function saveData() {
    localStorage.setItem('neet_dashboard_data', JSON.stringify(userState));
}

function resetDailyTasks() {
    if (confirm("Reset all tasks to default? This clears your custom tasks.")) {
        userState.tasks = JSON.parse(JSON.stringify(NEET_DATA.daily_tasks)); // Deep copy to avoid Ref issues
        saveData();
        renderTasks();
    }
}

// ---------------------------------------------------------
// RENDER FUNCTIONS
// ---------------------------------------------------------

function renderTasks() {
    const list = document.getElementById('task-list-container');
    list.innerHTML = '';

    if (userState.tasks.length === 0) {
        list.innerHTML = `<div class="text-center" style="padding:40px; color:var(--text-muted)">No tasks for today. Add one!</div>`;
        updateProgress();
        return;
    }

    userState.tasks.forEach(task => {
        const isChecked = task.is_done ? 'checked' : '';
        const weightageBadge = task.weightage ?
            `<span style="color: var(--primary); font-weight: 500;">• ${task.weightage}</span>` : '';

        const cardHtml = `
             <div class="card task-card card-hover">
                <div class="task-info">
                    <span class="topic-tag tag-${task.subject.toLowerCase()}">${task.subject}</span>
                    <h3>${task.topic}</h3>
                    <div class="task-meta" style="margin-top: 5px;">
                        <span><ion-icon name="time-outline"></ion-icon> ${task.study_time_min} min</span>
                        <span><ion-icon name="help-circle-outline"></ion-icon> ${task.question_target} Qs</span>
                        ${weightageBadge}
                    </div>
                </div>
                <div class="flex items-center gap-4">
                     <button class="btn btn-icon-only" onclick="editTask(${task.id})" title="Edit Task">
                        <ion-icon name="create-outline"></ion-icon>
                    </button>
                    ${task.resources && (task.resources.video_url || task.resources.notes_url) ?
                `<button class="btn btn-outline" onclick="openResources(${task.id})" style="padding: 8px 16px; font-size: 0.8rem;">
                            <ion-icon name="library-outline" style="margin-right: 5px;"></ion-icon> Resources
                        </button>` : ''
            }
                     <div class="task-checkbox ${isChecked}" onclick="toggleTaskId(${task.id}, this)">
                        <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += cardHtml;
    });

    updateProgress();
}

function renderPlan() {
    const tbody = document.getElementById('plan-body');
    tbody.innerHTML = '';

    userState.plan.forEach(day => {
        const row = `
            <tr>
                <td style="font-weight:600">${day.day}</td>
                <td>${day.sub1}</td>
                <td>${day.sub2}</td>
                <td style="color:var(--text-muted)">${day.work}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


function renderTopics() {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';

    // Flatten topics for display or Group by Subject
    for (const [subject, topics] of Object.entries(NEET_DATA.important_topics)) {
        topics.forEach(t => {
            const html = `
                <div class="card card-hover">
                    <span class="topic-tag tag-${subject.toLowerCase()}">${subject}</span>
                    <span style="float: right; color: var(--success); font-weight: bold;">${t.weight}</span>
                    <h3>${t.name}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 8px 0;">${t.reason}</p>
                    <a href="${t.link}" target="_blank" class="btn btn-outline w-full" style="margin-top: 10px; font-size: 0.8rem;">
                        <ion-icon name="book-outline" style="margin-right:5px"></ion-icon> Read Notes
                    </a>
                </div>
            `;
            container.innerHTML += html;
        });
    }
}

function renderSyllabus() {
    const container = document.getElementById('syllabus-container');
    container.innerHTML = '';

    for (const [subject, chapters] of Object.entries(NEET_DATA.syllabus_sample)) {
        const html = `
            <div class="card">
                <h3 style="color: var(--primary); margin-bottom: 15px;">${subject}</h3>
                <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-muted);">
                    ${chapters.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        `;
        container.innerHTML += html;
    }
}

function renderPapers() {
    const tbody = document.getElementById('papers-body');
    tbody.innerHTML = '';

    NEET_DATA.papers.forEach(paper => {
        const html = `
            <tr>
                <td>${paper.year}</td>
                <td>Code ${paper.code}</td>
                <td>
                    <div class="flex gap-4">
                        <a href="${paper.link}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;">Download PDF</a>
                        <a href="${paper.solutions}" target="_blank" class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;">View Solutions</a>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += html;
    });
}

function renderMocks() {
    const tbody = document.getElementById('tracker-body');
    tbody.innerHTML = '';

    // Reverse to show latest first
    [...userState.mocks].reverse().forEach((mock, index) => {
        const row = `
            <tr>
                <td>${mock.name}</td>
                <td>${mock.date}</td>
                <td><span style="font-weight: bold; color: ${mock.score > 600 ? 'var(--success)' : '#EF4444'}">${mock.score}</span></td>
                <td>${mock.weak}</td>
                <td>
                     <button class="btn btn-icon-only" onclick="deleteMock(${userState.mocks.length - 1 - index})" style="color:#EF4444">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                    <!-- <span style="font-size: 0.9rem; color: var(--primary);">Revise Tomorrow</span> -->
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// ---------------------------------------------------------
// LOGIC: TASKS
// ---------------------------------------------------------

function toggleTaskId(id, el) {
    el.classList.toggle('checked');
    const task = userState.tasks.find(t => t.id === id);
    if (task) {
        task.is_done = !task.is_done;
        saveData();
    }
    updateProgress();
}

function updateProgress() {
    const total = userState.tasks.length;
    const done = userState.tasks.filter(t => t.is_done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '%';
}

// ---------------------------------------------------------
// LOGIC: ADD / EDIT TASKS
// ---------------------------------------------------------

function openEditTaskModal() {
    // Reset form for "Add New"
    document.getElementById('task-form').reset();
    document.getElementById('edit-task-id').value = '';
    document.getElementById('task-modal-title').innerText = 'Add New Task';
    openModal('task-modal');
}

function editTask(id) {
    const task = userState.tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('task-subject').value = task.subject;
    document.getElementById('task-topic').value = task.topic;
    document.getElementById('task-time').value = task.study_time_min;
    document.getElementById('task-qs').value = task.question_target;

    if (task.resources) {
        document.getElementById('task-video').value = task.resources.video_url || '';
        document.getElementById('task-resource').value = task.resources.notes_url || '';
    }

    document.getElementById('task-modal-title').innerText = 'Edit Task';
    openModal('task-modal');
}

function handleTaskSubmit(e) {
    e.preventDefault();

    const idStr = document.getElementById('edit-task-id').value;
    const subject = document.getElementById('task-subject').value;
    const topic = document.getElementById('task-topic').value;
    const time = parseInt(document.getElementById('task-time').value) || 60;
    const qs = parseInt(document.getElementById('task-qs').value) || 30;
    const video = document.getElementById('task-video').value;
    const notes = document.getElementById('task-resource').value;

    if (idStr) {
        // EDIT EXISTING
        const id = parseInt(idStr);
        const task = userState.tasks.find(t => t.id === id);
        if (task) {
            task.subject = subject;
            task.topic = topic;
            task.study_time_min = time;
            task.question_target = qs;
            if (!task.resources) task.resources = {};
            task.resources.video_url = video;
            task.resources.notes_url = notes;
        }
    } else {
        // CREATE NEW
        const newTask = {
            id: Date.now(), // timestamp as ID
            subject: subject,
            topic: topic,
            study_time_min: time,
            question_target: qs,
            is_done: false,
            resources: {
                video_url: video,
                notes_url: notes
            }
        };
        userState.tasks.push(newTask);
    }

    saveData();
    renderTasks();
    closeModal('task-modal');
}

// ---------------------------------------------------------
// LOGIC: WEEKLY PLAN
// ---------------------------------------------------------

function openPlanEditor() {
    const tbody = document.getElementById('plan-edit-body');
    tbody.innerHTML = '';

    userState.plan.forEach((day, index) => {
        const row = `
            <tr>
                <td><input type="text" class="input-field" value="${day.day}" readonly style="background:#f3f4f6"></td>
                <td><input type="text" class="input-field" value="${day.sub1}" id="p-sub1-${index}"></td>
                <td><input type="text" class="input-field" value="${day.sub2}" id="p-sub2-${index}"></td>
                <td><input type="text" class="input-field" value="${day.work}" id="p-work-${index}"></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    openModal('plan-modal');
}

function handlePlanSave(e) {
    e.preventDefault();

    const newPlan = userState.plan.map((day, index) => {
        return {
            day: day.day,
            sub1: document.getElementById(`p-sub1-${index}`).value,
            sub2: document.getElementById(`p-sub2-${index}`).value,
            work: document.getElementById(`p-work-${index}`).value
        };
    });

    userState.plan = newPlan;
    saveData();
    renderPlan();
    closeModal('plan-modal');
}

// ---------------------------------------------------------
// LOGIC: MODALS & UX
// ---------------------------------------------------------

function openModal(id) {
    const m = document.getElementById(id);
    m.style.display = 'flex';
    // Trigger reflow
    void m.offsetWidth;
    m.classList.add('show');
}

function closeModal(id) {
    const m = document.getElementById(id);
    m.classList.remove('show');
    setTimeout(() => {
        m.style.display = 'none';
    }, 200); // Wait for transition
}

function openResources(taskId) {
    const task = userState.tasks.find(t => t.id === taskId);
    if (!task) return;

    const r = task.resources;
    const content = document.getElementById('modal-content');
    document.getElementById('modal-title').innerText = "Resources: " + task.topic;

    let html = '';

    if (r.video_url) {
        html += `<a href="${r.video_url}" target="_blank" class="btn btn-primary" style="text-align:left; justify-content: flex-start;">
            <ion-icon name="logo-youtube" style="margin-right: 8px;"></ion-icon> 
            Watch Video: ${r.video_title || 'Click to Watch'}
        </a>`;
    }

    if (r.notes_url) {
        html += `<a href="${r.notes_url}" target="_blank" class="btn btn-outline" style="text-align:left; justify-content: flex-start;">
            <ion-icon name="book-outline" style="margin-right: 8px;"></ion-icon> 
            Read Links / Notes
        </a>`;
    }

    if (r.pyq_link) {
        html += `<a href="${r.pyq_link}" target="_blank" class="btn btn-outline" style="text-align:left; justify-content: flex-start;">
            <ion-icon name="document-text-outline" style="margin-right: 8px;"></ion-icon> 
            Past Questions (PYQs)
        </a>`;
    }

    if (r.practice_link) {
        html += `<a href="${r.practice_link}" target="_blank" class="btn btn-outline" style="text-align:left; justify-content: flex-start;">
           <ion-icon name="fitness-outline" style="margin-right: 8px;"></ion-icon> 
           Practice Questions
       </a>`;
    }

    if (html === '') {
        html = '<p class="text-center text-muted">No specific resources added for this task.</p>';
    }

    content.innerHTML = html;
    openModal('resource-modal');
}

// ---------------------------------------------------------
// LOGIC: TRACKER
// ---------------------------------------------------------
function addMockEntry() {
    const name = document.getElementById('mock-name').value;
    const score = document.getElementById('mock-score').value;
    const weak = document.getElementById('mock-weak').value;

    if (!name || !score) return alert("Please fill details");

    userState.mocks.push({
        name,
        date: new Date().toLocaleDateString('en-GB'),
        score: parseInt(score),
        weak
    });

    saveData();
    renderMocks();

    // Clear inputs
    document.getElementById('mock-name').value = '';
    document.getElementById('mock-score').value = '';
    document.getElementById('mock-weak').value = '';
}

function deleteMock(index) {
    if (confirm('Delete this entry?')) {
        userState.mocks.splice(index, 1);
        saveData();
        renderMocks();
    }
}

// ---------------------------------------------------------
// LOGIC: NAVIGATION & INIT
// ---------------------------------------------------------

function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById(sectionId + '-view').classList.add('active');

    // Highlight nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    // Simple way to highlight current nav without 'this' context issues if called programmatically
    // Just find the nav with the click handler for this ID? 
    // Optimization: Add 'id' to nav items equals to sectionId
    // For now, let's just rely on the user clicking which adds visual feedback essentially.
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    initData();
    renderTasks();
    renderPlan();
    renderTopics();
    renderSyllabus();
    renderPapers();
    renderMocks();
});

// Close modal on outside click
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        // Check which modal it is
        closeModal(event.target.id);
    }
}

// Timer Logic (Preserved)
const quotes = [
    "Focus on completion.", "Stop planning, start solving.", "Finish today’s tasks only.",
    "Consistency beats intensity.", "One chapter at a time."
];
let timerInterval;
let timeLeft = 45 * 60;
let isRunning = false;

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById('quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alert("Session Complete! Take a 10 min break.");
            resetTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 45 * 60;
    isRunning = false;
    updateTimerDisplay();
}
