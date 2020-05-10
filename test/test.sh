HOST=http://localhost:8080/api
TOKEN=$(curl -s -X POST -H "Content-Type: text/plain" -d @test/input-to-justify.txt $HOST/token)
echo "Invalid token submission:"
echo "$TOKEN"
TOKEN=$(curl -s -X POST -H "Content-Type: text/plain" -d @test/email-for-token.txt $HOST/token)
echo "Valid token: $TOKEN"
echo "Testing user limits"
echo "---- Request #1"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #2"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #3"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #4 - no post body"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" $HOST/justify
echo
echo "---- Request #5 - no Content-Type header"
curl -s -X POST -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
sleep 5s
sleep 1m
echo "---- Request #6 after 1mn"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #7"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #8"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
sleep 2m
echo "---- Request #9 after 2mn"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #10"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo
echo "---- Request #11"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @test/input-to-justify.txt $HOST/justify
echo