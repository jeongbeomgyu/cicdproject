'use client';

import { useState, useEffect } from 'react';

// localhost 를 하드코딩한 부분을 수정 
// const API_BASE_URL = 'http://localhost:8080/api/guestbook';

// 환경 변수가 있으면 사용하고, 없으면 기본값으로 localhost를 사용
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/guestbook` 
  : 'http://localhost:8080/api/guestbook';

export default function Home() {
  const [guestBooks, setGuestBooks] = useState([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //리스트 조회
  const fetchGuestBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setGuestBooks(data);
      } else {
        setError('게스트북을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('게스트북을 불러오는데 실패했습니다.');
      console.error('Error fetching guestbooks:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchGuestBooks();
  }, []);

  // 게스트북 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nickname.trim() || !content.trim()) {
      setError('닉네임과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        // 작성 성공 시 리스트 새로고침
        setNickname('');
        setContent('');
        await fetchGuestBooks();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || '게스트북 작성에 실패했습니다.');
      }
    } catch (err) {
      setError('게스트북 작성에 실패했습니다.');
      console.error('Error creating guestbook:', err);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          방명록
        </h1>

        {/* 입력 폼 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="닉네임을 입력하세요"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="방명록 내용을 입력하세요"
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? '처리 중...' : '작성하기'}
            </button>
          </form>
        </div>

        {/* 게스트북 리스트 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            방명록 목록 ({guestBooks.length})
          </h2>
          
          {loading && guestBooks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              로딩 중...
            </div>
          ) : guestBooks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              작성된 방명록이 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {guestBooks.map((guestBook) => (
                <div
                  key={guestBook.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-indigo-600">
                      {guestBook.nickname}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(guestBook.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {guestBook.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
