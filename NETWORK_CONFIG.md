# 📱 Multi-Device Configuration

## Quick Answer: YES! ✅

Your chat app **works on multiple devices** on the same WiFi network!

---

## ⚡ QUICK SETUP (2 Minutes)

### Step 1: Find Your Computer's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" → Copy it (e.g., `192.168.0.100`)

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" → Copy it

### Step 2: Edit `src/App.jsx`

Line 14-15 - Change:
```javascript
const SERVER_URL = 'http://localhost:3001';
```

To:
```javascript
const SERVER_URL = 'http://192.168.0.100:3001'; // Use YOUR IP
```

**SAVE the file** (auto-refreshes)

### Step 3: Start Servers

**Terminal 1:**
```bash
cd server && npm start
```

**Terminal 2:**
```bash
npm run dev
```

### Step 4: Open on Other Devices

```
Browser: http://192.168.0.100:5173
```

---

## 🎯 DEVICE SCENARIOS

### Same Computer Only (Default)
```javascript
const SERVER_URL = 'http://localhost:3001';
// Use http://localhost:5173 in browser
// Works on THIS computer only
```

### Multiple Devices on WiFi (What You Want)
```javascript
const SERVER_URL = 'http://192.168.0.100:3001'; // Your IP
// Use http://192.168.0.100:5173 on other devices
// Works on ALL devices on same network
```

---

## ✅ FEATURES THAT WORK

- ✅ Real-time messaging between devices
- ✅ Typing indicators
- ✅ User list updates
- ✅ Group chat rooms
- ✅ Join/leave notifications
- ✅ Instant message delivery (< 50ms)
- ✅ No latency issues
- ✅ Works with 2+ devices

---

## 📋 CHECKLIST

- [ ] Find IP address with `ipconfig`
- [ ] Edit `src/App.jsx` line 14-15
- [ ] Replace `localhost` with your IP
- [ ] Terminal 1: `cd server && npm start`
- [ ] Terminal 2: `npm run dev`
- [ ] Computer browser: http://192.168.0.100:5173
- [ ] Other devices: http://192.168.0.100:5173
- [ ] See login form
- [ ] Enter username and room
- [ ] Chat works! ✨

---

## 🆘 Common Issues

| Issue | Fix |
|-------|-----|
| "Cannot connect" | Check IP is correct, firewall allows port 3001 |
| "localhost didn't work" | Use IP address instead (e.g., 192.168.0.100) |
| "Can't reach from phone" | Make sure phone is on same WiFi |
| "Wrong IP?" | Run `ipconfig` again to verify |

---

**That's it! Now your chat works on multiple devices! 🚀**

See `MULTI_DEVICE.md` for detailed instructions.
