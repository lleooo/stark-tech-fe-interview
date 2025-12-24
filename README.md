

# Todo API Backend

前端評測輔助用 Todo REST API - 最小可用的 Next.js 15 Todo API，無需資料庫與環境變數，啟動即有內建種
子資料。

### 版本升級說明

本專案已將 Next.js 從 15.x 升級至 16.x，以修復 Vercel 部署時的安全漏洞警告 (CVE-2025-66478)。
## 🚀 線上 Demo- **網站**:
 https://stark-tech-fe-interview-gamma.vercel.app



## 📖 API 文檔

- **Swagger UI**: http://localhost:3001/docs
- **OpenAPI Spec**: http://localhost:3001/api/docs

## 快速開始

### 安裝與啟動

```bash
# 安裝依賴
npm install
# or
pnpm install

# 啟動開發伺服器 (Port 3001)
npm run dev
# or
pnpm dev
```

API 將在 http://localhost:3001 啟動

### 系統需求

- Node.js >= 18.17.0
- npm / pnpm / yarn

## API 路由

### 基礎路由

| 方法   | 路徑              | 說明             |
| ------ | ----------------- | ---------------- |
| GET    | `/api/todos`      | 取得所有待辦事項 |
| POST   | `/api/todos`      | 新增待辦事項     |
| GET    | `/api/todos/:id`  | 取得單筆待辦事項 |
| PATCH  | `/api/todos/:id`  | 更新待辦事項     |
| DELETE | `/api/todos/:id`  | 刪除待辦事項     |
| PATCH  | `/api/todos/bulk` | 批次操作         |

### 取得列表 (GET /api/todos)

**Query 參數** (皆為可選):

- `status`: `all` | `active` | `completed` (預設: `all`)
- `search`: 字串 (模糊搜尋 title/notes)
- `sortBy`: `createdAt` | `updatedAt` | `order` | `dueDate` (預設: `createdAt`)
- `sortDir`: `asc` | `desc` (預設: `desc`)

**範例:**

```bash
# 取得所有待辦事項
GET /api/todos

# 取得未完成的待辦事項
GET /api/todos?status=active

# 搜尋包含 "test" 的待辦事項
GET /api/todos?search=test

# 依照到期日排序
GET /api/todos?sortBy=dueDate&sortDir=asc
```

### 新增待辦事項 (POST /api/todos)

**Request Body:**

```json
{
  "title": "新待辦事項", // 必填 (1-200 字元)
  "notes": "詳細說明", // 可選
  "dueDate": "2024-12-31T23:59:59.000Z", // 可選 (ISO 8601)
  "tags": ["標籤1", "標籤2"], // 可選
  "order": 1 // 可選
}
```

### 更新待辦事項 (PATCH /api/todos/:id)

**Request Body** (所有欄位皆為可選):

```json
{
  "title": "更新的標題",
  "notes": "更新的說明",
  "completed": true,
  "dueDate": "2024-12-31T23:59:59.000Z",
  "tags": ["新標籤"],
  "order": 2
}
```

### 批次操作 (PATCH /api/todos/bulk)

**完成/取消完成所有待辦事項:**

```json
{
  "action": "completeAll",
  "payload": {
    "completed": true // or false
  }
}
```

**清除已完成項目:**

```json
{
  "action": "clearCompleted",
  "payload": {}
}
```

**重新排序:**

```json
{
  "action": "reorder",
  "payload": {
    "orders": [
      { "id": "todoId1", "order": 1 },
      { "id": "todoId2", "order": 2 }
    ]
  }
}
```

## 回應格式

### 成功回應

```json
{
  "success": true,
  "data": {
    /* 資料內容 */
  }
}
```

### 錯誤回應

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "details": {
      /* 錯誤詳情 */
    }
  }
}
```

### 錯誤碼

- `BAD_REQUEST`: 請求參數驗證失敗 (400)
- `NOT_FOUND`: 找不到資源 (404)
- `INTERNAL_ERROR`: 伺服器內部錯誤 (500)

## 資料模型

```typescript
interface Todo {
  id: string; // 唯一識別碼 (cuid)
  title: string; // 標題 (1-200 字元)
  completed: boolean; // 完成狀態
  createdAt: string; // 建立時間 (ISO 8601)
  updatedAt: string; // 更新時間 (ISO 8601)
  order?: number; // 排序順序 (可選)
  dueDate?: string; // 到期日 (ISO 8601, 可選)
  notes?: string; // 備註 (可選)
  tags?: string[]; // 標籤陣列 (可選)
}
```

## 測試 API

### 方式 1: Swagger UI (推薦)

開啟 http://localhost:3001/docs 使用互動式 API 文檔進行測試。

### 方式 2: REST Client

使用 VS Code REST Client 擴充套件開啟 `api.http` 檔案進行測試。

### 方式 3: curl

```bash
# 取得所有待辦事項
curl http://localhost:3001/api/todos

# 新增待辦事項
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"新待辦事項"}'
```

## 資料重置

- 重啟伺服器會自動重置為種子資料
- 使用批次操作的 `clearCompleted` 可清除已完成項目

## 檔案結構

```
src/
  actions/
    todo/
      createTask.ts          # 新增任務 API 呼叫
      getTasks.ts            # 取得任務列表 API 呼叫
      updateTask.ts          # 更新任務 API 呼叫
  app/
    api/
      todos/
        route.ts             # GET (列表), POST (新增)
        [id]/
          route.ts           # GET, PATCH, DELETE (單筆)
        bulk/
          route.ts           # PATCH (批次操作)
      docs/
        route.ts             # OpenAPI Spec JSON
    docs/
      page.tsx               # Swagger UI 頁面
    docs-static/
      page.tsx               # 靜態 Swagger 頁面
    globals.css              # 全域樣式
    layout.tsx               # 根佈局
    page.tsx                 # 首頁
    providers.tsx            # React Query Provider
    ThemeRegistry.tsx        # MUI 主題與 Emotion SSR
  assets/
    icons/                   # 圖示資源
      calendar.png, circle.png, filter.png, ...
  components/
    common/
      DateTimePicker.tsx     # 日期時間選擇器
      ToggleMenu.tsx         # 通用下拉選單
    SortToggleMenu.tsx       # 排序選單
    StatusToggleMenu.tsx     # 狀態篩選選單
    TaskList/
      TaskList.tsx           # 任務列表主元件
      TaskListContent/
        CreateTaskRow.tsx    # 新增任務列
        TableHeadRow.tsx     # 表格標題列
        TaskListContent.tsx  # 任務列表內容
        TaskTable.tsx        # 任務表格
        TitleCell.tsx        # 標題欄位
        Toolbar.tsx          # 工具列
  hooks/
    useCreateTask.ts         # 新增任務 mutation hook
    useUpdateTask.ts         # 更新任務 mutation hook (含樂觀更新)
  lib/
    cors.ts                  # CORS 處理
    data.ts                  # 記憶體資料儲存
    date.ts                  # 日期格式化工具
    responses.ts             # 統一回應格式
    swagger.ts               # Swagger 配置
    theme.ts                 # MUI 主題設定
    types.ts                 # TypeScript 型別定義
    validations.ts           # Zod 驗證 schemas
data/
  todos.seed.json            # 種子資料
api.http                     # REST Client 測試檔
```
