# AI Resume Analyzer — n8n Workflow

## Overview

This **AI Resume Analyzer** automates the process of analyzing resumes uploaded to a Google Drive folder using **n8n** and **Google Gemini Chat Model**.
It extracts text from PDF resumes, processes the content using an AI model, and saves structured analysis results (like candidate name, skills, and summary) into a Google Sheet automatically.

---

## Architecture

graph TD
    subgraph A[Trigger & Input]
        GD_T([1. Google Drive Trigger]) --> GD_D[2. Download File]
        style GD_T fill:#f9f,stroke:#333
        style GD_D fill:#c0f9c0,stroke:#333
    end

    subgraph B[Preparation & AI Core]
        GD_D --> EF[3. Extract From File]
        EF --> AIA[4. AI Agent (Google Gemini)]
        style EF fill:#f0f0c0,stroke:#333
        style AIA fill:#c0c0f9,stroke:#333
    end

    subgraph C[Output & Storage]
        AIA --> EFd[5. Edit Fields]
        EFd --> S_A[[6. Append Row in Sheet]]
        style EFd fill:#f9f9c0,stroke:#333
        style S_A fill:#c0f9f9,stroke:#333
    end

    User[User Uploads PDF] -->> GD_T
    AIA -.-> Model(Google Gemini Chat Model)
    S_A -->> GS[Google Sheet Database]

    subgraph Legend
        LG1(Data Flow)
        LG2(AI Processing)
        LG3(Storage/Database)
        style LG1 fill:#ffffff,stroke:#333
        style LG2 fill:#c0c0f9,stroke:#333
        style LG3 fill:#c0f9f9,stroke:#333
    end


## Workflow Structure

### 1. **Google Drive Trigger**

* **Node:** `Google Drive Trigger1`
* **Event:** `fileCreated`
* **Purpose:**
  Watches a specific Google Drive folder. When a new resume (PDF) is uploaded, the workflow starts automatically.

---

### 2. **Download File**

* **Node:** `Download file`
* **Purpose:**
  Downloads the uploaded resume file from Google Drive for processing.

---

### 3. **Extract From File**

* **Node:** `Extract from File`
* **Operation:** `Extract from PDF`
* **Purpose:**
  Extracts the text content from the PDF resume for analysis.

---

### 4. **AI Agent**

* **Node:** `AI Agent1`
* **Connected Model:** `Google Gemini Chat Model1`
* **Purpose:**
  Sends the extracted text to the Gemini model for analysis.
  The model identifies and summarizes important details such as:

  * Candidate’s name
  * Contact information
  * Education details
  * Work experience
  * Skills
  * Summary or suitability score

  **Example Prompt:**

  ```text
  Analyze the following resume text and extract:
  - Candidate Name
  - Email
  - Phone
  - Key Skills
  - Education
  - Work Experience Summary
  - Overall Summary (2 lines)
  Resume Text:
  {{ $json["data"] }}
  ```

---

### 5. **Edit Fields**

* **Node:** `Edit Fields1`
* **Operation:** `Manual mapping`
* **Purpose:**
  Maps the AI output to specific fields for insertion into Google Sheets.
  Example Fields:

  * `Name`
  * `Email`
  * `Skills`
  * `Experience`
  * `Summary`

---

### 6. **Append Row in Sheet**

* **Node:** `Append row in sheet1`
* **Operation:** `append: sheet`
* **Purpose:**
  Appends the analyzed resume data to a Google Sheet, creating a structured record for each uploaded resume.

---

## Data Flow Summary

| Step                 | Input             | Output              | Description        |
| -------------------- | ----------------- | ------------------- | ------------------ |
| Google Drive Trigger | Resume file (PDF) | File metadata       | Detects new upload |
| Download File        | File ID           | PDF file            | Downloads resume   |
| Extract From File    | PDF               | Extracted text      | Gets resume text   |
| AI Agent             | Text              | Structured analysis | AI analyzes resume |
| Edit Fields          | AI output         | Clean fields        | Maps data          |
| Append Row           | Fields            | Google Sheet row    | Saves to sheet     |

---

## Example Output in Google Sheet

| Name     | Email                                           | Skills                        | Experience | Summary                                |
| -------- | ----------------------------------------------- | ----------------------------- | ---------- | -------------------------------------- |
| John Doe | [john.doe@email.com](mailto:john.doe@email.com) | Python, SQL, Machine Learning | 3 years    | Strong data analyst with ML expertise. |

---

## Integrations Used

* **Google Drive**
* **Google Sheets**
* **Google Gemini Chat Model (via AI Agent)**
* **n8n PDF Extractor**

---

## How to Use

1. Create a **Google Drive** folder for resumes.
2. Set up **Google Sheets** with the columns you want.
3. Import the workflow in **n8n**.
4. Configure Google Drive and Sheets credentials.
5. Connect your **Gemini API key**.
6. Activate the workflow.
7. Upload resumes to the Drive folder and watch results populate in Sheets!

---

## Customization Ideas

* Add a **filter** node to skip non-PDF files.
* Include a **score generator** using Gemini to rate candidates.
* Send analysis summaries via **email or Slack** automatically.
* Store results in **Notion or Airtable** for HR dashboards.

---

## Example Use Case

An HR department uploads resumes to a Google Drive folder.
Within seconds, n8n:

1. Downloads and extracts each resume.
2. Uses Google Gemini AI to analyze the content.
3. Saves all candidate details into a Google Sheet for quick review.

