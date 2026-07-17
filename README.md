# 🚔 SAPD Pager Dispatch Bot

A professional Discord-based **Emergency Dispatch & Panic Alarm System** developed for San Andreas Police Department roleplay communities.

The bot provides a lightweight Computer-Aided Dispatch (CAD) style system inside Discord, allowing officers to create incidents, respond, update statuses, and manage emergency situations in real time.

---

# ✨ Features

## 🚨 Dispatch System

- Create emergency dispatches
- Priority-based incidents:
  - 🔴 Extreme
  - 🟠 High
  - 🟡 Low
  - 🟢 Very Low

- Request specific divisions:
  - Police Officers
  - Supervisors
  - Detectives
  - SWAT
  - Traffic Division

- Real-time dispatch updates
- Officer response tracking
- Dispatch status management:

```
WAITING
EN_ROUTE
ON_SCENE
CLEAR
CLOSED
```

- Automatic dispatch numbering
- Department role tagging
- Dispatch alert notifications
- Responding officer tracking
- Dispatch history logs
- Automatic button disabling after closure


---

# 🔴 Panic Alarm System

Emergency officer assistance system.

Features:

- Officer emergency panic activation
- Immediate officer notifications
- SWAT and Police Officer tagging
- Real-time response tracking
- Status updates
- Panic closure system
- Panic incident logging


---

# 📡 Dynamic Bot Presence

The bot automatically updates its Discord status based on active incidents.

Example:

```
👀 Watching 3 Active Dispatches
```

Future support:

```
👀 Watching 🚨 3 Dispatches | 🔴 1 Panic
```


---

# 🛠️ Technology Stack

## Backend

- Node.js
- Discord.js v14
- SQLite
- Better SQLite3


---

# 📦 Required Modules


The following packages are required to run SAPD Pager Dispatch Bot.


## Production Dependencies


### Discord Framework

```
discord.js
```

Used for:
- Discord API communication
- Slash commands
- Buttons
- Modals
- Select menus
- Embeds


---

### Database

```
better-sqlite3
```

Used for:
- SQLite database storage
- Dispatch records
- Panic records
- Server configuration


---

### Environment Configuration

```
dotenv
```

Used for:
- Loading bot token
- Environment variables
- Secure configuration


---

### File Management

```
fast-glob
```

Used for:
- Dynamic command loading
- Event loading


---

### Logging

```
pino
```

Used for:
- Application logging
- Error tracking
- System monitoring


---

### Validation

```
zod
```

Used for:
- Data validation
- Configuration checking


---

# 🧪 Development Dependencies


These modules are only required during development.


```
@eslint/js
eslint
globals
pino-pretty
prettier
tsx
```


Used for:

- Code formatting
- Error checking
- Development runtime
- Debug logging


---

# 📋 Requirements


Before installation make sure you have:

- Node.js 20+
- Discord Bot Application
- Discord Server Administrator permissions


Check Node.js:

```bash
node -v
```


Recommended:

```
Node.js 20 LTS or newer
```


---

# 🤖 Creating Discord Bot


## 1. Create Discord Application


Visit:

https://discord.com/developers/applications


Click:

```
New Application
```


Create your bot.


---

## 2. Enable Required Intents


Go to:

```
Developer Portal
→ Your Application
→ Bot
```


Enable:


```
SERVER MEMBERS INTENT

MESSAGE CONTENT INTENT

PRESENCE INTENT
```


---

## 3. Invite Bot


Go to:

```
OAuth2
→ URL Generator
```


Select:


Scopes:

```
bot
applications.commands
```


Permissions:

```
Administrator
```


Invite the bot.


---

# 📥 Installation


Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```


Enter project:

```bash
cd sapd-dispatcher
```


Install modules:

```bash
npm install
```


---

# 🔐 Environment Configuration


Create:


```
.env
```


Add:


```env
TOKEN=YOUR_DISCORD_BOT_TOKEN

CLIENT_ID=YOUR_APPLICATION_CLIENT_ID

GUILD_ID=YOUR_TEST_SERVER_ID
```


---

# 🗄️ Database


The bot automatically creates the SQLite database on first startup.


Database:

```
database/database.sqlite
```


Stored information:

```
Server Settings

Role Configuration

Dispatch Records

Panic Records

Response History

Audit Logs
```


---

# 🚀 Running The Bot


## Development


```bash
npm run dev
```


## Production


```bash
npm start
```


---

# 📝 Deploy Commands


After installation:


```bash
npm run deploy
```


This registers Discord commands.


---

# ⚙️ Initial Setup


After starting the bot:


Run:


```
/setup_dispatch
```


The setup wizard configures:


- Dispatch Console Channel
- Dispatch Alert Channel
- Logging Channel
- Department Roles
- Officer Roles


---

# 📂 Project Structure


```
src
│
├── commands
│
├── events
│
├── services
│
├── repositories
│
├── builders
│   │
│   ├── embeds
│   │
│   └── components
│
├── database
│
├── utils
│
└── deploy
```


---

# 🔒 Required Bot Permissions


The bot requires:


```
Manage Channels

Manage Roles

Send Messages

Embed Links

Read Message History

Use Application Commands

View Channels
```


---

# ☁️ Hosting Deployment


Supported platforms:


- VPS
- Railway
- Render
- Pterodactyl
- Docker
- Any Node.js hosting


---

# 🚂 Railway Deployment


## 1. Connect Repository


Select:


```
Deploy From GitHub
```


Choose this repository.


---

## 2. Add Environment Variables


Add:


```
TOKEN

CLIENT_ID

GUILD_ID
```


---

## 3. Start Command


```bash
npm start
```


---

# 🖥️ VPS Deployment


Install Node.js:


```bash
sudo apt update

sudo apt install nodejs npm
```


Clone project:


```bash
git clone repository-url
```


Install packages:


```bash
npm install
```


Start:


```bash
npm start
```


---

# 🔄 Running 24/7 With PM2


Install PM2:


```bash
npm install pm2 -g
```


Start bot:


```bash
pm2 start src/index.js --name sapd-dispatch
```


Save:


```bash
pm2 save
```


---

# 🐞 Troubleshooting


## Bot Does Not Login


Check:

```
TOKEN
```

inside `.env`.


---

## Commands Not Appearing


Run:


```bash
npm run deploy
```


---

## Database Error


Restart the bot and verify database permissions.


---

## Missing Permissions


Make sure the bot role is:

- Above department roles
- Above officer roles


---

# 🔮 Roadmap


## Completed


✅ Dispatch System

✅ Panic Alarm System

✅ Officer Response Tracking

✅ Dispatch Logging

✅ Panic Logging

✅ Setup Wizard

✅ Dynamic Bot Presence


## Planned


⬜ Dispatch Statistics

⬜ Officer Activity Tracking

⬜ Web CAD Interface

⬜ Mobile Officer Panel


---

# 📜 License


This project is created for roleplay communities.

Usage and redistribution should follow the repository license.


---

# 👮 SAPD Pager Dispatch


Built for:

**San Andreas Police Department Roleplay Communities**


Emergency Response  
Officer Safety  
Real-Time Dispatch
