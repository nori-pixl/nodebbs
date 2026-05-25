import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Render環境のポート、またはローカルの3000番ポートを使用
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTMLのフォームから送信されるデータを解析するための設定
app.use(express.urlencoded({ extended: true }));

// 投稿データ（iframeの文字列など）を一時保存する配列（サーバー再起動でリセットされます）
const posts = [];

// 1. トップページ（/）にアクセスされたら、先ほどの index.html を表示する
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. HTML側の「loadPosts()」が、投稿一覧データを取得するためのルート（API）
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 3. HTML側の「submit」イベントから、データを受け取って保存するルート
app.post('/post', (req, res) => {
    const { message } = req.body;
    
    if (message && message.trim() !== "") {
        // 配列の先頭に新しい投稿を追加（投稿日時も一緒に記録）
        posts.unshift({ 
            message: message, 
            time: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) 
        });
    }
    
    // 保存が成功したことを示すステータス（200 OK）を返却
    res.sendStatus(200);
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
