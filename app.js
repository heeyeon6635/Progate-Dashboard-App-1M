import express from "express";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export const app = express();

// import.meta.dirname を使って現在のディレクトリを取得
const __dirname = import.meta.dirname;

app.use(express.json()); // JSON形式のリクエストボディを解釈
app.use(express.static(path.join(__dirname, "public"))); // publicフォルダを静的ファイル配信

// JSONファイルのパス
const flashcardsFile = path.join(__dirname, "data", "flashcards.json");

// /api/flashcards に GETリクエストが来たら "flashcards.json" の内容を返す
app.get("/api/flashcards", async (req, res) => {
  try {
    // ファイル読み込み
    const data = await readFile(flashcardsFile, "utf-8");
    const flashcards = JSON.parse(data);

    res.json(flashcards); // JSONで返す
  } catch (error) {
    console.error("読み込みエラー:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

// /api/flashcards に POSTリクエストが来たら "flashcards.json" に追加し、追加したデータを返す
app.post("/api/flashcards", async (req, res) => {
  try {
    // 新しいカードデータをリクエストボディから取得
    const newCard = req.body;

    // 既存のデータを読み込む
    const data = await readFile(flashcardsFile, "utf-8");
    const flashcards = JSON.parse(data);

    // 新しいカードを追加
    flashcards.push(newCard);

    // 更新された配列をファイルに書き込み
    await writeFile(flashcardsFile, JSON.stringify(flashcards, null, 2));

    // 追加したデータをレスポンスとして返す
    res.status(201).json(newCard);
  } catch (error) {
    console.error("書き込みエラー:", error);
    res.status(500).json({ error: "データの保存に失敗しました" });
  }
});

// 플래쉬 카드 수정 및 삭제
