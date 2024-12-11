-- テストユーザー
INSERT INTO "User" (id, email, "name", "password", "createdAt", "updatedAt")
VALUES 
  ('cm3me86wy0003og3i9t5310us',
   'test@example.com',
   'テストユーザー',
   '$2b$12$5jOXpBZyNiIPoiUfa2JMVuDdPGDTMLqdw2Cv.UzTB/pWSV8m0R6Be',
   NOW(),
   NOW());

-- テストユーザーのお気に入り楽曲
INSERT INTO "Favorite_Song"(id, user_id, api_song_id, "createdAt", "updatedAt")
VALUES 
('1', 'cm3me86wy0003og3i9t5310us', 2122792287, NOW(), NOW() + INTERVAL '1 HOUR'),
('2', 'cm3me86wy0003og3i9t5310us', 467267512, NOW(), NOW() + INTERVAL '2 HOUR'),
('3', 'cm3me86wy0003og3i9t5310us', 1117825182, NOW(), NOW() + INTERVAL '3 HOUR'),
('4', 'cm3me86wy0003og3i9t5310us', 2326140975, NOW(), NOW() + INTERVAL '4 HOUR');

-- テストユーザーのお気に入りアーティスト
INSERT INTO "Favorite_Artist"(id, user_id, api_artist_id, "createdAt", "updatedAt")
VALUES 
('1', 'cm3me86wy0003og3i9t5310us', 109785742, NOW(), NOW() + INTERVAL '1 HOUR'),
('2', 'cm3me86wy0003og3i9t5310us', 4726033, NOW(), NOW() + INTERVAL '2 HOUR'),
('3', 'cm3me86wy0003og3i9t5310us', 5482289, NOW(), NOW() + INTERVAL '3 HOUR'),
('4', 'cm3me86wy0003og3i9t5310us', 1460437, NOW(), NOW() + INTERVAL '4 HOUR');
