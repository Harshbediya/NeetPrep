# Backend & Database Plan for NEET Study Dashboard

To make this application a "Real, Functioning Website" with user accounts and dynamic data, here is the recommended technical architecture.

## 1. Tech Stack
*   **Frontend**: React.js (Next.js is best for SEO/Performance). The current HTML/JS prototype is a good starting point but React allows better state management.
*   **Backend**: Node.js with Express (lightweight, fast) or Python Django (good for admin panel).
*   **Database**: PostgreSQL (Relational is better for structured study data) or MongoDB (if resources schema changes frequently).
*   **Auth**: Firebase Auth or Supabase (simplest for "Simple Student Login").

## 2. Database Schema (SQL/PostgreSQL)

### Table: `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `email` | VARCHAR | Unique email |
| `password_hash` | VARCHAR | Encrypted password |
| `created_at` | TIMESTAMP | Join date |

### Table: `tasks` (The "Real Data" Catalog)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key |
| `subject` | VARCHAR | Physics, Chem, Bio |
| `topic_name` | VARCHAR | e.g. "Current Electricity" |
| `weightage_score` | INT | 1-10 Scale based on analysis |
| `study_time_min` | INT | e.g. 60 |
| `video_url` | VARCHAR | Valid YouTube Link |
| `notes_url` | VARCHAR | Valid PDF/Site Link |
| `practice_url` | VARCHAR | Link to quiz |

### Table: `user_progress`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `user_id` | UUID | FK to users |
| `task_id` | INT | FK to tasks |
| `status` | ENUM | 'TODO', 'DONE' |
| `completed_at` | TIMESTAMP | When task was done |

### Table: `mock_tests`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | PK |
| `user_id` | UUID | FK |
| `test_name` | VARCHAR | e.g. "Allen Major 1" |
| `score` | INT | Out of 720 |
| `weak_topic` | VARCHAR | Text input |

## 3. API Endpoints

### **GET /api/today**
*   **Logic**: Returns 3 specific tasks (1 Phy, 1 Chem, 1 Bio) for the user.
*   **Smart Logic**: If user is weak in "Physics" (based on mock tests), give a higher weightage Physics task.

```json
{
  "date": "2026-01-29",
  "tasks": [
    { "subject": "Physics", "topic": "Optics", "video": "...", "status": "TODO" },
    ...
  ]
}
```

### **POST /api/progress**
*   **Body**: `{ "taskId": 102, "markAs": "DONE" }`
*   **Logic**: Updates `user_progress` table.

### **GET /api/important-topics**
*   **Logic**: Queries `tasks` table, sorts by `weightage_score` DESC.

## 4. Automation (The "Fetch Resources" Part)

To keep resources "Real and Updated," you would run a **Python Script** (Cron Job) once a week:

```python
# snippet_updater.py
def find_best_video(topic_name):
    # Use YouTube Data API
    results = youtube.search(q=topic_name + " NEET one shot", order="viewCount")
    return results[0].url

def update_database():
    topics = db.get_all_topics()
    for topic in topics:
        best_video = find_best_video(topic.name)
        db.update_resource(topic.id, best_video)
```
