# Laravel-Vue SPA

這是一個展示如何使用 Laravel 作為後端框架以及 Vue.js 作為前端框架來構建單頁應用程式（SPA）的示例專案。此專案提供了文件夾結構和基本邏輯的範例，方便與前端進行快速協作。

## 目錄
- [專案結構](#專案結構)
    - [資料夾總覽](#資料夾總覽)
    - [詳細的資料夾結構](#詳細的資料夾結構)

## 專案結構

### 資料夾總覽

以下是本專案中的主要資料夾和文件的簡要概述：
```
laravel-vue-spa/
├── app/                  # Laravel 後端邏輯和模型
├── public/               # 公共資源和 Laravel 入口文件
├── resources/            # Laravel 視圖和前端資源
│   └── js/               # Vue.js 應用程式檔案（別名：vue/src）
├── routes/               # Laravel 路由定義
└── ...
```
本說明文件主要介紹 `vue/src` 目錄（即 `laravel/resources/js`），其中包含 Vue.js 的主要應用程式程式碼。

### 詳細的資料夾結構

以下是 `vue/src` 目錄的詳細結構，用於組織組件、視圖、樣式、資源等：
```
vue/src/
|__ styles/                      # 全局樣式、樣式變數和混合樣式
|   |__ main/                    # 專門用於前台的樣式
|   |__ admin/                   # 專門用於後台的樣式
|
|__ assets/                      # 靜態資源
|   ├── images/                  # 圖片資源
|   └── fonts/                   # 字型資源
|
|__ components/                  # 可重用組件
|   |__ commons/                 # 前後台皆可用的通用組件（如按鈕、表單等）
|   |__ main/                    # 專門用於前台的組件
|   |__ admin/                   # 專門用於後台的組件
|
|__ plugins/                     # 外部插件設定
|   |__ i18n/index.js            # 多語系插件配置
|   |__ axios/index.js           # Axios API 請求設置、封裝
|
|__ views/                       # 頁面視圖
|   |__ main/                    # 前台
|       |__ Home.vue             # 前台首頁
|       |__ layouts/             # 前台佈局
|           |__ master.vue       # 前台主佈局
|           |__ nav.vue          # 前台導航佈局
|       |__ auth/                # 認證相關頁面（登入、註冊）
|           |__ partials/
|               |__ AuthLayout.vue # 認證佈局
|           |__ AuthSignIn.vue   # 登入頁面
|           |__ AuthSignUp.vue   # 註冊頁面
|       |__ [domains]/           # 前台特定功能或模組頁面
|           |__ Index.vue        # 列表頁（例如商品列表）
|           |__ Create.vue       # 新增頁（例如新增商品）
|           |__ Edit.vue         # 編輯頁（例如編輯商品）
|           |__ Show.vue         # 詳細頁（例如商品詳情）
|
|   |__ admin/                   # 後台
|       |__ Dashboard.vue        # 後台儀表板
|       |__ layouts/             # 後台佈局
|           |__ master.vue       # 後台主佈局
|           |__ nav.vue          # 後台導航佈局
|       |__ auth/                # 認證相關頁面（登入、註冊）
|           |__ partials/
|               |__ AuthLayout.vue # 認證佈局
|           |__ AuthSignIn.vue   # 登入頁面
|           |__ AuthSignUp.vue   # 註冊頁面
|       |__ [domains]/           # 後台功能模組頁面
|           |__ Index.vue        # 列表頁（如管理商品列表）
|           |__ Create.vue       # 新增頁（如新增商品）
|           |__ Edit.vue         # 編輯頁（如編輯商品）
|           |__ Show.vue         # 詳細頁（如商品詳情）
|
|__ router/                      # 路由設定
|   |__ index.js                 # 路由入口文件（若有區分前後台，則省略）
|   |__ main.js                  # 前台路由
|   |__ admin.js                 # 後台路由
|
|__ services/                    # 服務層，進行 API 請求或外部服務調用
|   |__ apis/                    # 所有 API 請求的預處理
|       |__ [domains].js         # CRUD API，例如 product.js
|
|__ stores/                      # 全局狀態管理（Pinia）
|       |__ main/                # 前台狀態模組
|           |__ user.js          # 使用者狀態
|       |__ admin/               # 後台狀態模組
|
|__ utils/                       # 工具函數，如日期格式化、計算函數等
|
|__ App.vue                      # 主應用組件
|__ main-app.js                  # 前台入口檔案
|__ admin-app.js                 # 後台入口檔案
```

#### 主要資料夾說明

- **styles/**：包含全局樣式設定，包括樣式變數和混合樣式以確保項目中樣式的一致性。
    - `main/`：前台專屬樣式。
    - `admin/`：後台專屬樣式。

- **assets/**：存放靜態資源，如圖片和字型。

- **components/**：包含可重用組件，前後台分別有不同的組件。
    - `commons/`：通用組件，例如按鈕和表單。
    - `main/` 和 `admin/`：前台和後台專用的組件。

- **plugins/**：外部插件的設定，例如：
    - `i18n/`：多語系配置。
    - `axios/`：Axios API 請求設定。

- **views/**：包含所有的主頁面視圖。
    - `main/`：前台的頁面視圖。
    - `admin/`：後台的頁面視圖。
    - `[domains]/`：各模組的特定頁面，例如產品或使用者管理等。

- **router/**：應用程式路由設定，分為前台（`main.js`）和後台（`admin.js`）的路由文件。

- **services/**：提供 API 服務層，用於管理所有的外部請求。
    - `apis/`：依功能模組整理 API 請求處理邏輯。

- **stores/**：使用 Pinia 進行全局狀態管理。
    - `main/`：前台的狀態模組。
    - `admin/`：後台的狀態模組。

- **utils/**：工具函數，例如日期格式化、計算函數等。

