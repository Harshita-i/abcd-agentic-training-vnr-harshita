
# **AI News Digest Telegram Bot**

> Get summarized, AI-analyzed news instantly — personalized, stored, and alert-driven.

---

## **Overview**

The **AI News Digest Telegram Bot** provides users with real-time news updates fetched from the **GNews API**, automatically summarized using **Google Gemini AI**, and delivered directly via Telegram.
It supports features like:

* Personalized topic tracking
* Keyword-based alerts
* Trending topic discovery
* Persistent chat memory (SQLite)

This bot helps users stay informed efficiently, reducing the time needed to read multiple sources.

---

## **High-Level Architecture**

```
+-------------------+
|   Telegram User   |
+--------+----------+
         |
         v
+-----------------------------+
|   Telegram Bot Interface    |
| (python-telegram-bot lib)   |
+-------------+---------------+
              |
              v
+-----------------------------+
|        Application Logic    |
| (Commands, Routing, etc.)   |
+-------------+---------------+
              |
     +--------+--------+
     |                 |
     v                 v
+-----------+   +------------------+
|  GNews API|   | Google Gemini AI |
| (News Data)|  | (AI Summarizer)  |
+-----------+   +------------------+
     |
     v
+---------------------------------------+
|   SQLite Database (memory.db)         |
| - interactions (user history)         |
| - alerts (keyword subscriptions)      |
+---------------------------------------+
```

---

## **Key Functionalities**

| Feature                  | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `/news <topic>`          | Fetches latest news from GNews API, summarizes via Gemini AI, and displays AI Digest |
| `/history`               | Displays user’s last 3–5 news summaries                                              |
| `/mytopics`              | Shows frequently searched topics by user                                             |
| `/discover`              | Suggests trending topics unexplored by user                                          |
| `/alert <keyword>`       | Sets a keyword alert — user notified when keyword appears in new news                |
| `/alerts`                | Lists all user’s active alerts                                                       |
| `/removealert <keyword>` | Removes a previously set keyword alert                                               |
| `/trending`              | Displays globally trending topics across all users                                   |

---

## **Detailed Flow**

### **1. /news Command Flow**

```
User → /news AI
        ↓
Telegram Bot Handler
        ↓
Check topic → "AI"
        ↓
Fetch top 5 articles from GNews API
        ↓
Concatenate headlines + descriptions
        ↓
Pass to Google Gemini API → Generate 5-point summary
        ↓
Store interaction (topic, summary, timestamp) in SQLite
        ↓
Check for alert keywords match → Notify subscribers
        ↓
Send summarized result to User (and channel if configured)
```

---

### **2. /alert Command Flow**

```
User → /alert Bitcoin
        ↓
Insert alert record into SQLite (chat_id, keyword)
        ↓
Whenever /news runs:
   ↓
   Check all alerts table entries
   ↓
   If keyword in new article titles/descriptions
       ↓
       Notify that user ("ALERT: 'Bitcoin' found in latest news!")
```

---

### **3. /history Command Flow**

```
User → /history 5
        ↓
SQLite → SELECT last 5 summaries for chat_id
        ↓
Display in reverse chronological order with timestamps
```

---

## **Database Design**

### **1. interactions Table**

| Column      | Type         | Description                                   |
| ----------- | ------------ | --------------------------------------------- |
| id          | INTEGER (PK) | Auto-increment primary key                    |
| chat_id     | TEXT         | Telegram chat ID of the user                  |
| input_topic | TEXT         | The news topic or category                    |
| news_data   | TEXT         | Raw fetched news data (titles + descriptions) |
| summary     | TEXT         | AI-generated summary                          |
| timestamp   | DATETIME     | Automatically set to current timestamp        |

### **2. alerts Table**

| Column  | Type         | Description                           |
| ------- | ------------ | ------------------------------------- |
| id      | INTEGER (PK) | Auto-increment                        |
| chat_id | TEXT         | Telegram chat ID                      |
| keyword | TEXT         | Keyword to monitor for alert triggers |

---

## **Low-Level Design (LLD)**

### **Core Components**

| Component             | Responsibility                              |
| --------------------- | ------------------------------------------- |
| `news_command()`      | Fetch, summarize, log, and broadcast news   |
| `summarize_with_ai()` | Interacts with Gemini API for summarization |
| `get_news()`          | Interacts with GNews API                    |
| `log_interaction()`   | Saves each query and summary to SQLite      |
| `notify_alerts()`     | Checks news data for alert keywords         |
| `alert_command()`     | Adds alert keywords to database             |
| `discover_command()`  | Suggests unexplored trending topics         |
| `mytopics_command()`  | Shows personal topic stats                  |
| `trending_command()`  | Shows global trending topics                |

---

## **Integration Details**

### **APIs Used**

1. **GNews API**

   * Endpoint: `https://gnews.io/api/v4/`
   * Used for fetching top or category-based headlines
   * Requires `GNEWS_API_KEY`

2. **Google Gemini AI**

   * Model: `gemini-2.0-flash`
   * Used for summarizing fetched news content
   * Requires `GOOGLE_API_KEY`

---

## **Environment Variables**

| Variable             | Description                         |
| -------------------- | ----------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API Token              |
| `GNEWS_API_KEY`      | GNews API Key                       |
| `GOOGLE_API_KEY`     | Google Gemini API Key               |
| `TELEGRAM_CHAT_ID`   | Optional — Channel ID for broadcast |

---

## **Tech Stack**

| Layer         | Technology                               |
| ------------- | ---------------------------------------- |
| Bot Framework | `python-telegram-bot`                    |
| AI Model      | `google.generativeai` (Gemini 2.0 Flash) |
| Database      | SQLite3                                  |
| External API  | GNews                                    |
| Environment   | Python 3.10+, dotenv, requests           |

---

## **Application Architecture Diagram**

```
                 ┌────────────────────┐
                 │   Telegram Client  │
                 └─────────┬──────────┘
                           │
              ┌────────────▼─────────────┐
              │  Telegram Bot Framework  │
              │ (Command Handlers Layer) │
              └────────────┬─────────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                 │
 ┌────────▼────────┐              ┌─────────▼─────────┐
 │   News Module   │              │   Alerts Module   │
 │  (Fetch + Summ) │              │ (Notify + Manage) │
 └────────┬────────┘              └─────────┬─────────┘
          │                                 │
          │                                 │
 ┌────────▼────────┐              ┌─────────▼─────────┐
 │ GNews API Layer │              │   SQLite Memory    │
 └────────┬────────┘              │ interactions/alerts│
          │                       └─────────┬─────────┘
          │                                 │
          └─────────────────────────────────┘
                     (Read/Write Operations)
```

---

## **Execution Steps**

1. **Install dependencies**

   pip install python-telegram-bot==20.3 google-generativeai python-dotenv requests sqlite3
 

2. **Set environment variables**

   TELEGRAM_BOT_TOKEN
   GNEWS_API_KEY
   GOOGLE_API_KEY
   TELEGRAM_CHAT_ID

3. **Run the bot**

   python app.py

4. **Test commands on Telegram**

   /news technology
   /history
   /alert AI
   /alerts
   /mytopics
   /discover


---

## **Example Output**

**Command:**
`/news space`

**Bot Reply:**

```
AI News Digest: Space 

• NASA prepares new lunar module test for 2025.
• SpaceX schedules next Starlink launch this week.
• ISRO announces collaboration on Mars data analysis.
• China’s Tiangong station expands research capacity.
• Private firms eye asteroid mining as next frontier.
```

---

## **Future Enhancements**

* ✅ Multi-language news summaries
* ✅ Voice-based summaries (TTS integration)
* ✅ Daily/weekly newsletter generation
* ✅ Web dashboard for analytics
* ✅ AI-based keyword suggestion for alerts

---

## **Flow Diagram (Detailed Command Flow)**

```
+------------------+
| User types /news |
+------------------+
          |
          v
+----------------------------+
| Telegram Command Handler   |
+----------------------------+
          |
          v
+----------------------------+
| Fetch News from GNews API  |
+----------------------------+
          |
          v
+----------------------------+
| Summarize via Gemini Model |
+----------------------------+
          |
          v
+----------------------------+
| Store in SQLite (memory.db)|
+----------------------------+
          |
          v
+----------------------------+
| Send Summary + Notify Alerts|
+----------------------------+
```

---

