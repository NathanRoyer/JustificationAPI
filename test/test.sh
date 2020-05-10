HOST=http://localhost:8080/api
TOKEN=$(curl -s -X POST -H "Content-Type: text/plain" -d @test/email-for-token.txt $HOST/token)
echo "Token: $TOKEN"
echo "Testing user limits"
echo "Request #1"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #2"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #3"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
sleep 5s
sleep 1m
echo "Request #4 after 1mn"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #5"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #6"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #7"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
sleep 2m
echo "Request #8 after 2mn"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #9"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #10"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "Request #11"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo