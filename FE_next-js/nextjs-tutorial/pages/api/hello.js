import React from 'react'

// API route guide에 따라 만듦 
export default function handler(req, res) {
  // req는 http.IncomingMessage의 인스턴스이다. 
  // res는 http.ServerResponse의 인스턴스이다. 
  res.status(200).json({ text: 'hello' });
}
