# MongoDB Atlas Setup (Alternative to Local MongoDB)

If local MongoDB keeps failing, use **MongoDB Atlas** (free cloud database).

## Steps

### 1. Create Atlas account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up (free)

### 2. Create a cluster
- Click **Build a Database** → choose **M0 FREE**
- Pick a cloud provider & region (closest to you)
- Click **Create**

### 3. Create database user
- **Database Access** → **Add New Database User**
- Username: `wildart` (or any name)
- Password: create a strong password (save it!)
- Click **Add User**

### 4. Allow network access
- **Network Access** → **Add IP Address**
- For development: click **Allow Access from Anywhere** (`0.0.0.0/0`)
- Click **Confirm**

### 5. Get connection string
- **Database** → **Connect** → **Connect your application**
- Copy the connection string, e.g.:
  ```
  mongodb+srv://wildart:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- Replace `<password>` with your actual password
- Add database name: change `?retryWrites` to `/wildart?retryWrites`

### 6. Update backend/.env
```env
MONGODB_URI=mongodb+srv://wildart:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wildart?retryWrites=true&w=majority
```

### 7. Restart backend
```bash
npm run backend
```

---

**Note:** If you use special characters in your password, URL-encode them (e.g. `@` → `%40`).
