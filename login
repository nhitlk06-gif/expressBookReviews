cURL Command:
curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"john_doe\",\"password\":\"password123\"}" -c cookie.txt

Output:
{"message":"User successfully logged in","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGFzc3dvcmQxMjMiLCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzkyNjkyODAxLCJleHAiOjE3OTI2OTY0MDF9.-W4UeyaTh1qe2HeUN-ANjD17gzXwOx7lfXu3SAJ9SAc"}
