import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// ESMで__dirnameを再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// フォームのデータを解析する設定
app.use(express.urlencoded({ extended: true }));

// 投稿データを保存する配列（サーバーを再起動すると消えます）
const posts = [];

// 掲示板ページの表示
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 投稿データ（API）の取得
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 新しい投稿の受付
app.post('/post', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        posts.unshift({ name, message, time: new Date().toLocaleString('ja-JP') });
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
